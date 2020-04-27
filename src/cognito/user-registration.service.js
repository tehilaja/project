const cognitoIdentityFile = require("amazon-cognito-identity-js");
const cognitoServiceFile = require("./cognito.service");
const AuthenticationDetails = cognitoIdentityFile.AuthenticationDetails;
const CognitoUser = cognitoIdentityFile.CognitoUser;
const CognitoUserAttribute = cognitoIdentityFile.CognitoUserAttribute;
const AWS = require("aws-sdk/global");


class UserRegistrationService {

    // cognitoUtil;

    constructor(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
    }

    register(user, callback) {
        console.log("UserRegistrationService: user is " + user);

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: user.email
        };
        let firstName = {
            Name: 'name',
            Value: user.firstName
        };
        let lastName = {
            Name: 'family_name',
            Value: user.lastName
        }
        let phone = {
            Name: 'phone_number',
            Value: user.phone
        }
        attributeList.push(new CognitoUserAttribute(dataEmail));
        attributeList.push(new CognitoUserAttribute(firstName));
        attributeList.push(new CognitoUserAttribute(lastName));
        attributeList.push(new CognitoUserAttribute(phone));
        this.cognitoUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
            if (err) {
                console.log("UserRegistrationService: error: " + JSON.stringify(err))
                // callback.cognitoCallback(err.message, null);
            } else {
                console.log("UserRegistrationService: registered user is " + result);
                // callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username, confirmationCode, callback) {

        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {console.log("error confirming: "+JSON.stringify(err))
                // callback.cognitoCallback(err.message, null);
            } else {console.log("success confirming: "+JSON.stringify(result))
                // callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username, callback) {
        let userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        let cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    newPassword(newPasswordUser, callback) {
        console.log(newPasswordUser);
        // Get these details and call
        //cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        let authenticationData = {
            Username: newPasswordUser.username,
            Password: newPasswordUser.existingPassword,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        let userData = {
            Username: newPasswordUser.username,
            Pool: this.cognitoUtil.getUserPool()
        };

        console.log("UserLoginService: Params set...Authenticating the user");
        let cognitoUser = new CognitoUser(userData);
        console.log("UserLoginService: config is " + AWS.config);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                    onSuccess: function (result) {
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err) {
                        callback.cognitoCallback(err, null);
                    }
                });
            },
            onSuccess: function (result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function (err) {
                callback.cognitoCallback(err, null);
            }
        });
    }
}


exports.data = {
    userRegistrationService: new UserRegistrationService(cognitoServiceFile.data.cognitoUtil),
}
