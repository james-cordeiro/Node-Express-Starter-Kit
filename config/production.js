var config = {
	

	server: {
		port: process.env.port || 3000
	}


};


config.database = require('./database.json').prod;

module.exports = config;