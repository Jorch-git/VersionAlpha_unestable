#! /usr/local/bin/node

var test = require('tape');
var idw = require('./');
var fs = require('fs');
//var gzipme = require('gzipme');
var zlib = require('zlib');
var arreglo = [];
var idw2 = [];
   
      test('idw', function (t) {
        archivoEntrada = './data/data.geojson'
	    var salida = './tests/compres/matriz.txt';
            var radio = 30;
            var testPoints = JSON.parse(fs.readFileSync(archivoEntrada));
            idw2 = idw(testPoints, 'value', 6, 0.750, 'kilometers',radio);
            t.ok(idw2[0].features.length);
            archivoSalida = './tests/salida/fc.geojson';
            fs.writeFileSync(archivoSalida, JSON.stringify(idw2[0],null,2));
            fs.createReadStream(archivoSalida).pipe(zlib.createGzip()).pipe(fs.createWriteStream(archivoSalida+'.gz'));
            fs.writeFileSync(salida,String(idw2[1]));
            fs.createReadStream(salida).pipe(zlib.createGzip()).pipe(fs.createWriteStream(salida+'.gz'));		
            t.end();
       });
