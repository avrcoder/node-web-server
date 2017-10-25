const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //directory where the partials exist
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
}); //can put commmon things to be rendered
// hbs.registerHelper('screamIt', (text) => {
// 	return text.toUpperCase();
// }); //handlebar without arguments
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //middleware

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append');
		}
	});
	next(); //only then next function executed. (necessary)
}); //function to register a middleware
//next tells express when the middleware function is done

app.use((req,res,next) => {
	res.render('maintainance.hbs');
})

app.get('/', (req,res) => {
	res.send({
		name: "Vishwatej",
		likes:[
			'Shreekavya',
			'travelling'
		]
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

app.listen(3000, () => {
	console.log('server up');
});