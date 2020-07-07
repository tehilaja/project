const cognitoServiceFile = require("./cognito.service");

class UserParametersService {

    constructor(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
    }

    getParameters(callback) {
        console.log("start get parameters")
        let cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserParametersService: Couldn't retrieve the user");
                    callback(err.message, null)
                }
                    
                else {
                    console.log("cognito user: " + JSON.stringify(cognitoUser.getUsername()));
                    try {
                        cognitoUser.getUserAttributes(function (err, params) {
                            if (err) {
                                console.log("UserParametersService: in getParameters: " + err);
                            } else {
                                const email = params.find(x => x.Name === 'email') && params.find(x => x.Name === 'email').Value;
                                params.push({ Name: 'program_admin', Value: email === 'tehilaj97@gmail.com' || email === 'avital05484@gmail.com'});
                                callback(null, params);
                            }
                        });
                    }
                    catch (ex) {
                        console.log("in catch");
                        callback(ex.message, null);
                    }

                }

            });
        }
        else {
            console.log('null cognito user');
            callback(null, null);
        }
    }
}

exports.data = {
    userParametersService: new UserParametersService(cognitoServiceFile.data.cognitoUtil),
};
