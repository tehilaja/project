//import { CognitoUserPool } from "amazon-cognito-identity-js";
const CognitoUserPool = require("amazon-cognito-identity-js").CognitoUserPool;
const AWS = require("aws-sdk/global");
const awsservice = require("aws-sdk/lib/service");
const CognitoIdentity = require("aws-sdk/lib/service");


/**
 * Created by Vladimir Budilov
 */

// export interface CognitoCallback {
//     cognitoCallback(message: string, result: any): void;

//     // handleMFAStep?(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void;
// }

// export interface LoggedInCallback {
//     isLoggedIn(message: string, loggedIn: boolean): void;
// }

// export interface ChallengeParameters {
//     CODE_DELIVERY_DELIVERY_MEDIUM: string;

//     CODE_DELIVERY_DESTINATION: string;
// }

// export interface Callback {
//     callback(): void;

//     callbackWithParam(result: any): void;
// }
 const _REGION = 'us-east-1';
 const _IDENTITY_POOL_ID = 'us-east-1:f555c51e-02d5-4ec2-b01d-21c1a5d384dd';
 const _USER_POOL_ID = 'us-east-1_59QU60Ow5';
 const _CLIENT_ID = '6h48jv6h366u8q7ce29k2u59mp';

 const _POOL_DATA = {
     UserPoolId: _USER_POOL_ID,
     ClientId: _CLIENT_ID
 };

//  cognitoCreds;

class CognitoUtil {


    getUserPool() {
    //     if (environment.cognito_idp_endpoint) {
    //         CognitoUtil._POOL_DATA.endpoint = environment.cognito_idp_endpoint;
    //     }
        return new CognitoUserPool(_POOL_DATA);    
    }

    getCurrentUser() {
        return this.getUserPool().getCurrentUser();
    }

    // AWS Stores Credentials in many ways, and with TypeScript this means that
    // getting the base credentials we authenticated with from the AWS globals gets really murky,
    // having to get around both class extension and unions. Therefore, we're going to give
    // developers direct access to the raw, unadulterated CognitoIdentityCredentials
    // object at all times.
    setCognitoCreds(creds) {
        this.cognitoCreds = creds;
    }

    getCognitoCreds() {
        return this.cognitoCreds;
    }

    // This method takes in a raw jwtToken and uses the global AWS config options to build a
    // CognitoIdentityCredentials object and store it for us. It also returns the object to the caller
    // to avoid unnecessary calls to setCognitoCreds.

    buildCognitoCreds(idTokenJwt) {
        let url = 'cognito-idp.' + _REGION.toLowerCase() + '.amazonaws.com/' + _USER_POOL_ID;
        // if (environment.cognito_idp_endpoint) {
        //     url = environment.cognito_idp_endpoint + '/' + _USER_POOL_ID;
        // }
        let logins = {};
        logins[url] = idTokenJwt;
        let params = {
            IdentityPoolId: _IDENTITY_POOL_ID, /* required */
            Logins: logins
        };
        let serviceConfigs = {};
        // if (environment.cognito_identity_endpoint) {
        //     serviceConfigs.endpoint = environment.cognito_identity_endpoint;
        // }
        let creds = new AWS.CognitoIdentityCredentials(params, serviceConfigs);
        this.setCognitoCreds(creds);
        return creds;
    }


    getCognitoIdentity() {
        return this.cognitoCreds.identityId;
    }

    getAccessToken(callback) {
        if (callback == null) {
            throw("CognitoUtil: callback in getAccessToken is null...returning");
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getAccessToken().getJwtToken());
                    }
                }
            });
        }
        else {
            callback.callbackWithParam(null);
        }
    }

    getIdToken(callback) {
        if (callback == null) {
            throw("CognitoUtil: callback in getIdToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getIdToken().getJwtToken());
                    } else {
                        console.log("CognitoUtil: Got the id token, but the session isn't valid");
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    }

    getRefreshToken(callback) {
        if (callback == null) {
            throw("CognitoUtil: callback in getRefreshToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }

                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getRefreshToken());
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    }

    refresh() {
        this.getCurrentUser().getSession(function (err, session) {
            if (err) {
                console.log("CognitoUtil: Can't set the credentials:" + err);
            }

            else {
                if (session.isValid()) {
                    console.log("CognitoUtil: refreshed successfully");
                } else {
                    console.log("CognitoUtil: refreshed but session is still not valid");
                }
            }
        });
    }
}

exports.data = {
    cognitoUtil: new CognitoUtil(),
}
