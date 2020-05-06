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

        // if (cognitoUser != null) {
        //     cognitoUser.getSession(function (err, session) {console.log("got session");
        //         if (err) {
        //             console.log("UserParametersService: Couldn't retrieve the user");
        //         } else {
        //         try{console.log("about to get attributes");
        //             cognitoUser.getUserAttributes(function (err, result) {console.log("in get attributes callback");
        //                 console.log("error: UserParametersService: in getParameters: " + JSON.stringify(err));
        //                 console.log("result: UserParametersService: in getParameters: " + JSON.stringify(result));
        //                 if (err) {
        //                     console.log("UserParametersService: in getParameters: " + err);
        //                 } else {
        //                     //callback.callbackWithParam(result);
        //                     resultParametersArr.push(...result);
        //                     console.log("result:"+JSON.stringify(resultParametersArr))
        //                 }
        //             });
        //         } catch (ex) {
        //             console.log("exception getting attributes: "+ JSON.stringify(ex));
        //         }
                    
        //         }

        //     });
        // }
        else {console.log('null cognito user')
            //callback.callbackWithParam(null);
        }
    }
}

exports.data = {
    userParametersService: new UserParametersService(cognitoServiceFile.data.cognitoUtil),
};