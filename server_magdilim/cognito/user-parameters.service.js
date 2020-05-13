const cognitoServiceFile = require("./cognito.service");
const reactor = require("../utilities/custom-event").data.reactor;

class UserParametersService {

    constructor(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
    }

    getParameters(resultParametersArr) {console.log("start get parameters")
        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err)
                    console.log("UserParametersService: Couldn't retrieve the user");
                else {
                    console.log("cognito user: "+JSON.stringify(cognitoUser.getUsername()));
                    try{
                        cognitoUser.getUserAttributes(function (err, result) {console.log("start callback")
                        if (err) {
                            console.log("UserParametersService: in getParameters: " + err);
                        } else {
                            resultParametersArr.push(...result);
                            reactor.dispatchEvent('got_user_params');
                            //callback.callbackWithParam(result);

                        }
                    });
                    }
                    catch(ex){
                        console.log("in catch")
                    }
                    
                }

            });
        }
        else {
            console.log ('null cognito user');
            return 'null';
            //callback.callbackWithParam(null);
        }
    }
}

exports.data = {
    userParametersService: new UserParametersService(cognitoServiceFile.data.cognitoUtil),
};