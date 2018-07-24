#! /usr/local/bin/node

var test = require('tape');
var idw = require('./');
var fs = require('fs');

test('idw', function (t) {
  var testPoints = JSON.parse(fs.readFileSync('./data/datosAcum.txt'));

  var acum = idw(testPoints,'value', 0.75 , 0.75, 'kilometers');

  t.ok(acum.features.length);

  fs.writeFileSync(__dirname+'/tests/acum.geojson', JSON.stringify(acum,null,2));

  t.end();
});


  
