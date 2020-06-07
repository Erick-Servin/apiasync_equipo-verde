const express = require('express');
const asyncHandler = require('express-async-handler');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Interruptor = require('./db/interruptor.js');

mongoose.connect('mongodb://localhost:27017/equipo_verde', { 'useNewUrlParser': true, 'useUnifiedTopology': true }, (err) => {
	if (err) throw err;
});
console.log('conexion exitosa');


app.set('port', process.env.PORT || 5035);
app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'), () =>{
	console.log(`Server on port ${app.get('port')}`);
});

//metodo GET encargado en consultar todos los registros de la base de datos
app.get('/webapi/async',asyncHandler(async (req,res,next) => {
	const f = await Interruptor.find({}, (err) => {
		if(err) throw (err); 
	});
	res.json(f);
}));

//metodo GET encargado de consultar los registros por el atributo "Lado"
app.get('/webapi/async/:Lado',asyncHandler(async (req,res,next) => {
	var Lado = req.params.Lado;
	const l = await Interruptor.find({Lado}, (err) => {
		if(err) throw (err);
	});
	res.json(l);
}));

//metodo POST encargado de insertar nuevos registros a la base de datos
app.post('/webapi/async',asyncHandler(async (req,res,next) => {
	console.log('Post /webapi/interrupt');
	console.log(req.body);

	let inter = new Interruptor();

	inter.Lado = await req.body.Lado;

	await inter.save((err, inter1) =>{
		if(err) throw err;

		res.send({inter: inter1});
	});
}));

