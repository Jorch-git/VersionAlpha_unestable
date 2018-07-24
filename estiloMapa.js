

function carga(){

 mapaJSON2 = new google.maps.Data();  

  
mapaJSON2.loadGeoJson("tests/idw3.geojson");


mapaJSON2.setStyle(function(feature) {
      var valor = feature.getProperty('z');
      var opacidad = 0.6;
      var color = regresa(valor);
      if (valor = 0)
          opacidad = 0;
      else
          opacidad = 0.6

    /*  if (valor >= 5 && valor < 10)
      {
          opacidad = 0.6;
          color = 'rgb('+rangoA[0][0]+','+rangoA[0][1]+','+rangoA[0][2]+')';
      }
       if (valor >= 10 && valor < 15)
      {
          opacidad = 0.6;
          color = 'rgb('+rangoB[0][0]+','+rangoB[0][1]+','+rangoB[0][2]+')';
      }
       if (valor >= 15 && valor < 25)
      {
          opacidad = 0.6;
          color = 'rgb('+rangoC[0][0]+','+rangoC[0][1]+','+rangoC[0][2]+')';
      }
       if (valor >= 25 && valor < 35)
      {
          opacidad = 0.6;
          color =  'rgb('+rangoD[0][0]+','+rangoD[0][1]+','+rangoD[0][2]+')';
      }
       if (valor >= 35 && valor < 45)
      {
          opacidad = 0.6;
          color =  'rgb('+rangoE[0][0]+','+rangoE[0][1]+','+rangoE[0][2]+')';
      }
       if (valor >= 45 && valor < 85)
      {
          opacidad = 0.6;
          color =  'rgb('+rangoF[0][0]+','+rangoF[0][1]+','+rangoF[0][2]+')';
      }
       if (valor >= 85 && valor < 110)
      {
          opacidad = 0.6;
          color =  'rgb('+rangoG[0][0]+','+rangoG[0][1]+','+rangoG[0][2]+')';
      }
       if (valor >= 110)
      {
          opacidad = 0.6;
          color =  'rgb('+rangoH[0][0]+','+rangoH[0][1]+','+rangoH[0][2]+')';
      } */
   return({
     fillColor: color,
     strokeWeight: 0,
     strokeColor: 'White',
     fillOpacity: opacidad
     });
  });


 mapaJSON2.setMap(map);

}




function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) { 
        factor = 0.5; 
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}


function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for(var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray;
}


var rangoA = interpolateColors("rgb(255,247,251)", "rgb(236,231,242)", 255);           
var rangoB = interpolateColors("rgb(236,231,242)", "rgb(208,209,230)", 255);
var rangoC = interpolateColors("rgb(208,209,230)", "rgb(166,189,219)", 255);
var rangoD = interpolateColors("rgb(166,189,219)", "rgb(116,169,207)", 255);
var rangoE = interpolateColors("rgb(116,169,207)", "rgb(54,144,192)", 255);
var rangoF = interpolateColors("rgb(54,144,192)", "rgb(5,112,176)", 255);
var rangoG = interpolateColors("rgb(5,112,176)", "rgb(4,90,141)", 255);
var rangoH = interpolateColors("rgb(4,90,141)", "rgb(2,56,88)", 255);

function regresa(valor){



   
   var m = 0;
   var b = 0;
           

 
            if (valor >= 0 && valor < 2 )
            {   
                m  = 255/(2-0.5);
                var b = -m*0.5;
                resultado = Math.floor(valor*m+b);
                //console.log(resultado);
                return 'rgb('+rangoA[resultado][0]+','+rangoA[resultado][1]+','+rangoA[resultado][2]+')';
                          
            }
             if (valor >= 2 && valor < 5)
            {

                m  = 255/(5-2);
                var b = -m*2;
                resultado = Math.floor(valor*m+b);
                return 'rgb('+rangoB[resultado][0]+','+rangoB[resultado][1]+','+rangoB[resultado][2]+')';
                          
                
            }
             if (valor >= 5 && valor < 8)
            {
                m  = 255/(8-5);
                var b = -m*5;
                resultado = Math.floor(valor*m+b);
               return 'rgb('+rangoC[resultado][0]+','+rangoC[resultado][1]+','+rangoC[resultado][2]+')';
                          
                
            }
             if (valor >= 8 && valor < 12)
            {
                m  = 255/(12-8);
                var b = -m*8;
                resultado = Math.floor(valor*m+b);
                return 'rgb('+rangoD[resultado][0]+','+rangoD[resultado][1]+','+rangoD[resultado][2]+')';
                          
                
            }
             if (valor >= 12 && valor < 30)
            {
                m  = 255/(30-12);
                var b = -m*12;
                resultado = Math.floor(valor*m+b);
                return'rgb('+rangoE[resultado][0]+','+rangoE[resultado][1]+','+rangoE[resultado][2]+')';
                          
                
            }
             if (valor >= 30 && valor < 60)
            {
                m  = 255/(60-30);
                var b = -m*30;
                resultado = Math.floor(valor*m+b);
                return 'rgb('+rangoF[resultado][0]+','+rangoF[resultado][1]+','+rangoF[resultado][2]+')';
                          
                
            }
            if (valor >= 60 && valor < 80)
            {
                m  = 255/(150-60);
                var b = -m*60;
                resultado = Math.floor(valor*m+b);
                return 'rgb('+rangoG[resultado][0]+','+rangoG[resultado][1]+','+rangoG[resultado][2]+')';
                          
                
            }
               if (valor >= 80)
            {
                m  = 255/(150-60);
                var b = -m*60;
                resultado = Math.floor(valor*m+b);
                return 'rgb('+rangoH[resultado][0]+','+rangoH[resultado][1]+','+rangoH[resultado][2]+')';
                          
                
            }
        }
    










255,247,251
236,231,242
208,209,230
166,189,219
116,169,207
54,144,192
5,112,176
4,90,141
2,56,88