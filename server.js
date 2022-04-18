var http = require('http');
var app = require('./config/express')();

require('./config/database.js')();


http.createServer(app).listen(process.env.PORT || app.get('port'), function(){
	require('dotenv').config();
	console.log('Express Server escutando na porta ' +
		        app.get('port'));
});