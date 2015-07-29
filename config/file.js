'use strict';

function extendConfig (destination, source) {
  	for (var property in source) {
    	if (source[property] && source[property].constructor && source[property].constructor === Object) {
    		destination[property] = destination[property] || {};
    		extendConfig(destination[property], source[property]);
    	} else {
    		destination[property] = source[property];
    	}
  	}
  	return destination;
};




// DEFAULT & COMMON SET-UP
var default_config = {};


// OVERRIDES
var config = {};
switch (process.env.NODE_ENV) {
	case "prod":
		config = require('./production');
		break;
	case "stag":
		config = require('./production');
		break;
	case "dev":
		config = require('./development');
		break;
	default:
		config = require('./production');
}	

extendConfig(default_config, config);

module.exports = default_config;







