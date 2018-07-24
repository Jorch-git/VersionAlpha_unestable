#! /bin/bash


estaciones=( 'IIUNAM' 'SACMEX' 'ARAGON' 'MADIN' 'COAPA' 'VHERMOSA' 'CUAJIMALPA' 'PREPA4' 'DOSRIOS' 'BOSQUEREAL' 'TLALNE' 'CCHOTE' 'CCHVALLEJO' 'UAMAZC' )
escalatiempo=( 'quince' 'media' 'hora' 'treshoras' 'treshoras' 'seishoras' 'docehoras' 'dia')

max="max"
min="min"
acumulada="acumulada"
dia="dia"


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
        hacedoce=`calc $UTClocal - 21600`
        hacedia=`calc $UTClocal - 43200`

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
	echo $maxi" "$max2        

        mini=$item$min
        min2=${!mini}
	echo $mini" "$min2
        
        echo "Hola mundo" 
        tmp=`calc $max2 - $min2`
	export $item$acumulada=`echo $tmp`
   	#acumm=$item$acumulada
	#acummm2=${!acumm}
        #echo $acumm" :"$acummm2
        #echo $max2
        #echo $min2
	#echo $acummm

done


echo $IIUNAMacumulada
echo "VISTA HERMOSA "$VHERMOSAacumulada
