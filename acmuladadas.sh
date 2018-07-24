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

estaciones=( 'IIUNAM' 'SACMEX' 'ARAGON' 'MADIN' 'COAPA' 'VHERMOSA' 'CUAJIMALPA' 'PREPA4' 'DOSRIOS' 'BOSQUEREAL' 'TLALNE' 'CCHOTE' 'CCHVALLEJO' 'UAMAZC' )
escalatiempo=( 'quince' 'media' 'hora' 'treshoras' 'treshoras' 'seishoras' 'docehoras' 'dia')

max="max"
min="min"
acumulada="acumulada"
dia="dia"
dif="dif"

   for item in ${estaciones[*]}

   do

         echo $item
        tiempoUTC=`date +%s`
        difHoraria=`TZ=America/Mexico_City date +%z`
        difHoraria=${difHoraria:0:3}
        difHoraria=`calc 0 - $difHoraria`
        segdifHoraria=`calc 60*60*$difHoraria`
        UTClocal=`calc $tiempoUTC - $segdifHoraria`
        hacequince=`calc $UTClocal - 900`
        hacemedia=`calc $UTClocal - 1800`
        hacehora=`calc $UTClocal - 3600`
        hacetres=`calc $UTClocal - 10800`
        haceseis=`calc $UTClocal - 21600`
        hacedoce=`calc $UTClocal - 43200`
        hacedia=`calc $UTClocal - 86400`

        temporal=`mysql -N -u root -pyorgos84 test << EOF
        select MAX(acumuladaplus), MIN(acumuladaplus) from estaciones where estacion = '$item' AND unix_timestamp(fecha_servidor) >= '$hacedia';
EOF`

        echo "temporal es :"$temporal
        #export $item$dia=`echo $temporal`
        #test=$item$dia
        #echo $item$dia
        #test2=${!test}
        #echo $test2
        #echo $test" :"$test2
        export $item$max="`echo $temporal | cut -d " " -f 1`"
        export $item$min="`echo $temporal | cut -d " " -f 2`"

        maxi=$item$max
        max2=${!maxi}
        #echo $maxi" "$max2

        mini=$item$min
        min2=${!mini}
        #echo $mini" "$min2

        #echo "Hola mundo"
        tmp=`calc $max2 - $min2`
        export $dif$item=`echo $tmp`
        #acumm=$dif$item
        #acummm2=${!acumm}
        #echo $acumm" :"$acummm2
        #echo $max2
        #echo $min2
        #echo $acummm

done

        






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

        segundo=$(date "+%S")
        segundo=`echo $segundo|sed 's/^0*//'`
        echo $segundo
        resta="`calc $para - $segundo`"
        echo $resta
        sleep $resta
done

