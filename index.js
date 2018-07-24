var filter =require('turf-filter');
var distance = require('turf-distance');
var squareGrid = require('turf-square-grid');
var centroid = require('turf-centroid');
var extent = require('turf-extent');
//var turf = require('@turf/turf');
var zlib = require('zlib');
var fs = require('fs');
var valor = 0;


var valores = [];
var fs = require('fs');

var datos = fs.readFileSync('./tests/fc.geojson', '');

module.exports = function (controlPoints, valueField, b, cellWidth, units, radio) {

  var alo = JSON.stringify(controlPoints);

    var datos2 = String(datos)
    datos2 = JSON.parse(datos2);

    var samplingGrid = datos2;

    var N = samplingGrid.features.length;
    valores = [];
    for (var i = 0; i < N; i++) {
      var w;
      var zw = 0;
      var sw = 0;
      var centro2;
      controlPoints.features.map(function (point) {
        var d = distance(centroid(samplingGrid.features[i]), point, units);
	var centro = centroid(samplingGrid.features[i]);
	centro2 = centro.geometry.coordinates;
        if (d < radio )
        {
                  w = 1.0 / Math.pow(d, b);
                  sw += w;
                  zw += w * point.properties[valueField];
        }

                });
                  valor = zw/sw;
                  if (valor == NaN)
                    valor = 0;

                  samplingGrid.features[i].properties.z = valor;
                  samplingGrid.features[i].properties.num = i;
		  samplingGrid.features[i].properties.corde = centro2;
                  temporal = parseFloat(valor);
                  temporal = Math.round(temporal * 100) / 100;

                  valores.push(temporal);


    }
  
    //var salida = './tests/compres/matriz.txt';  
    //fs.writeFileSync(salida,String(valores));
    //gzipme('./tests/compres/tiempoReal.txt');
    //fs.createReadStream(salida).pipe(zlib.createGzip()).pipe(fs.createWriteStream(salida+'.gz'));

    return [samplingGrid,valores];


};

