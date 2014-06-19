/*
var mongodb = require ('mongodb');

var server= new mongodb.Server("127.0.0.1",27017,{});

var dbTest= new mongodb.Db('ejemplo',server,{});

dbTest.open(function (error, client) {
	// body...
	if (error) throw error;

	var collection= new mongodb.Collection(client, 'ciudades');
	
	collection.find({'nombre':'Mexico'}).toArray(function (err, docs) {
		console.dir(docs);
		// body...
	});	

});
*/

var http = require ('http'),
  io = require('socket.io'),
  fs= require('fs'),
  MongoClient= require('mongodb').MongoClient,
  base= require('mongodb').Server

 var host ='localhost';
 var puertobase= 27017;

 conexiondemensaje=function  (coleccion) {
 	// body...
 	this.ingresar=function (coleccion, usuario, llamada) {
 		// body...
 		var datos={
 		"usuario" : usuario,
 		"mensaje" : mensaje
 		};

 	coleccion.insert(datos, function (err, docinsertado) {
 		// body...
 		llamada (null, docinsertado);
 		});
 	}

 }

 canal = function () { }
 canal.connect=function (host, puertobase, llamada){


 	var cliente = new MongoClient(new base(host, puertobase, {}), {"w": 1});

 		 cliente.open(function (err, mongoclient){

 			var db =cliente.db("chat");

			db.createCollection('mensajes', function(err, collection) {
			// body...
				llamada(new conexiondemensaje(coleccion));
		}) ;
	}) ;

 }

 canal.connect(host, puertobase, function (conexiondemensaje) {

 	// body...
 	server = http.createServer(function(req, res) {
 		// body...
 		res.writeHead(200, {'Content-Type': 'text/html'});
 		var salida = fs.readFileSync('./index.html','utf8');
 		res.end(salida);
 	});
 
var socket	= io.listen(server);
	socket.on('connection',function (cliente) {
		// body...
			cliente.on('establecerusuario', function (usuario) {
				// body...
				cliente.set('nombreusuario', usuario.nombreusuario, function () {
				console.log("ingreso el usuario = "+usuario.nombreusuario);

					// body...
				});
			});

			cliente.on('mensaje',function (msj) {
				cliente.get('nombreusuario', function (err, usuario) {
					// body...
					conexiondemensaje.ingresar(msj.mensaje, usuario, function (err){
							
							cliente.broadcast.emit("mensaje", {
								"usuario": usuario,
								"mensaje": msj.mensaje
							});
							console.log("mensaje de :" + usuario+"insertado correctamente");
		
					});
				});
			});
	});
	console.log("servidor corriendo en puerto 8080");
	server.listen(8080);
});
