const cognitoServiceFile = require("./cognito.service");
const AWS = require("aws-sdk/global");

/**
 * Created by Vladimir Budilov
 */

// declare var AMA: any;

class AwsUtil {


    constructor(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
        AWS.config.region = "us-east-1";
        this.firstLogin = false;
        this.runningInit = false;
    }

    /**
     * This is the method that needs to be called in order to init the aws global creds
     */
    initAwsService(callback, isLoggedIn, idToken) {console.log("init aws")

        if (this.runningInit) {
            // Need to make sure I don't get into an infinite loop here, so need to exit if this method is running already
            console.log("AwsUtil: Aborting running initAwsService()...it's running already.");
            // instead of aborting here, it's best to put a timer
            if (callback != null) {
                callback.callback();
                callback.callbackWithParam(null);
            }
            return;
        }


        console.log("AwsUtil: Running initAwsService()");
        this.runningInit = true;
        this.runningInit = false;
    }

    addCognitoCredentials(idTokenJwt) {console.log("add cognito creds")
        let creds = this.cognitoUtil.buildCognitoCreds(idTokenJwt);

        AWS.config.credentials = creds;

        creds.get(function (err) {
            if (!err) {
                if (this.firstLogin) {
                    // save the login info to DDB
                    this.ddb.writeLogEntry("login");
                    this.firstLogin = false;
                }
            }
        });
    }

    static getCognitoParametersForIdConsolidation(idTokenJwt) {console.log("getCognitoParametersForIdConsolidation")
        console.log("AwsUtil: enter getCognitoParametersForIdConsolidation()");
        let url = 'cognito-idp.' + CognitoUtil._REGION.toLowerCase() + '.amazonaws.com/' + CognitoUtil._USER_POOL_ID;
        let logins = [];
        logins[url] = idTokenJwt;
        let params = {
            IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID, /* required */
            Logins: logins
        };

        return params;
    }

}

exports.data = {
    awsUtil: new AwsUtil(cognitoServiceFile.data.cognitoUtil),
}
