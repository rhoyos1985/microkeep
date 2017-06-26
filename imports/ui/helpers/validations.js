const validation = {
	validateSignup : function (params) {  
		var errors = {}; 

		if (!params.usernamesignup) 
			errors.usernamesignup = "User name is required";  
		if (!params.emailsignup)    
			errors.emailsignup =  "Email is required";
		if (!params.passsignup)    
			errors.passsignup = "Password is requiered";  
		if (params.passsignup_confirm !== params.passsignup)    
			errors.passsignup_confirm =  "Password are diferents";  

		return errors;
	},

	validateSignin: function (params) {  
		var errors = {}; 

		if (!params.emailsigin)    
			errors.emailsigin =  "Email is required";
		if (!params.passsignin)    
			errors.passsignin = "Password is requiered";  

		return errors;
	},

	validateKeep: function (params) {  
		var errors = {}; 

		if (!params.textkeep)    
			errors.textkeep =  "Keep is required";

		return errors;
	},
}

export default validation;