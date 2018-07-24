#! /bin/bash
segundo=""
para=60
dir="data"
data="data"
tmpAcumII=0
cuentaII=0
NAcumII=0
acum=0
dir="/home/centos/scripts/Node/data"
archivo="data/datos.txt"
cabecera='{
    "type": "FeatureCollection",
    "features": ['
pie="}]
  }"
intermedio=""
cd /home/centos/scripts/Node
while [[ 1 ]]; do
        sleep 5

mysql -N -u root -pyorgos84 test << EOF
truncate table temporalpag;
EOF

estaciones=( 'IIUNAM' 'SACMEX' 'ARAGON' 'MADIN' 'COAPA' 'VHERMOSA' 'CUAJIMALPA' 'PREPA4' 'DOSRIOS' 'BOSQUEREAL' 'TLALNE' 'CCHOTE' 'CCHVALLEJO' 'UAMAZC' )
escalatiempo=( 'quince' 'media' 'hora' 'treshoras' 'treshoras' 'seishoras' 'docehoras' 'dia')

max="max"
min="min"
maxpag="maxpag"
minpag="minpag"
acumulada="acumulada"
dia="dia"
dif="dif"
pag="pag"
brinco="\\n\t"

   for item in ${estaciones[*]}

   do

         echo $item
        tiempoUTC=`date +%s`
        difHoraria=`TZ=America/Mexico_City date +%z`
        horalocal=`TZ=America/Mexico_City date +%H`
        echo $horalocal
        anio=`TZ=America/Mexico_City date +%Y`
        mes=`TZ=America/Mexico_City date +%m`
        dia=`TZ=America/Mexico_City date +%d`
        hora=16
        minuto=0
        segundo=0

        difHoraria=${difHoraria:0:3}
        difHoraria=`calc 0 - $difHoraria`
        segdifHoraria=`calc 60*60*$difHoraria`
        UTClocal=`calc $tiempoUTC - $segdifHoraria`
        hacequince=`calc $UTClocal - 900`
        hacemedia=`calc $UTClocal - 1800`
        hacehora=`calc $UTClocal - 3600`
        hacetres=`calc $UTClocal - 10800`
        haceseis=`calc $UTClocal - 21600`
        hacedoce=`calc $UTClocal - 21600`
        hacedia=`calc $UTClocal - 43200`

      if [[ $horalocal -gt  15 ]]; then
          echo "La hora local es mayor que las tres de la tarde "
          anio=`TZ=America/Mexico_City date +%Y`
          mes=`TZ=America/Mexico_City date +%m`
          dia=`TZ=America/Mexico_City date +%d`

        else
          echo "La hora local es menor que las tres de la tarde "
          anio=`TZ=America/Mexico_City date -d '1 day ago' '+%Y'`
          mes=`TZ=America/Mexico_City date -d '1 day ago' '+%m'`
          dia=`TZ=America/Mexico_City date -d '1 day ago' '+%d'`


       fi

        acum4pm=`date -d ''$anio'-'$mes'-'$dia' 16:00:00' '+%s'`



        temporal=`mysql -N -u root -pyorgos84 test << EOF
        select MAX(acumuladaplus), MIN(acumuladaplus) from estaciones where estacion = '$item' AND unix_timestamp(fecha_servidor) >= '$hacedia';
        select MAX(acumuladaplus), MIN(acumuladaplus) from estaciones where estacion = '$item' AND unix_timestamp(fecha_servidor) >= '$acum4pm';
EOF`

        temporal2=`mysql -N -u root -pyorgos84 test << EOF
        select MAX(acumuladaplus), MIN(acumuladaplus) from estaciones where estacion = '$item' AND unix_timestamp(fecha_servidor) >= '$acum4pm';
EOF`

        #echo "temporal es :"$temporal
        #export $item$dia=`echo $temporal`
        #test=$item$dia
        #echo $item$dia
        #test2=${!test}
        #echo $test2
        #echo $test" :"$test2
        export $item$max="`echo $temporal | cut -d " " -f 1`"
        export $item$min="`echo $temporal | cut -d " " -f 2`"
        export $item$maxpag="`echo $temporal | cut -d " " -f 3`"
        export $item$minpag="`echo $temporal | cut -d " " -f 4`"

        maxi=$item$max
        echo $maxi
        max2=${!maxi}
        echo $max2

        maxPag2=$item$maxpag
        maxPag3=${!maxPag2}
        #echo $maxi" "$max2

        mini=$item$min
        min2=${!mini}

        minPag2=$item$minpag
        minPag3=${!minPag2}
        #echo $mini" "$min2

 
        if [[ $max2 == "NULL" || $min2 == "NULL" ]]; then


          echo $item" Con valor de null "
          export $dif$item=`echo "ND"`




        else

        echo $item" No tiene valor de NULL "
        tmp=`calc $max2 - $min2`
        export $dif$item=`echo $tmp`
        fi




        #echo "Hola mundo"
     


        pagina=`calc $maxPag3 - $minPag3`
        export $pag$item=`echo $pagina`


        mysql -u root -pyorgos84 test << EOF
        INSERT INTO temporalpag (estacion,acum) VALUES ('$item', '$pagina'); 
EOF
        #acumm=$dif$item
        #acummm2=${!acumm}
        #echo $acumm" :"$acummm2
        #echo $max2
        #echo $min2
        #echo $acummm

  done

        


        tabla=`mysql -N -u root -pyorgos84 test << EOF
        select * from temporalpag order by acum DESC; 
EOF`

echo $tabla
        
        uno1="`echo $tabla | cut -d " " -f 1`"
        uno2="`echo $tabla | cut -d " " -f 2`"
        dos1="`echo $tabla | cut -d " " -f 3`"
        dos2="`echo $tabla | cut -d " " -f 4`"
        tres1="`echo $tabla | cut -d " " -f 5`"
        tres2="`echo $tabla | cut -d " " -f 6`"
        cuatro1="`echo $tabla | cut -d " " -f 7`"
        cuatro2="`echo $tabla | cut -d " " -f 8`"
        cinco1="`echo $tabla | cut -d " " -f 9`"
        cinco2="`echo $tabla | cut -d " " -f 10`"
        seis1="`echo $tabla | cut -d " " -f 11`"
        seis2="`echo $tabla | cut -d " " -f 12`"
        siete1="`echo $tabla | cut -d " " -f 13`"
        siete2="`echo $tabla | cut -d " " -f 14`"
        ocho1="`echo $tabla | cut -d " " -f 15`"
        ocho2="`echo $tabla | cut -d " " -f 16`"
        nueve1="`echo $tabla | cut -d " " -f 17`"
        nueve2="`echo $tabla | cut -d " " -f 18`"
        diez1="`echo $tabla | cut -d " " -f 19`"
        diez2="`echo $tabla | cut -d " " -f 20`"
        once1="`echo $tabla | cut -d " " -f 21`"
        once2="`echo $tabla | cut -d " " -f 22`"
        doce1="`echo $tabla | cut -d " " -f 23`"
        doce2="`echo $tabla | cut -d " " -f 24`"
        trece1="`echo $tabla | cut -d " " -f 25`"
        trece2="`echo $tabla | cut -d " " -f 26`"
        catorce1="`echo $tabla | cut -d " " -f 27`"
        catorce2="`echo $tabla | cut -d " " -f 28`"


        echo "La acumulada en IIUNAM es: "$difIIUNAM
        echo "La acumulada en DOSRIOS es: "$difDOSRIOS
        echo "La acumulada en CUAJIMALPA es: "$difCUAJIMALPA
        echo "La acumulada en BOSQUE REAL es: "$difBOSQUEREAL
        echo "La acumulada en MADIN es: "$difMADIN
        echo "La acumulada en VISTA HERMOSA es: "$difVHERMOSA
        echo "La acumulada en PREPA4 es: "$difPREPA4
        echo "La acumulada en SACMEX es: "$difSACMEX
        echo "La acumulada en COAPA es: "$difCOAPA
        echo "La acumulada en ARAGON es: "$difARAGON
        echo "La acumulada en TLALNE es: "$difTLALNE
        echo "La acumulada en CCH-OTE es: "$difCCHOTE
        echo "La acumulada en CCH-VALLEJO es: "$difCCHVALLEJO
        echo "La acumulada en UAM-AZC es: "$difUAMAZC


echo ""$uno1" "$uno2"
"$dos1" "$dos2"
"$tres1" "$tres2"
"$cuatro1" "$cuatro2"
"$cinco1" "$cinco2"
"$seis1" "$seis2"
"$siete1" "$siete2"
"$ocho1" "$ocho2"
"$nueve1" "$nueve2"
"$diez1" "$diez2"
"$once1" "$once2"
"$doce1" "$doce2"
"$trece1" "$trece2"
"$catorce1" "$catorce2"" > $dir/datospagina.txt


echo " {
    "'"type"'": "'"FeatureCollection"'",
   "'"features"'": [
        { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.344314, 19.370004]},
        "'"properties"'": {
          "'"name"'": "'"DOS RIOS"'",
          "'"value"'": "$difDOSRIOS"
        }
      },
      {"'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.291582,  19.355342]},
        "'"properties"'": {
          "'"name"'": "'"CUAJIMALPA"'",
          "'"value"'": "$difCUAJIMALPA"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.283330, 19.436133]},
        "'"properties"'": {
          "'"name"'": "'"BOSQUE REAL"'",
          "'"value"'": "$difBOSQUEREAL"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.267414, 19.522665]},
        "'"properties"'": {
          "'"name"'": "'"P MADIN"'",
          "'"value"'": "$difMADIN"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.276242, 19.372083]},
        "'"properties"'": {
          "'"name"'": "'"VHERMOSA"'",
          "'"value"'": "$difVHERMOSA"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.196129, 19.403589]},
        "'"properties"'": {
          "'"name"'": "'"PREPA 4"'",
          "'"value"'": "$difPREPA4"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.18187, 19.32982]},
        "'"properties"'": {
          "'"name"'": "'"IIUNAM"'",
          "'"value"'": "$difIIUNAM"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.137096, 19.425079]},
        "'"properties"'": {
          "'"name"'": "'"SACMEX"'",
          "'"value"'": "$difSACMEX"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.134678, 19.287818]},
        "'"properties"'": {
          "'"name"'": "'"C MADRID"'",
          "'"value"'": "$difCOAPA"
        }
      },
      { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.079917, 19.465908]},
        "'"properties"'": {
          "'"name"'": "'"ARAGON"'",
          "'"value"'": "$difARAGON"
        }
       },
       { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.194856, 19.538833]},
        "'"properties"'": {
          "'"name"'": "'"TLALNE"'",
          "'"value"'": "$difTLALNE"
        }
       },
       { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.059703, 19.383573]},
        "'"properties"'": {
          "'"name"'": "'"CCH-OTE"'",
          "'"value"'": "$difCCHOTE"
        }
       },
       { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.140496, 19.482562]},
        "'"properties"'": {
          "'"name"'": "'"CCH-OTE"'",
          "'"value"'": "$difCCHVALLEJO"
        }
       },
       { "'"type"'": "'"Feature"'",
        "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": [-99.18924166, 19.5035917]},
        "'"properties"'": {
          "'"name"'": "'"UAM AZC"'",
          "'"value"'": "$difUAMAZC"
        }
       }



        ]}" > $dir/datosAcum.txt


        cd /home/centos/scripts/Node
        ./acum.sh
        sleep 1
        sudo scp -i /home/centos/scripts/Node/id_rsa /home/centos/scripts/Node/tests/compres/Acumatriz.txt.gz jorge@166.62.38.156:/home/jorge/public_html/geojson
        sudo scp -i /home/centos/scripts/Node/id_rsa /home/centos/scripts/Node/data/datospagina.txt jorge@166.62.38.156:/home/jorge/public_html/geojson

        segundo=$(date "+%S")
        segundo=`echo $segundo|sed 's/^0*//'`
        echo $segundo
        resta="`calc $para - $segundo`"
        echo $resta
        sleep $resta
done

