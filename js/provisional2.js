mapaJSON2.setStyle(function(feature) {
      var valor = feature.getProperty('z');
      var opacidad = 0.6;
      var color = "white";
      if (valor < 0.5)
      {
          opacidad = 0;
      }
      if (valor >= 0.5 && valor < 2 )
      {
          opacidad = 0.6;
          obtenColor(0.5,2,valor, function (){
             color = 'rgb(255,44,2)';
          });
          
      }
       if (valor >= 2 && valor < 5)
      {
          opacidad = 0.6;
          obtenColor(0.5,5, valor, function (){
             color = 'rgb(255,44,2)';
          });
          
      }
       if (valor >= 5 && valor < 8)
      {
          opacidad = 0.6;
          obtenColor(0.5,5, valor, function (){
             color = 'rgb(255,44,2)';
          });
          
      }
       if (valor >= 8 && valor < 12)
      {
          opacidad = 0.6;
          obtenColor(0.5,5, valor, function (){
             color = 'rgb(255,44,2)';

          });
          
      }
       if (valor >= 12 && valor < 30)
      {
          opacidad = 0.6;
          obtenColor(0.5,5, valor,function (){
             color = 'rgb(255,44,2)';

          });
          
      }
       if (valor >= 30 && valor < 60)
      {
          opacidad = 0.6;
          obtenColor(0.5,5, valor,function (){
             color = 'rgb(255,44,2)';

          });
          
      }
      if (valor >= 60 && valor < 150)
      {
          opacidad = 0.6;
          obtenColor(0.5,5, valor,function (){
             color = 'rgb(255,44,2)';

          });
          
      }
   return({
     fillColor: color,
     strokeWeight: 0,
     strokeColor: 'White',
     fillOpacity: opacidad
     });