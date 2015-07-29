var 	express		=		require('express'),
		app 		=		express(),
		router		=		express.Router(),
		bodyParser 	= 		require('body-parser'),
		msql		=		require('../my_modules/msql');



/* -----------------------     Init Config    -------------------------- */


var staticLocals = {
	layout: false,
	app_data: {}		
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


msql = new msql({
	schema: "acca_members"
});
msql.connect();

/* -----------------------     Routes Logic    -------------------------- */

router.route('/')

	.get(app, function(req, res) {

		msql.getSchema(function(data){
			console.log(data);
		});



		res.render("app", staticLocals);
	});


router.route('/mapping')

	.post(app, function(req, res) {
		msql.getData(msql.parseData(req.body), function(data){
			res.json(data);
        });
	});












/* -----------------------     Export Module    -------------------------- */
module.exports = router; 