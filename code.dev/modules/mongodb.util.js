(function(){
	'use strict';
	const mongoose = require('mongoose');
	const databaseName = process.env.DB_NAME;
	const databaseUrl = process.env.DB_URL;
	const requiredFieldName = process.env.DB_REQUIRED;
	var databaseConfig = {
		server: databaseUrl,
		database: databaseName,
	}
	var Schema = mongoose.Schema;
	function init(){
		var options = {
			useUnifiedTopology: true,
			useNewUrlParser: true
		}
		var connectionString = 'mongodb://' + databaseConfig.server + '/' + databaseConfig.database;
		mongoose.connect(connectionString,options)
			.then(function(result){
				console.log("MongoDb connection successful. DB: " + connectionString);
			})
			.catch(function(error){
				console.log(error.message);
				console.log("Error occured while connecting to DB: " + connectionString);
			});
		mongoose.set('useCreateIndex', true);
	}
	var moduleSchema = new Schema({[requiredFieldName]: {type:String,required:true,unique:true},}, { strict: false });
	
	module.exports.init = init;
	module.exports[moduleName] = mongoose.model(moduleName, moduleSchema);
})();