//import { DynamoDBService } from "./ddb.service";

const cognitoIdentityFile = require("amazon-cognito-identity-js");
const cognitoServiceFile = require("./cognito.service");
const AuthenticationDetails = cognitoIdentityFile.AuthenticationDetails;
const CognitoUser = cognitoIdentityFile.CognitoUser;
const CognitoUserAttribute = cognitoIdentityFile.CognitoUserAttribute;
const AWS = require("aws-sdk/global");
const STS = require("aws-sdk/clients/sts");

class UserLoginService {

    // cognitoUtil;

    onLoginSuccess(callback, session){

        console.log("In authenticateUser onSuccess callback");

        AWS.config.credentials = this.cognitoUtil.buildCognitoCreds(session.getIdToken().getJwtToken());

        // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
        // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
        // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
        // security credentials. The identity is then injected directly into the credentials object.
        // If the first SDK call we make wants to use our IdentityID, we have a
        // chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
        // very innocuous API call that forces this behavior.
        let clientParams = {};
        // if (environment.sts_endpoint) {
        //     clientParams.endpoint = environment.sts_endpoint;
        // }
        let sts = new STS(clientParams);
        sts.getCallerIdentity(function (err, data) {
            console.log("UserLoginService: Successfully set the AWS credentials");
            // callback.cognitoCallback(null, session);
        });
    }

    onLoginError(callback, err){
        callback.cognitoCallback(err.message, null);
    }

    constructor(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
    }

    authenticate(username, password, callback) {
        console.log("UserLoginService: starting the authentication");

        let authenticationData = {
            Username: username,
            Password: password,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        console.log("UserLoginService: Params set...Authenticating the user");
        let cognitoUser = new CognitoUser(userData);
        console.log("UserLoginService: config is " + AWS.config);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: (userAttributes, requiredAttributes) => {console.log("newPasswordRequired")
                return "newPasswordRequired";
                // callback.cognitoCallback(`User needs to set password.`, null)
            },
            onSuccess: result => {console.log("success login before onloginsuccess")
                this.onLoginSuccess(callback, result);                
            },
            onFailure: err => this.onLoginError(callback, err),
            // mfaRequired: (challengeName, challengeParameters) => {
            //     callback.handleMFAStep(challengeName, challengeParameters, (confirmationCode: string) => {
            //         cognitoUser.sendMFACode(confirmationCode, {
            //             onSuccess: result => this.onLoginSuccess(callback, result),
            //             onFailure: err => this.onLoginError(callback, err)
            //         });
            //     });
            // }
        });
    }

    forgotPassword(username, callback) {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function () {

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    confirmNewPassword(email, verificationCode, password, callback) {
        let userData = {
            Username: email,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function () {
                callback.cognitoCallback(null, null);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    logout() {
        console.log("UserLoginService: Logging out");
        // this.ddb.writeLogEntry("logout");
        this.cognitoUtil.getCurrentUser().signOut();
    }

    isAuthenticated(callback) {
        if (callback == null)
            throw("UserLoginService: Callback in isAuthenticated() cannot be null");

        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    callback.isLoggedIn(err, false);
                }
                else {
                    console.log("UserLoginService: Session is " + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log("UserLoginService: can't retrieve the current user");
            callback.isLoggedIn("Can't retrieve the CurrentUser", false);
        }
    }
}

exports.data = {
    userLoginService: new UserLoginService(cognitoServiceFile.data.cognitoUtil),
}
