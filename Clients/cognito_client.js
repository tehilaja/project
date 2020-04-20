export function signInButton(username, password) {alert(username+":"+password)
    
	var authenticationData = {
        Username : username,
        Password : password,
    };
	
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
	var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId, // Your client id here
    };
	
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
    var userData = {
        Username : username,
        Pool : userPool,
    };
	
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
	cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
			var accessToken = result.getAccessToken().getJwtToken();
			console.log(accessToken);	
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
  }

export  function registerButton(username, password) {
		
    personalnamename =  document.getElementById("personalnameRegister").value;    
    
    poolData = {
            UserPoolId : _config.cognito.userPoolId, // Your user pool id here
            ClientId : _config.cognito.clientId // Your client id here
        };		
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];
    
    var dataEmail = {
        Name : 'email', 
        Value : username, //get from form field
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);
    
    
    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
  }



