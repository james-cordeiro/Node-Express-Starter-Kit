var 	express		=		require('express'),
		app 		=		express(),
		router		=		express.Router(),
		bodyParser 	= 		require('body-parser');



/* -----------------------     Init Config    -------------------------- */


var staticLocals = {
	layout: false,
	app_data: {}		
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



/* -----------------------     Routes Logic    -------------------------- */

router.route('/')

	.get(app, function(req, res) {
		res.render("app", staticLocals);
	});













/* -----------------------     Export Module    -------------------------- */
module.exports = router; 