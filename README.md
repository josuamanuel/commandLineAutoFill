# commandLineAutoFill

Different ways to interact with a command in the shell.

* awsExpect uses the expect command to do that. We were able even to introduce password.
* aws.js is the pure javascript option. We are not able to introduce password but most commands today have an environment varible to put the password. We use this method to complete an adfs-aws-login.
* awsExpect uses a javascript library with a nicer api. Though I think it is still better to to use the pure javascript.
* fillLogin.js and login.js is an example of a a filler and the commandLine to be filled.
