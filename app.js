/************************************************************************************************************************************************/
/* Load Modules */

var 	express       =       require('express'),
    	exphbs        =       require('express-handlebars'),
    	config 		  =		  require('./config/file'),
    	app           =       express();


/************************************************************************************************************************************************/
/* Configuration */

app.engine('.hbs', exphbs({defaultLayout: 'app', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');



/************************************************************************************************************************************************/
/* Middleware */

app.use(express.static(__dirname + '/dist'));
app.use(require('./middleware/globals'));


/************************************************************************************************************************************************/
/* Routes */

app.use('/', require('./routes/core'));



/************************************************************************************************************************************************/
/* START SERVER */

app.listen(config.server.port, function(){
    console.log("Express listening on port %s",  this.address().port);  
});