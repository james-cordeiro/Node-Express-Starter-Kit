module.exports = function (req, res, next) {
	res.locals = { 
		site: {
			title: 'Node Express Starter Kit',
			author: 'James Cordeiro',
			description: '',
			copywrite: ""
		},
		page: {
			title: ""
		}
	};
	
    next();
   
};