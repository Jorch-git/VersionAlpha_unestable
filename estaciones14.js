var diactual = new Date();
var hoy = diactual.getDate();
var horaActual = diactual.getHours();
var meses = diactual.getMonth();
meses = meses+1;
var mesactual = String(meses);
var anios = diactual.getFullYear();
var anio = anios;
var anioactual = String(anios);

if (meses < 10)
{
  mesactual = "0"+mesactual;
}
var selecfecha = anioactual+mesactual;
var estaciones = ["IIUNAM","PREPA4","MADIN","SACMEX","ARAGON","VHERMOSA","DOSRIOS","CUAJIMALPA","COAPA","SISAL","BOSQUEREAL","CUERNAVACA"];
var estaciones2 = ["iiunam","prepa4","madin","sacmex","aragon","vhermosa","dosrios","cuajimalpa","coapa","sisal","bosquereal","cuernavaca"];

vDireccion = [];
for (let i=0; i<estaciones.length; i++)
 {
   vDireccion[i]=estaciones2[i]+"/dbp"+estaciones[i]+selecfecha+".gz";
 }

v2Direccion = [];
for (let i=0; i<estaciones.length; i++)
 {
   v2Direccion[i]=estaciones2[i]+"/dbm"+estaciones[i]+selecfecha+".csv";
 }

 v2Direccion.reverse();

var momento = "";
var xhr;
var datoss = "";
 


var prueba = [];
var intensidad = [];
var icono = [];
var iconoTmp = {};
var imagen = [];
var map;
var infowindow;
var url = "DatosActuales.csv"
var lineas = [];
var linea = "";
var linear1 = [];
var arreglo = [];
var marker;
var marker1;
var marker2;
var marker3;
var marker4;
var marker5;
var marker6;
var marker7;
var marker8;
var marker9;
var marker10;
var marker11;
var tani = 0;
var datos = [];
var prueba = [];
var GAcum = 0;
var GAcum2 = 0;
var cuenta = 0;
var IIUNAMinten = 0;
var IIUNAMacum = 0;
var GIIUNAMacum = 0;
var GPREPA4acum = 0;
var PREPA4inten = 0;
var PREPA4acum = 0;
var MADINacum = 0;
var MADINinten = 0;
var GMADINacum = 0;
var SACMEXacum = 0;
var SACMEXinten = 0;
var GSACMEXacum = 0;
var ARAGONinten = 0;
var ARAGONacum = 0;
var GARAGONacum = 0;
var VHERMOSAacum = 0;
var GVHERMOSAacum = 0;
var VHERMOSAinten = 0;
var DOSRIOSinten = 0;
var GDOSRIOSacum = 0;
var DOSRIOSacum = 0;
var CUAJIMALPAacum = 0;
var CUAJIMALPAinten = 0;
var GCUAJIMALPAacum = 0;
var COAPAacum = 0;
var COAPAinten = 0;
var GCOAPAacum = 0;
var SISALacum = 0;
var SISALinten = 0;
var GSISALacum = 0;
var BOSQUEREALacum = 0;
var GBOSQUEREALacum = 0;
var BOSQUEREALinten = 0;
var BALANCINacum = 0;
var BALANCINinten = 0;
var GBALANCINacum = 0;
var ARRiiunam = [];
var ARRprepa4 = [];
var ARRmadin = [];
var ARRsacmex = [];
var ARRaragon = [];
var ARRvhermosa = [];
var ARRdosrios = [];
var ARRcuajimalpa = [];
var ARRcoapa = [];
var ARRsisal = [];
var ARRbosquereal = [];
var ARRbalancin = [];
var cacha = 0;
var mapaJSON2;


var elemento = document.querySelector('#barrita'); 
elemento.setAttribute('style','width:'+0+'%');





 $(document).ready(function(){

   $('[data-toggle="popover"]').popover(); 
   $('[data-toggle="tooltip"]').tooltip();
   $('#myCheck').click(Revisa);
   $('#animaGOES').click(abreVentana);
   $("#barrita").removeClass('hidden');

        tani = 0;
        ciclo(tani);
        datos = [];
        prueba = [];

        function ciclo(tani){
            $("#barrita").show();
            elemento = document.querySelector('#barrita');
            var direccion2 = vDireccion[tani]; 
            x = tani*100/vDireccion.length-1;
            y = x;
            elemento.setAttribute('style','width:'+y+'%');
                descomprime(direccion2,tani,function()
                    {
                    if (tani < estaciones.length){
                    ciclo(tani+1);
                    }
                    else 
                    {
                    termineleer();
                    }  
                })
        }

    $('#p1').click(P1);
    $('#p2').click(P2);
    $('#p3').click(P3);
    $('#p4').click(P4);
    $('#p5').click(P5);
    $('#p6').click(P6);
    $('#p7').click(P7);
    $('#p8').click(P8);
    $('#p9').click(P9);
    $('#p10').click(P10);
    $('#p11').click(P11);
    $("#P12").click(P12);
    $("#palanca").click(tooogle);
    
  

    





});

 function tooogle()
 {
     if($('#palanca2').is(":checked"))
    {  
       mapaJSON2.setMap(null);
    }
    else
    {
       mapaJSON2.setMap(map);;
    }

 
 }

function ordena(miArray)
	{
		for(var i=1;i<miArray.length;i++)
		{
			for(var j=0;j<(miArray.length-i);j++)
			{
				if(miArray[j][0]>miArray[j+1][0])
				{
					k=miArray[j+1];
					miArray[j+1]=miArray[j];
					miArray[j]=k;
				}
			}
		}
		return miArray;
	}




function P1(){

  console.log(datos[0][2]);

   var lineas = datos[0][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);




}


 function P2(){
     console.log(datos[1][2]);
     var lineas = datos[1][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }


 function P3(){
     console.log(datos[2][2]);
     var lineas = datos[2][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }

 function P4(){
     console.log(datos[3][2]);
     var lineas = datos[3][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }

 function P5(){
     console.log(datos[4][2]);
     var lineas = datos[4][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }

 function P6(){
     console.log(datos[5][2]);
     var lineas = datos[5][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }

 function P7(){
     console.log(datos[6][2]);
     var lineas = datos[6][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }

 function P8(){
     console.log(datos[7][2]);
     var lineas = datos[7][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }

 function P9(){
     console.log(datos[8][2]);
     var lineas = datos[8][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }

 function P10(){
     console.log(datos[9][2]);
    var lineas = datos[9][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);     
 }

 function P11(){
     console.log(datos[10][2]);
     var lineas = datos[10][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }


  function P12(){
     console.log(datos[11][2]);
     var lineas = datos[11][2]; 
   var cuerpo = "";
        for (let i = 0; i < lineas.length; i++) {        
                            cuerpo = cuerpo+lineas[i][0]+","+lineas[i][1]+","+lineas[i][2]+","+lineas[i][3]+'\n';
      }
   var encabezado = "Fecha,Estación,Precipitación al minuto [mm], Precipitación Acumulada [mm]"+'\n';
   var cuerpo = encabezado+cuerpo;
  var blob = new Blob([cuerpo], {type: "text/plain;charset=utf-8"});
  var nombreArchivo = "Datos_"+lineas[0][1]+".csv";
  saveAs(blob, nombreArchivo);
 }



function termineleer(){
     datos = ordena(datos);
     datos = datos.reverse();
    //console.log(datos);
    arreglo = [];
    intensidad = [];
    icono = [];
    $("#checa").removeClass('hidden');
    $("#acumuladas").removeClass('hidden');
    document.getElementById("acumuladas").click();
    $("#animaGOES").removeClass('hidden');
    $("#animaGOES").show();
    $("#acumuladas").show();
    $("#tabla").removeClass('hidden');
    $("#tabla").show();
    $("#barrita").hide();
    $(".progress").hide();
  /*  document.getElementsByClassName("p1").innerHTML = datos[0][0];
    document.getElementsByClassName("p2").innerHTML = datos[1][0];
    document.getElementsByClassName("p3").innerHTML = datos[2][0];
    document.getElementsByClassName("p4").innerHTML = datos[3][0];
    document.getElementsByClassName("p5").innerHTML = datos[4][0];
    document.getElementsByClassName("p6").innerHTML = datos[5][0];
    document.getElementsByClassName("p7").innerHTML = datos[6][0];
    document.getElementsByClassName("p8").innerHTML = datos[7][0];
    document.getElementsByClassName("p9").innerHTML = datos[8][0];
    document.getElementsByClassName("p10").innerHTML = datos[9][0];
    document.getElementsByClassName("p11").innerHTML = datos[10][0];*/
    document.getElementById("p1").innerHTML =  datos[0][1]+' <span class="badge">'+datos[0][0]+' mm</span>';
    document.getElementById("p2").innerHTML = datos[1][1]+' <span class="badge">'+datos[1][0]+' mm</span>';
    document.getElementById("p3").innerHTML = datos[2][1]+' <span class="badge">'+datos[2][0]+' mm</span>';
    document.getElementById("p4").innerHTML = datos[3][1]+' <span class="badge">'+datos[3][0]+' mm</span>';
    document.getElementById("p5").innerHTML = datos[4][1]+' <span class="badge">'+datos[4][0]+' mm</span>';
    document.getElementById("p6").innerHTML = datos[5][1]+' <span class="badge">'+datos[5][0]+' mm</span>';
    document.getElementById("p7").innerHTML = datos[6][1]+' <span class="badge">'+datos[6][0]+' mm</span>';
    document.getElementById("p8").innerHTML = datos[7][1]+' <span class="badge">'+datos[7][0]+' mm</span>';
    document.getElementById("p9").innerHTML = datos[8][1]+' <span class="badge">'+datos[8][0]+' mm</span>';
    document.getElementById("p10").innerHTML = datos[9][1]+' <span class="badge">'+datos[9][0]+' mm</span>';
    document.getElementById("p11").innerHTML = datos[10][1]+' <span class="badge">'+datos[10][0]+' mm</span>';
    document.getElementById("p12").innerHTML = datos[11][1]+' <span class="badge">'+datos[11][0]+' mm</span>';
    aver(map);
    actualiza();
}


function actualiza(){
 prueba = [];
 
 var x = 0;
 ciclo2(x, function(){
  //aver(map);
  console.log("Prueba de los 30 segundos")
  var t = setTimeout(actualiza, 30000);
 });
}


  function ciclo2(resta, callback3){
 
  console.log("Entre por primera vez a ciclo2");

  var x = v2Direccion.length-1;
  datos = []; 

       mmm(x, function(){
           console.log("Termine de leer Archivos");
       });


 callback3();
}


function mmm(valor,ojo){
           var direccion3 = v2Direccion[valor]; 
                leeArchivo(direccion3,valor,function()
                    {
                    if (valor > 0){
                    //console.log(direccion3);
                    mmm(valor-1,ojo);
                    }
                    else 
                    {
                    //console.log("Sali");
                    ojo();
                    
                        datos = ordena(datos);
                        datos = datos.reverse();
                    /*      if (datos[0][1]=="MADIN")
                            datos[0][0] = "En mantenimiento</span>";
                        else
                            datos[0][0] = datos[0][0]+' mm</span>';
                        if (datos[1][1]=="MADIN")
                            datos[1][0] = "En mantenimiento</span>";
                        else
                            datos[1][0] = datos[1][0]+' mm</span>';
                        if (datos[2][1]=="MADIN")
                            datos[2][0] = "En mantenimiento</span>";
                        else
                            datos[2][0] = datos[2][0]+' mm</span>';
                        if (datos[3][1]=="MADIN")
                            datos[3][0] = "En mantenimiento</span>";
                        else
                            datos[3][0] = datos[3][0]+' mm</span>';
                        if (datos[4][1]=="MADIN")
                            datos[4][0] = "En mantenimiento</span>";
                        else
                            datos[4][0] = datos[4][0]+' mm</span>';
                        if (datos[5][1]=="MADIN")
                            datos[5][0] = "En mantenimiento</span>";
                        else
                            datos[5][0] = datos[5][0]+' mm</span>';
                        if (datos[6][1]=="MADIN")
                            datos[6][0] = "En mantenimiento</span>";
                        else
                            datos[6][0] = datos[6][0]+' mm</span>';
                        if (datos[7][1]=="MADIN")
                            datos[7][0] = "En mantenimiento</span>";
                        else
                            datos[7][0] = datos[7][0]+' mm</span>';
                        if (datos[8][1]=="MADIN")
                            datos[8][0] = "En mantenimiento</span>";
                        else
                            datos[8][0] = datos[8][0]+' mm</span>';
                        if (datos[9][1]=="MADIN")
                            datos[9][0] = "En mantenimiento</span>";
                        else
                            datos[9][0] = datos[9][0]+' mm</span>';
                        if (datos[10][1]=="MADIN")
                            datos[10][0] = "En mantenimiento</span>";
                        else
                            datos[10][0] = datos[10][0]+' mm</span>';
                        if (datos[11][1]=="MADIN")
                            datos[11][0] = "En mantenimiento</span>";
                        else
                            datos[11][0] = datos[11][0]+' mm</span>';  */
                        
                        document.getElementById("p1").innerHTML =  datos[0][1]+' <span class="badge">'+datos[0][0]+' mm</span>';
                        document.getElementById("p2").innerHTML = datos[1][1]+' <span class="badge">'+datos[1][0]+' mm</span>';
                        document.getElementById("p3").innerHTML = datos[2][1]+' <span class="badge">'+datos[2][0]+' mm</span>';
                        document.getElementById("p4").innerHTML = datos[3][1]+' <span class="badge">'+datos[3][0]+' mm</span>';
                        document.getElementById("p5").innerHTML = datos[4][1]+' <span class="badge">'+datos[4][0]+' mm</span>';
                        document.getElementById("p6").innerHTML = datos[5][1]+' <span class="badge">'+datos[5][0]+' mm</span>';
                        document.getElementById("p7").innerHTML = datos[6][1]+' <span class="badge">'+datos[6][0]+' mm</span>';
                        document.getElementById("p8").innerHTML = datos[7][1]+' <span class="badge">'+datos[7][0]+' mm</span>';
                        document.getElementById("p9").innerHTML = datos[8][1]+' <span class="badge">'+datos[8][0]+' mm</span>';
                        document.getElementById("p10").innerHTML = datos[9][1]+' <span class="badge">'+datos[9][0]+' mm</span>';
                        document.getElementById("p11").innerHTML = datos[10][1]+' <span class="badge">'+datos[10][0]+' mm</span>';
                        document.getElementById("p12").innerHTML = datos[11][1]+' <span class="badge">'+datos[11][0]+' mm</span>';
                     
                    aver(map);
                    
               
                    
                    }  
                });  
 }


function descomprime(url,tani,callback){

  url=url+'?'+Math.random()*Math.random();
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function(oEvent) {
        var reader = new window.FileReader();
        reader.readAsDataURL(xhr.response); 
        reader.onloadend = function() {
            base64data      = reader.result;  
            var base64      = base64data.split(',')[1];
            var strData     = atob(base64);
            var charData    = strData.split('').map(function(x){return x.charCodeAt(0);});
            var binData     = new Uint8Array(charData);
             datoss       = pako.inflate(binData, { to: 'string' });
                  var lineas = datoss.split("\r\n");
                  var conta = 1;
                  var TempAcum = 0;
                  var NAcum = 0;
                   for (let i = 0; i < lineas.length; i++) {
                        if(lineas[i] == "")
                            continue;        
                           var linea = lineas[i];
                           var linear1 = linea.split(";");
                           var Nombre = linear1[0];
                           var Fecha = linear1[1];
                           var Tiempo = linear1[2];
                           var Inten = linear1[3];
                           var Acum = linear1[4];
                           Acum = parseFloat(Acum);
                           var Fechas = Fecha;
                           var divFechas = Fechas.split("/");
                           var Anio = divFechas[0];
                           var Mes = divFechas[1];
                           var Dia = divFechas[2];
                           var Tiempos = Tiempo;
                           var divTiempos = Tiempos.split(":");
                           var Hor = divTiempos[0];
                           var Min = divTiempos[1];
                           var dateFH = Date.UTC(Anio, Mes, Dia, Hor, Min, 0);
                           var eventual = 0;
                           var acumulada = 0;
                           var NFecha2 = [];
                           var NFecha3 = [];
                           var NFecha4 = [];
                           NAcum = parseFloat(NAcum);
                           TempAcum = parseFloat(TempAcum); 
                           
                           if(i > (lineas.length-3))
                              {
                              switch(Nombre) {
                                    case "IIUNAM":
                                        //eventual = parseFloat(Inten)/60; 
                                        break;
                                    case "PREPA4":
                                        //eventual = parseFloat(Inten)/60;
                                        break;
                                    default:
                                        console.log("Deben ser 10 textos")
                                }
                              }

                           if ((Dia == hoy && Hor < 16 && horaActual < 16)||(Dia == hoy-1 && Hor > 15 && horaActual < 16))

                            {
                                if (conta == 1)
                                 {
                                    conta = conta +1;
                                    NAcum = 0;
                                    TempAcum = Acum;
                                 }
                                 else
                                 {
                                    
                                    if((TempAcum-Acum)>0.1)
                                        {
                                          NAcum = NAcum + (Acum + 0);
                                          //conta = conta + 1;
                                          TempAcum = Acum;
                                          console.log("pase por la excepcion NAcum "+NAcum+" y Acum "+Acum);
                                        }
                                    if((Acum-TempAcum)>=0)
                                        {
                                            NAcum = NAcum + (Acum - TempAcum);
                                            //conta = conta + 1;
                                            TempAcum = Acum;
                                        }
                                    

                                 }

                                 switch(Nombre) {
                                    case "IIUNAM":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRiiunam.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "PREPA4":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRprepa4.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "MADIN":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRmadin.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "SACMEX":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRsacmex.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "ARAGON":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRaragon.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "VHERMOSA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRvhermosa.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "DOSRIOS":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRdosrios.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "CUAJIMALPA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRcuajimalpa.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "COAPA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRcoapa.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "SISAL":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRsisal.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "BOSQUEREAL":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRbosquereal.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "CUERNAVACA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRbalancin.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    default:
                                        console.log("Aqui nunca puedo entrar");
                                }
                                //console.log(ARRiiunam);
                                 //console.log(" Dia menor a 16 horas Fecha :"+Fechas+" Horas: "+Tiempo+" Nombre: "+Nombre+" Acum: "+NAcum);
                                 
                            }
                            if((Dia == hoy)&&(horaActual > 15)&&(Hor > 15))
                              {
                                if (conta == 1)
                                 {
                                    conta = conta +1;
                                    NAcum = 0;
                                    TempAcum = Acum;
                                 }
                                 else
                                 {
                                    
                                    if((TempAcum-Acum)>0.1)
                                        {
                                          NAcum = NAcum + (Acum + 0);
                                          //conta = conta + 1;
                                          TempAcum = Acum;
                                          console.log("pase por la excepcion NAcum"+NAcum+" y Acum "+Acum);
                                        }
                                    if((Acum-TempAcum)>0)
                                        {
                                            NAcum = NAcum + (Acum - TempAcum);
                                            //conta = conta + 1;
                                            TempAcum = Acum;
                                        }

                                 }

                                switch(Nombre) {
                                    case "IIUNAM":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRiiunam.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "PREPA4":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRprepa4.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "MADIN":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRmadin.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "SACMEX":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRsacmex.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "ARAGON":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRaragon.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "VHERMOSA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRvhermosa.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "DOSRIOS":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRdosrios.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "CUAJIMALPA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRcuajimalpa.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "COAPA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRcoapa.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "SISAL":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRsisal.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "BOSQUEREAL":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRbosquereal.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    case "CUERNAVACA":
                                        eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRbalancin.push([NFecha4,Nombre,eventual,acumulada]);
                                        break;
                                    default:
                                        console.log("Aqui nunca puedo entrar");
                                }



                                 //console.log("Dia mayor a 16 horas Fecha :"+Fechas+" Horas: "+Tiempo+" Nombre: "+Nombre+" Acum: "+NAcum);                                 
                            }

                            switch(Nombre) {
                                    case "IIUNAM":
                                        IIUNAMinten = parseFloat(Inten); 
                                        IIUNAMacum = parseFloat(Acum);
                                        GIIUNAMacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //NFecha = NFecha.toUTCString();
                                        //ARRiiunam.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "PREPA4":
                                        PREPA4inten = parseFloat(Inten); 
                                        PREPA4acum = parseFloat(Acum);
                                        GPREPA4acum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRprepa4.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "MADIN":
                                        MADINinten = parseFloat(Inten); 
                                        MADINacum = parseFloat(Acum);
                                        GMADINacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRmadin.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "SACMEX":
                                        SACMEXinten = parseFloat(Inten); 
                                        SACMEXacum = parseFloat(Acum);
                                        GSACMEXacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRsacmex.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "ARAGON":
                                        ARAGONinten = parseFloat(Inten); 
                                        ARAGONacum = parseFloat(Acum);
                                        GARAGONacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRaragon.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "VHERMOSA":
                                        VHERMOSAinten = parseFloat(Inten); 
                                        VHERMOSAacum = parseFloat(Acum);
                                        GVHERMOSAacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRvhermosa.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "DOSRIOS":
                                        DOSRIOSinten = parseFloat(Inten); 
                                        DOSRIOSacum = parseFloat(Acum);
                                        GDOSRIOSacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRdosrios.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "CUAJIMALPA":
                                        CUAJIMALPAinten = parseFloat(Inten); 
                                        CUAJIMALPAacum = parseFloat(Acum);
                                        GCUAJIMALPAacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRcuajimalpa.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "COAPA":
                                        COAPAinten = parseFloat(Inten); 
                                        COAPAacum = parseFloat(Acum);
                                        GCOAPAacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRcoapa.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "SISAL":
                                        SISALinten = parseFloat(Inten); 
                                        SISALacum = parseFloat(Acum);
                                        GSISALacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRsisal.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "BOSQUEREAL":
                                        BOSQUEREALinten = parseFloat(Inten); 
                                        BOSQUEREALacum = parseFloat(Acum);
                                        GBOSQUEREALacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRbosquereal.push([NFecha,Nombre,NAcum]);
                                        break;
                                    case "CUERNAVACA":
                                        BALANCINinten = parseFloat(Inten); 
                                        BALANCINacum = parseFloat(Acum);
                                        GBALANCINacum = parseFloat(NAcum);
                                        //NFecha = new Date(dateFH);
                                        //ARRbosquereal.push([NFecha,Nombre,NAcum]);
                                        break;
                                    default:
                                        console.log("Aqui nunca puedo entrar");
                                }
                         
                             
                    }
                    
                    var RNAcum = NAcum.toFixed(2);
                    NAcum = parseFloat(NAcum);
                    RNAcum = parseFloat(RNAcum);

                        switch(Nombre) {
                                    case "IIUNAM":
                                        datos.push([RNAcum,Nombre,ARRiiunam]);
                                        break;
                                    case "PREPA4":
                                        datos.push([RNAcum,Nombre,ARRprepa4]);
                                        break;
                                    case "MADIN":
                                        datos.push([RNAcum,Nombre,ARRmadin]);
                                        break;
                                    case "SACMEX":
                                        datos.push([RNAcum,Nombre,ARRsacmex]);
                                        break;
                                    case "ARAGON":
                                        datos.push([RNAcum,Nombre,ARRaragon]);
                                        break;
                                    case "VHERMOSA":
                                        datos.push([RNAcum,Nombre,ARRvhermosa]);
                                        break;
                                    case "DOSRIOS":
                                        datos.push([RNAcum,Nombre,ARRdosrios]);
                                        break;
                                    case "CUAJIMALPA":
                                        datos.push([RNAcum,Nombre,ARRcuajimalpa]);
                                        break;
                                    case "COAPA":
                                        datos.push([RNAcum,Nombre,ARRcoapa]);
                                        break;
                                    case "SISAL":
                                        datos.push([RNAcum,Nombre,ARRsisal]);
                                        break;
                                    case "BOSQUEREAL":
                                        datos.push([RNAcum,Nombre,ARRbosquereal]);
                                        break;
                                    case "CUERNAVACA":
                                        datos.push([RNAcum,Nombre,ARRbosquereal]);
                                        break;
                                    default:
                                        console.log("Aqui nunca puedo entrar");
                                }

                    //datos.push([RNAcum,Nombre]);
                    //console.log("Fecha :"+Fechas+" Horas: "+Tiempo+" Nombre: "+Nombre+" Acum: "+RNAcum);
                    linea2 = linea;
                    prueba.push(linea2);
                    //console.log()
                    //console.log("La estacion "+Nombre+" tiene una acumulada al dia de hoy de "+NAcum);
                    //prueba.push([Nombre+";"+Fecha+";"+Tiempo+";"+Inten]);
         }
        callback();
    }
    xhr.send();
 
 
}




function Revisa(){
 if($('#myCheck').is(":checked"))
  {  
    console.log("pon satelite"); 
    map.overlayMapTypes.setAt("0",goes);

  }
  else
  {
    console.log("quita satelite");
    map.overlayMapTypes.clear();

  }
}

function abreVentana(){
  var url = 'AnimacionGOES';

  open(url,'','top=10,left=100,width=1000,height=960');
}



function initMap() {



  
  var mapOptions = {
          zoom: 11,
          center: new google.maps.LatLng(19.45872, -99.161458),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'),
            mapOptions);


      goes = new google.maps.ImageMapType({
            getTileUrl: function(tile, zoom) {
        
            return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes-ir-4km-900913/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
            },
            tileSize: new google.maps.Size(256, 256),
            opacity:0.6,
            name : 'GOES East Vis',
            isPng: true
        });

        map.overlayMapTypes.push(null); // create empty overlay entry
        map.overlayMapTypes.setAt("0",goes);




 mapaJSON2 = new google.maps.Data();  

  
mapaJSON2.loadGeoJson("tests/idw2.geojson");









         mapaJSON2.setStyle(function(feature) {
      var cuadros = feature.getProperty('z');
      var opacidad = 0.4;
      var condiciones = regresa(cuadros);
   return({
     fillColor: condiciones[0],
     strokeWeight: 0,
     strokeColor: 'White',
     fillOpacity: condiciones[1]
     });
  });



            mapaJSON2.addListener('mouseover', function(event) {  
            temp = event.feature.getProperty('z');
      
              etiqueta = temp;
            
     
            mapaJSON2.overrideStyle(event.feature,{strokeWeight: 5});
     
             //prueba2 = getPosition();
             //console.log(prueba2);
             console.log(etiqueta);     
            
         
                
        });

         mapaJSON2.addListener('mouseout', function(event) { 
             mapaJSON2.overrideStyle(event.feature, {strokeWeight: 0});
        }); 




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
   var resultado = 0;

            if (valor >= 0 && valor < 0.5)
              return ['white',0];

            if (valor >= 0.5 && valor < 1)
              return ['white',0];
          
            if (valor >= 1 && valor < 3 )
            {   
                m  = 255/(3-1);
                var b = -m*1;
                resultado = Math.floor(valor*m+b);
                if (resultado < 0 || resultado > 254)
                  console.log(resultado);
                //console.log(resultado);
                return ['rgb('+rangoA[resultado][0]+','+rangoA[resultado][1]+','+rangoA[resultado][2]+')',0];
                          
            }
             if (valor >= 3 && valor < 5)
            {

                m  = 255/(5-3);
                var b = -m*3;
                resultado = Math.floor(valor*m+b);
                return ['rgb('+rangoB[resultado][0]+','+rangoB[resultado][1]+','+rangoB[resultado][2]+')',0.6];
                          
                
            }
             if (valor >= 5 && valor < 9)
            {
                m  = 254/(9-5);
                var b = -m*5;
                resultado = Math.floor(valor*m+b);
                if (resultado < 0 || resultado > 254)
                  console.log(resultado);
               return ['rgb('+rangoC[resultado][0]+','+rangoC[resultado][1]+','+rangoC[resultado][2]+')',0.6];
                          
                
            }
             if (valor >= 9 && valor < 12)
            {
                m  = 254/(12-9);
                var b = -m*9;
                resultado = Math.floor(valor*m+b);
                if (resultado < 0 || resultado > 254)
                  console.log(resultado);
                return ['rgb('+rangoD[resultado][0]+','+rangoD[resultado][1]+','+rangoD[resultado][2]+')',0.6];
                          
                
            }
             if (valor >= 12 && valor < 30)
            {
                m  = 254/(30-12);
                var b = -m*12;
                resultado = Math.floor(valor*m+b);
                if (resultado < 0 || resultado > 254)
                  console.log(resultado);
                return ['rgb('+rangoE[resultado][0]+','+rangoE[resultado][1]+','+rangoE[resultado][2]+')',0.6];
                          
                
            }
             if (valor >= 30 && valor < 60)
            {
                m  = 254/(60-30);
                var b = -m*30;
                resultado = Math.floor(valor*m+b);
                if (resultado < 0 || resultado > 254)
                  console.log(resultado);
                return ['rgb('+rangoF[resultado][0]+','+rangoF[resultado][1]+','+rangoF[resultado][2]+')',0.6];
                          
                
            }
            if (valor >= 60 && valor < 80)
            {
                m  = 254/(150-60);
                var b = -m*60;
                resultado = Math.floor(valor*m+b);
                if (resultado < 0 || resultado > 254)
                  console.log(resultado);
                return ['rgb('+rangoG[resultado][0]+','+rangoG[resultado][1]+','+rangoG[resultado][2]+')',0.6];
                          
                
            }
               if (valor >= 80)
            {
                m  = 254/(150-60);
                var b = -m*60;
                resultado = Math.floor(valor*m+b);
                if (resultado < 0 || resultado > 254)
                  console.log(resultado);
                return ['rgb('+rangoH[resultado][0]+','+rangoH[resultado][1]+','+rangoH[resultado][2]+')',0.6];
                          
                
            }
        }
    





function leeArchivo(url, valor, callback2) {

       //console.log("Archivo "+url);
       cuenta = cuenta + 1;

        url=url+'?'+Math.random()*Math.random();
        var crudo = $.get(url, function (rawFile) {
       
                if (crudo.readyState === 4) {
                  var textoCompleto = rawFile;
                  //console.log(textoCompleto);
                    prueba.push(textoCompleto);
                    var lineas = textoCompleto.split("\r\n");
                     for (let i = 0; i < lineas.length; i++) {
                        if(lineas[i] == "")
                            continue;        
                           var linea = lineas[i];
                           var linear1 = linea.split(";");
                           var Nombre = linear1[0];
                           var Fecha = linear1[1];
                           var Tiempo = linear1[2];
                           var Inten = linear1[3];
                           var Acum = linear1[4];
                           Acum = parseFloat(Acum);
                           var Fechas = Fecha;
                           var divFechas = Fechas.split("/");
                           var Anio = divFechas[0];
                           var Mes = divFechas[1];
                           var Mes2 = parseFloat(Mes)-1;
                           var Dia = divFechas[2];
                           var Tiempos = Tiempo;
                           var divTiempos = Tiempos.split(":");
                           var Hor = divTiempos[0];
                           var Min = divTiempos[1];
                           var dateFH = Date.UTC(Anio, Mes2, Dia, Hor, Min, 0);  
                           var temporal = 0;
                           var temporal2 = 0;
         
                    }
                    console.log(Nombre+"   "+Inten);
                /*     if (cuenta < 12)

                    { */
                   /*     if (Inten == 0)
                        {
                            
                            console.log("Sin caambios en "+Nombre);
                        } 
                        else
                        {
                            console.log("Cambio "+Nombre+" en "+(Inten/60));
                            
                        }*/
                    /* }

                    else
                    { */
                         switch(Nombre) {
                            case "IIUNAM":
                                if (IIUNAMacum != Acum)
                                    {   
                                        temporal = Acum - IIUNAMacum;
                                        temporal2 = GIIUNAMacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRiiunam]);
                                        console.log("prueba de que entre "+ARRiiunam);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GIIUNAMacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRiiunam]);
                                         console.log("prueba de que entre "+ARRiiunam);
                                         console.log(Nombre+" no camnbio ");
                                    }

                                break;
                            case "PREPA4":
                                 if (PREPA4acum != Acum)
                                    {   
                                        temporal = Acum - PREPA4acum;
                                        temporal2 = GPREPA4acum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRprepa4]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GPREPA4acum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRprepa4]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "MADIN":
                                  if (MADINacum != Acum)
                                    {   
                                        temporal = Acum - MADINacum;
                                        temporal2 = GMADINacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRmadin]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GMADINacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRmadin]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "SACMEX":
                                     if (SACMEXacum != Acum)
                                    {   
                                        temporal = Acum - SACMEXacum;
                                        temporal2 = GSACMEXacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRsacmex]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GSACMEXacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRsacmex]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "ARAGON":
                                   if (ARAGONacum != Acum)
                                    {   
                                        temporal = Acum - ARAGONacum;
                                        temporal2 = GARAGONacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRaragon]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GARAGONacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRaragon]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "VHERMOSA":
                                     if (VHERMOSAacum != Acum)
                                    {   
                                        temporal = Acum - VHERMOSAacum;
                                        temporal2 = GVHERMOSAacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRvhermosa]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GVHERMOSAacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRvhermosa]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "DOSRIOS":
                                     if (DOSRIOSacum != Acum)
                                    {   
                                        temporal = Acum - DOSRIOSacum;
                                        temporal2 = GDOSRIOSacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRdosrios]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GDOSRIOSacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRdosrios]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "CUAJIMALPA":
                                     if (CUAJIMALPAacum != Acum)
                                    {   
                                        temporal = Acum - CUAJIMALPAacum;
                                        temporal2 = GCUAJIMALPAacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRcuajimalpa]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GCUAJIMALPAacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRcuajimalpa]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "COAPA":
                                     if (COAPAacum != Acum)
                                    {   
                                      /*   eventual = parseFloat(Inten)/60; 
                                        acumulada = parseFloat(NAcum);
                                        NFecha = new Date(dateFH);
                                        NFecha = NFecha.toUTCString();
                                        NFecha2 = NFecha.split(",");
                                        NFecha3 = NFecha2[1].split("GMT");
                                        NFecha4 = NFecha3[0]; 
                                        ARRcoapa.push([NFecha4,Nombre,eventual,acumulada]); */

                                        temporal = Acum - COAPAacum;
                                        temporal2 = GCOAPAacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRcoapa]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GCOAPAacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRcoapa]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "SISAL":
                                     if (SISALacum != Acum)
                                    {   
                                        temporal = Acum - SISALacum;
                                        temporal2 = GSISALacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRsisal]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GSISALacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRsisal]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "BOSQUEREAL":
                                     if (BOSQUEREALacum != Acum)
                                    {   
                                        temporal = Acum - BOSQUEREALacum;
                                        temporal2 = GBOSQUEREALacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,Nombre,ARRbosquereal]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GBOSQUEREALacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,Nombre,ARRbosquereal]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            case "CUERNAVACA":
                                     if (BALANCINacum != Acum)
                                    {   
                                        temporal = Acum - BALANCINacum;
                                        temporal2 = GBALANCINacum + temporal;
                                        temporal2 = temporal2.toFixed(2);
                                        temporal2 = parseFloat(temporal2);
                                        datos.push([temporal2,"CUERNAVACA",ARRbalancin]);
                                        console.log(Nombre+" camnbio en "+temporal);
                                    }
                                else
                                    {
                                         temporal2 = GBALANCINacum.toFixed(2);
                                         temporal2 = parseFloat(temporal2);   
                                         datos.push([temporal2,"CUERNAVACA",ARRbalancin]);
                                         console.log(Nombre+" no camnbio ");
                                    }
                                break;
                            default:
                                console.log("Aqui nunca puedo entrar");
                        }

                         /*    if (Inten == 0)
                        {
                            
                            console.log("Sin caambios en "+Nombre);
                        } 
                        else
                        {
                            console.log("Cambio "+Nombre+" en "+(Inten/60));
                            
                        }*/


                    /* } */
              
                  }
                  callback2();
            })
          

      }                  








function aver(map) {

 
console.log(" Cargando  mapa "+prueba.length+" "+prueba);
var temporal = [];

  for (var i=0; i<prueba.length; i++)

   {  

    var test = prueba[i];
    test = String(test);
    var temporal = test.split(";");

     var dia = temporal[1];
     var tiempo = temporal[2];
     var fechaN = dia.split(".");
     var anio = parseFloat(fechaN[0]);
     var mes = parseFloat(fechaN[1]-1);
     var dia = parseFloat(fechaN[2]);
     var tiempoN = tiempo.split(":");
     var hora = parseFloat(tiempoN[0]);
     var min = parseFloat(tiempoN[1]);
     //console.log(anio);
     //console.log(mes);
     //console.log(dia);
     //console.log(hora);
     //console.log(min);

     
    


     var fechaArchivo = Date.UTC(anio, mes, dia, hora, min, 0);
     var yo = new Date(fechaArchivo);
     var tiempoActual = new Date();
     var referencia = tiempoActual.getTime();
     referencia = referencia - 18000000;

     var minRetra =  (referencia-fechaArchivo)/60000

     if (minRetra > 1440)

        {

                intensidad[i] = "";
                icono[i] = "manto.png";
                var resultado = Math.round(minRetra*100)/100;
                resultado = String(resultado);
                arreglo[i] = 
                '<h3>Estación '+temporal[0]+'</h3>'+'<button id="sta'+temporal[0]+'">Ver Datos </button><br>'+
                '<br><p>La estación se encuentra en mantenimiento.</p>'+
                '<img src="img/'+i+'.png">';

        }

        else
        {

               var test2 = temporal[3];
                test2  = parseFloat(test2)
                if (test2 == 0)
                {
                    /* if(temporal[0] == "MADIN")
                        var lluvia = "manto.png"
                        else*/
                        lluvia = undefined;   
                    
                    icono[i] = lluvia;
                
                }
                else if((test2 < 20) && (test2 > 0))
                {

                    /*  if(temporal[0] == "MADIN")
                        var lluvia = "manto.png"
                    else */
                        lluvia = "ligera.png"   

                    icono[i] = lluvia;

                    
                }
                else if(test2 > 20)
                    {

                    /*   if(temporal[0] == "MADIN")
                        var lluvia = "manto.png"
                        else */
                        lluvia = "nube.png"

                    icono[i] = lluvia;
                    }
                var resultado = Math.round(test2*100)/100;
                resultado = String(resultado);
                intensidad[i] = resultado;

            /*     if(temporal[0]=="MADIN")
                arreglo[i] = 
                '<h3>Estación '+temporal[0]+'</h3>'+'<button id="sta'+temporal[0]+'">Ver Datos </button><br>'+
                '<br><p>La estación se encuentra en mantenimiento mayor</p>'+
                '<img src="img/'+i+'.png">';
                else        */              
                arreglo[i] = 
                '<h3>Estación '+temporal[0]+'</h3>'+'<button id="sta'+temporal[0]+'">Ver Datos </button><br>'+
                '<br><p>El día <b>'+temporal[1]+'</b> a las <b>'+temporal[2]+'</b>la intensidad de precipitación es de <b>'+temporal[3]+' </b>mm/h</p>'+
                '<img src="img/'+i+'.png">';
                ;


        }
    

      

   
   }
 



  infowindow = new google.maps.InfoWindow({
    maxWidth: 160
  });

    if(marker == undefined)
    {
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(19.32982, -99.18187),
        map: map,
        //label: intensidad[0],
         icon: icono[0],
        title: 'IIUNAM'
      });
    }
    else
    {
        marker.setMap(null);
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(19.32982, -99.18187),
        map: map,
        //label: intensidad[0],
         icon: icono[0],
        title: 'IIUNAM'
      });
    }  
google.maps.event.addListener(marker, 'click', (function(marker) {
    return function() {
      infowindow.setContent(arreglo[0]);
      infowindow.open(map, marker);
    }
  })(marker));

      




  if(marker1 == undefined)
  {
         marker1 = new google.maps.Marker({
          position: new google.maps.LatLng(19.403589, -99.196129),
          map: map,
          icon: icono[1],
          //label: intensidad[1],
          title: 'PREPA 4'
        });
  }
  else
  {
          marker1.setMap(null);
          marker1 = new google.maps.Marker({
          position: new google.maps.LatLng(19.403589, -99.196129),
          map: map,
          icon: icono[1],
          //label: intensidad[1],
          title: 'PREPA 4'
        });
  }
  google.maps.event.addListener(marker1, 'click', (function(marker1) {
    return function() {
      infowindow.setContent(arreglo[1]);
      infowindow.open(map, marker1);
    }
  })(marker1));








if(marker2 == undefined)
{
    marker2 = new google.maps.Marker({
    position: new google.maps.LatLng(19.425079, -99.137096),
    map: map,
     icon: icono[3],
    //label: intensidad[3],
    title: 'SACMEX'
  });
}
else
{
    marker2.setMap(null);
    marker2 = new google.maps.Marker({
    position: new google.maps.LatLng(19.425079, -99.137096),
    map: map,
     icon: icono[3],
    //label: intensidad[3],
    title: 'SACMEX'
  });
}
  google.maps.event.addListener(marker2, 'click', (function(marker2) {
    return function() {
      infowindow.setContent(arreglo[3]);
      infowindow.open(map, marker2);
    }
  })(marker2));

  

  if(marker3 == undefined)
  {
    marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(19.522665, -99.267414),
    map: map,
    icon: icono[2],
    //label: intensidad[2],
    title: 'OCAVM-PRESA MADIN'
  });
  }
  else
  {
    marker3.setMap(null);
    marker3 = new google.maps.Marker({
    position: new google.maps.LatLng(19.522665, -99.267414),
    map: map,
    icon: icono[2],
    //label: intensidad[2],
    title: 'OCAVM-PRESA MADIN'
  });
  }
  google.maps.event.addListener(marker3, 'click', (function(marker3) {
    return function() {
      infowindow.setContent(arreglo[2]);
      infowindow.open(map, marker3);
    }
  })(marker3));


  if (marker4 == undefined)
  {
    marker4 = new google.maps.Marker({
    position: new google.maps.LatLng(19.465908, -99.079917),
    map: map,
    icon: icono[4],
    //label: intensidad[4],
    title: 'OCAVM-CONAGUA-ARAGÓN'
  });
  }
  else
  { 
    marker4.setMap(null);
    marker4 = new google.maps.Marker({
    position: new google.maps.LatLng(19.465908, -99.079917),
    map: map,
    icon: icono[4],
    //label: intensidad[4],
    title: 'OCAVM-CONAGUA-ARAGÓN'
  });
  }
  google.maps.event.addListener(marker4, 'click', (function(marker4) {
    return function() {
      infowindow.setContent(arreglo[4]);
      infowindow.open(map, marker4);
    }
  })(marker4));


  if (marker5 == undefined)
  {
    marker5 = new google.maps.Marker({
    position: new google.maps.LatLng( 19.372083, -99.276242),
    map: map,
    icon: icono[5],
    //label: intensidad[5],
    title: 'VISTA HERMOSA'
  });
  }
  else
  {
    marker5.setMap(null);
    marker5 = new google.maps.Marker({
    position: new google.maps.LatLng( 19.372083, -99.276242),
    map: map,
    icon: icono[5],
    //label: intensidad[5],
    title: 'VISTA HERMOSA'
  });
  }
  google.maps.event.addListener(marker5, 'click', (function(marker5) {
    return function() {
      infowindow.setContent(arreglo[5]);
      infowindow.open(map, marker5);
    }
  })(marker5));


  if(marker6 == undefined)
  {
    marker6 = new google.maps.Marker({
    position: new google.maps.LatLng(19.370004, -99.344314),
    map: map,
    icon: icono[6],
    //label: intensidad[6],
    title: 'DOS RIOS - HUIX'
  });
  }
  else
  {
    marker6.setMap(null);
    marker6 = new google.maps.Marker({
    position: new google.maps.LatLng(19.370004, -99.344314),
    map: map,
    icon: icono[6],
    //label: intensidad[6],
    title: 'DOS RIOS - HUIX'
  });
  }
  google.maps.event.addListener(marker6, 'click', (function(marker6) {
    return function() {
      infowindow.setContent(arreglo[6]);
      infowindow.open(map, marker6);
    }
  })(marker6));


  if(marker7 == undefined)
  {
    marker7 = new google.maps.Marker({
    position: new google.maps.LatLng(  19.355342, -99.291582),
    map: map,
    icon: icono[7],
    //label: intensidad[7],
    title: 'MEMETLA - MEMETLA - CUAJIMALPA'
  });
  }
  else
  { 
    marker7.setMap(null);
    marker7 = new google.maps.Marker({
    position: new google.maps.LatLng(  19.355342, -99.291582),
    map: map,
    icon: icono[7],
    //label: intensidad[7],
    title: 'MEMETLA - MEMETLA - CUAJIMALPA'
  });
  }
  google.maps.event.addListener(marker7, 'click', (function(marker7) {
    return function() {
      infowindow.setContent(arreglo[7]);
      infowindow.open(map, marker7);
    }
  })(marker7));


  if(marker8 == undefined)
  {
    marker8 = new google.maps.Marker({
    position: new google.maps.LatLng(   19.287818, -99.134678),
    map: map,
    icon: icono[8],
    //label: intensidad[8],
    title: 'COAPA - COLEGIO MADRID'
  });
  }
  else
  {
    marker8.setMap(null);
    marker8 = new google.maps.Marker({
    position: new google.maps.LatLng(   19.287818, -99.134678),
    map: map,
    icon: icono[8],
    //label: intensidad[8],
    title: 'COAPA - COLEGIO MADRID'
  });
  }
  google.maps.event.addListener(marker8, 'click', (function(marker8) {
    return function() {
      infowindow.setContent(arreglo[8]);
      infowindow.open(map, marker8);
    }
  })(marker8));


  if(marker9 == undefined)
  {
    marker9 = new google.maps.Marker({
    position: new google.maps.LatLng(21.164655, -90.048472),
    map: map,
    icon: icono[9],
    //label: intensidad[9],
    title: 'SISAL - YUCATÁN'
  });
  }
  else
  {
    marker9.setMap(null);
    marker9 = new google.maps.Marker({
    position: new google.maps.LatLng(21.164655, -90.048472),
    map: map,
    icon: icono[9],
    //label: intensidad[9],
    title: 'SISAL - YUCATÁN'
  });
  }
  google.maps.event.addListener(marker9, 'click', (function(marker9) {
    return function() {
      infowindow.setContent(arreglo[9]);
      infowindow.open(map, marker9);
    }
  })(marker9));



    if(marker10 == undefined)
  {
    marker10 = new google.maps.Marker({
    position: new google.maps.LatLng(19.436133,  -99.283330),
    map: map,
    icon: icono[10],
    //label: intensidad[10],
    title: 'BOSQUE REAL'
  });
  }
  else
  {
    marker10.setMap(null);
    marker10 = new google.maps.Marker({
    position: new google.maps.LatLng(19.436133,  -99.283330),
    map: map,
    icon: icono[10],
    //label: intensidad[10],
    title: 'BOSQUE REAL'
  });
  }
  google.maps.event.addListener(marker10, 'click', (function(marke10) {
    return function() {
      infowindow.setContent(arreglo[10]);
      infowindow.open(map, marker10);
    }
  })(marker10));




   if(marker11 == undefined)
  {
    marker11 = new google.maps.Marker({
    position: new google.maps.LatLng(18.897014,  -99.229139),
    map: map,
    icon: icono[11],
    //label: intensidad[11],
    title: 'CUERNAVACA'
  });
  }
  else
  {
    marker11.setMap(null);
    marker11 = new google.maps.Marker({
    position: new google.maps.LatLng(18.897014,  -99.229139),
    map: map,
    icon: icono[11],
    //label: intensidad[11],
    title: 'CUERNAVACA'
  });
  }
  google.maps.event.addListener(marker11, 'click', (function(marke11) {
    return function() {
      infowindow.setContent(arreglo[11]);
      infowindow.open(map, marker11);
    }
  })(marker11));

  
}




$(document).on("click","#staPREPA4",function() { 

    infowindow.close();

  var url = 'http://oh-iiunam.mx/prepa42.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staPREPA42").click(function(){

  var url = 'http://oh-iiunam.mx/prepa42.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staIIUNAM",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/iiunam2.html';

  open(url,'','top=700,left=700,width=800,height=620');


  });

 $("#staIIUNAM2").click(function(){

  var url = 'http://oh-iiunam.mx/iiunam2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staSACMEX",function() {

  infowindow.close(); 

  var url = 'http://oh-iiunam.mx/sacmex2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staSACMEX2").click(function(){

  var url = 'http://oh-iiunam.mx/sacmex2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staMADIN",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/madin2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staMADIN2").click(function(){

  var url = 'http://oh-iiunam.mx/madin2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staCUAJIMALPA",function() {

  infowindow.close(); 

  var url = 'http://oh-iiunam.mx/cuajimalpa2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staCUAJIMALPA2").click(function(){

  var url = 'http://oh-iiunam.mx/cuajimalpa2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staDOSRIOS",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/dosrios2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staDOSRIOS2").click(function(){

  var url = 'http://oh-iiunam.mx/dosrios2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staVHERMOSA",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/vhermosa2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staVHERMOSA2").click(function(){

  var url = 'http://oh-iiunam.mx/vhermosa2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staARAGON",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/aragon2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staARAGON2").click(function(){

  var url = 'http://oh-iiunam.mx/aragon2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


$(document).on("click","#staCOAPA",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/coapa2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staCOAPA2").click(function(){

  var url = 'http://oh-iiunam.mx/coapa2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });


  $(document).on("click","#staSISAL",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/sisal2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staSISAL2").click(function(){

  var url = 'http://oh-iiunam.mx/sisal2.html';

  open(url,'','top=700,left=700,width=700,height=620');


});



  $(document).on("click","#staBOSQUEREAL",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/bosquereal2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staBOSQUEREAL2").click(function(){

  var url = 'http://oh-iiunam.mx/bosquereal2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });







  $(document).on("click","#staCUERNAVACA",function() { 

  infowindow.close();

  var url = 'http://oh-iiunam.mx/cuernavaca2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });

 $("#staCUERNAVACA2").click(function(){

  var url = 'http://oh-iiunam.mx/cuernavaca2.html';

  open(url,'','top=700,left=700,width=700,height=620');


  });



 




