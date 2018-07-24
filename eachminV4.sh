#! /bin/bash
echo "Programa Estaciones"
ruta="/var/ftp/pub"
temporal=""
viejaAcum=0
temporalAcum=0
variable1=""
estacion=""
#IIUNAM=""
#IIUNAMMESA=""
#COAPA=""
#COAPAMESA=""
#ARAGON=""
#ARAGONMESA=""
#BOSQUEREAL=""
#BOSQUEREALMESA=""
minActual=$(date "+%M")
min=70  #minuto irreal que utilizo para no caer en la primera condicion if(minActul igual a min)
number=1
archivo=""
dir="/home/centos/scripts/Node/data"
dir2="/home/centos/scripts/Node/data/oh"
dir3="/var/www/html"
logdir="/home/centos/logs"
datos="datos"
datos2="datos2"
compara=""
inten=""
coord=""
aniomin="$(date '+%y%m')"
titulo="$(date '+%y-%m-%d_%T')"
parametro=""
control=""
inten=""
acum=""
inten2=""
acum2=""
visi=""
visi2=""
reflec=""
reflec2=""
gotas=""
gotas2=""
cine=""
cine2=""
fechaS=""
fechaS2=""
fechaC=""
horaS=""
horaS2=""
guion=""
estacion1=""
coma=";"
tipopre="NP"
checkiiunam="NO"
checkaragon="NO"
checkcoapa="NO"
checkbosquereal="NO"
checkdosrios="NO"
checkcuajimalpa="NO"
checkmadin="NO"
checkvhermosa="NO"
checkprepa4="NO"
checksacmex="NO"
checktlalne="NO"
checkcchote="NO"
checkcchvallejo="NO"
#acumuladamas=0
tipolluvia="NA"
voltaje=12
cumu="acum"
cumu2="acum.txt"
tmp="tmp"
valorP=0
control="control"
controlIIUNAM=true
controlVHERMOSA=true
controlARAGON=true
controlCOAPA=true
controlBOSQUEREAL=true
controlDOSRIOS=true
controlCUAJIMALPA=true
controlMADIN=true
controlPREPA4=true
controlSACMEX=true
controlTLALNE=true
controlCCHOTE=true
controlCCHVALLEJO=true
controlUAMAZC=true
controlSISAL=true
controlCUERNAVACA=true







tiempoServidor=`TZ=America/Mexico_City date +%Y-%m-%d' '%H:%M:00`

# Crea archivos de acumuladas 
touch /home/centos/scripts/Node/data/IIUNAMacum.txt
touch /home/centos/scripts/Node/data/SACMEXacum.txt
touch /home/centos/scripts/Node/data/MADINacum.txt
touch /home/centos/scripts/Node/data/PREPA4acum.txt
touch /home/centos/scripts/Node/data/DOSRIOSacum.txt
touch /home/centos/scripts/Node/data/CUAJIMALPAacum.txt
touch /home/centos/scripts/Node/data/BOSQUEREALacum.txt
touch /home/centos/scripts/Node/data/VHERMOSAacum.txt
touch /home/centos/scripts/Node/data/ARAGONacum.txt
touch /home/centos/scripts/Node/data/COAPAacum.txt
touch /home/centos/scripts/Node/data/CCHOTEacum.txt
touch /home/centos/scripts/Node/data/TLALNEacum.txt
touch /home/centos/scripts/Node/data/CCHVALLEJOacum.txt


#Le asigno permisos para que el usuario centos pueda leer los archivos
chown centos:centos /home/centos/scripts/Node/data/IIUNAMacum.txt
chown centos:centos /home/centos/scripts/Node/data/SACMEXacum.txt
chown centos:centos /home/centos/scripts/Node/data/MADINacum.txt
chown centos:centos /home/centos/scripts/Node/data/PREPA4acum.txt
chown centos:centos /home/centos/scripts/Node/data/DOSRIOSacum.txt
chown centos:centos /home/centos/scripts/Node/data/CUAJIMALPAacum.txt
chown centos:centos /home/centos/scripts/Node/data/BOSQUEREALacum.txt
chown centos:centos /home/centos/scripts/Node/data/VHERMOSAacum.txt
chown centos:centos /home/centos/scripts/Node/data/ARAGONacum.txt
chown centos:centos /home/centos/scripts/Node/data/COAPAacum.txt
chown centos:centos /home/centos/scripts/Node/data/CCHOTEacum.txt
chown centos:centos /home/centos/scripts/Node/data/TLALNEacum.txt
chown centos:centos /home/centos/scripts/Node/data/CCHVALLEJOacum.txt


#Termina inizalización de archivos, podria corre en un codigo diferente
#y dejar en otro solo la rutina de del while
incia=true

foo () {

    nuevaAcum=$2
    tmporalAcum=$3
    acumuladaActual=1






}


#Todo el programa es un while que abarca todo
inotifywait -m -r $ruta -e close_write|
    while read path action file; do
    peso=`ls -la $path$file | cut -d " " -f 5`
    if [[ ( $peso -gt 4000 && ( $file == *.txt  || $file == *.par )) || ( $peso -gt 200 && $file == *.oh ) ]]; then
        ONE=1
        dataset_date=`TZ=America/Mexico_City date`
        MinAterior=`TZ=America/Mexico_City date -d "$dataset_date - $ONE minutes" +%d-%m-%Y_%H:%M`
        tiempoServidor=`TZ=America/Mexico_City date +%Y-%m-%d' '%H:%M:00`
        fechaActual=`TZ=America/Mexico_City date +%d-%m-%Y`
        horaLocal=`TZ=America/Mexico_City date +%H`
        aniomes="$(date '+%Y%m')"
        min=$(date "+%M")  #Cada que llega un archivo veo que minuto es
        fecha=$(date "+%D_%H:%M:%S")  #Pido la fecha completa, %D dd/mm/aa %H hora %M min %S seg
        echo $min
        echo $minActual 
        actual=$(date "+%s") #tiempo actual en segundos, sirve para restar valores
        if [[ "$min" != "$minActual" ]]; then  #Ciclo que se utiliza para reinicialar variables cada que cambie el minuto
                echo "Ha cambiado de minuto!!"
                minActual=$min #Asigno minutoActual para la comparación
                echo "" > $dir/$datos2.txt #Inicializa archivo para crear mapa de precipitación
                echo "" > $dir/$datos.txt #Inicializo el archivo para crear pines en el mapa
                archivo=""  # Inicializo variable archivo
                echo  "" > $logdir/ArchivosMinuto.log  #Inicializo minuto Actual


                if [[ $checkiiunam == "SI" ]];then
                echo  iiunam_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkiiunam == "NO" ]];then
                echo  iiunam_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkaragon == "SI" ]]
                    then
                echo  aragon_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkaragon == "NO" ]]
                    then
                echo  aragon_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkcoapa == "SI" ]]
                    then
                echo  coapa_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkcoapa == "NO" ]]
                    then
                echo  coapa_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkbosquereal == "SI" ]]
                    then
                echo  bosquereal_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkbosquereal == "NO" ]]
                    then
                echo  bosquereal_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkdosrios == "SI" ]]
                    then
                echo  dosrios_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkdosrios == "NO" ]]
                    then
                echo  dosrios_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkcuajimalpa == "SI" ]]
                    then
                echo  cuajimalpa_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkcuajimalpa == "NO" ]]
                    then
                echo  cuajimalpa_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkmadin == "SI" ]]
                    then
                echo  madin_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkmadin == "NO" ]]
                    then
                echo  madin_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkvhermosa == "SI" ]]
                    then
                echo  vhermosa_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkvhermosa == "NO" ]]
                    then
                echo  vhermosa_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkprepa4 == "SI" ]]
                    then
                echo  prepa4_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkprepa4 == "NO" ]]
                    then
                echo  prepa4_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checksacmex == "SI" ]]
                    then
                echo  sacmex_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checksacmex == "NO" ]]
                    then
                echo  sacmex_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checktlalne == "SI" ]]
                    then
                echo  tlalne_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checktlalne == "NO" ]]
                    then
                echo  tlalne_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkcchote == "SI" ]]
                    then
                echo  cchote_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkcchote == "NO" ]]
                    then
                echo  cchote_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                if [[ $checkcchvallejo == "SI" ]]
                    then
                echo  cchvallejo_$MinAterior >> $logdir/ArchivosMinuto.log
                elif [[ $checkcchvallejo == "NO" ]]
                    then
                echo  cchvallejo_$MinAterior >> $logdir/ArchivosFaltantes$fechaActual.log
                fi

                checkiiunam="NO"
                checkaragon="NO"
                checkcoapa="NO"
                checkbosquereal="NO"
                checkdosrios="NO"
                checkcuajimalpa="NO"
                checkmadin="NO"
                checkvhermosa="NO"
                checkprepa4="NO"
                checksacmex="NO"
                checktlalne="NO"
                checkcchote="NO"
                checkcchvallejo="NO"

        fi
        echo "El archivo es '$file' y la ruta es '$path' con la accion '$action'" # If so, do your thing here!
        estacion="$(echo $file | cut -d "_" -f 1)" #Separo el nombre del archivo por guiones

        if [[ $estacion == IIUNAM* ]];then
                coord="-99.18187, 19.32982"
                filtro="SI"
                estacion="IIUNAM"
                estacion2="iiunam"
                mapa="SI"
                checkiiunam="SI"
                echo $estacion
        
        elif [[ $estacion == ARAGON* ]]; then
                coord="-99.079917, 19.465908"
                filtro="SI"
                estacion="ARAGON"
                estacion2="aragon"
                mapa="SI"
                checkaragon="SI"
                echo "ARAGON"
        
        elif [[ $estacion == COAPA* ]]; then
                coord="-99.134678, 19.287818"
                filtro="SI"
                estacion="COAPA"
                estacion2="coapa"
                mapa="SI"
                checkcoapa="SI"
               echo "COAPA"
        
        elif [[ $estacion == BOSQUEREAL* ]]; then
                coord="-99.283330, 19.436133"
                filtro="SI"
                estacion="BOSQUEREAL"
                estacion2="bosquereal"
                mapa="SI"
                checkbosquereal="SI"
                echo "BOSQUE REAL"
        
        elif [[ $estacion == DOSRIOS* ]];then
                coord="-99.344314, 19.370004"
                filtro="SI"
                estacion="DOSRIOS"
                estacion2="dosrios"
                checkdosrios="SI"
                mapa="SI"
                echo "DOS RIOS"
        
        elif [[ $estacion == CUAJIMALPA* ]]; then
                coord="-99.291582, 19.355342"
                filtro="SI"
                estacion2="cuajimalpa"
                estacion="CUAJIMALPA"
                mapa="SI"
                checkcuajimalpa="SI"
                echo "CUAJIMALPA"
        
        elif [[ $estacion == MADIN* ]]; then
                coord="-99.267414, 19.522665"
                filtro="SI"
                estacion="MADIN"
                estacion2="madin"
                mapa="SI"
                checkmadin="SI"
                echo "MADIN"
        
        elif [[ $estacion == VHERMOSA* ]]; then
                coord="-99.276242, 19.372083"
                filtro="SI"
                estacion="VHERMOSA"
                estacion2="vhermosa"
                mapa="SI"
                checkvhermosa="SI"
                echo "VISTA HERMOSA"
        
        elif [[ $estacion == PREPA4* ]];then
                coord="-99.196129, 19.403589"
                filtro="SI"
                estacion="PREPA4"
                estacion2="prepa4"
                mapa="SI"
                checkprepa4="SI"
                echo "PREPA 4"
        
        elif [[ $estacion == SACMEX* ]]; then
                coord="-99.137096, 19.425079"
                filtro="SI"
                estacion="SACMEX"
                estacion2="sacmex"
                mapa="SI"
                checksacmex="SI"
                echo "SACMEX"
        
        elif [[ $estacion == TLALNE* ]]; then
                coord="-99.194856, 19.538833"
                filtro="SI"
                estacion="TLALNE"
                estacion2="tlalne"
                mapa="SI"
                checktlalne="SI"
                echo "TLALNE"
        
        elif [[ $estacion == CCHOTE* ]]; then
                coord="-99.059703, 19.383573"
                filtro="SI"
                estacion="CCHOTE"
                estacion2="cchote"
                mapa="SI"
                checkcchote="SI"
                echo "CCHOTE"
        
        elif [[ $estacion == CCHVALLEJO* ]]; then
                coord="-99.140496, 19.482562"
                filtro="SI"
                estacion="CCHVALLEJO"
                estacion2="cchvallejo"
                mapa="SI"
                checkcchvallejo="SI"
                echo "CCH-VALLEJO"

        elif [[ $estacion == UAMAZC* ]]; then
                coord="-99.18924166, 19.5035917"
                filtro="SI"
                estacion="UAMAZC"
                estacion2="uamazc"
                mapa="SI"
                checkuamazc="SI"
                echo "UAM-AZC"
        
        elif [[ $estacion == SISAL* ]]; then
                filtro="SI"
                coord="-90.048472, 21.164655"
                estacion="SISAL"
                estacion2="sisal"
                mapa="NO"
                echo "SISAL"
        
        elif [[ $estacion == CUERNAVACA* ]]; then
                filtro="SI"
                coord="-99.229139, 18.897014"
                estacion="CUERNAVACA"
                estacion2="cuernavaca"
                mapa="NO"
                echo "CUERNAVACA"

        else
                #Borrar variables para que no caer en problmea
                filtro="NA"
                estacion=""
                coord=""
                mapa="NO"
                echo "El archivo "$file" no tiene autorizacion"
        #        echo "Ninguna estación Conocida"
        #        echo "El archivo "$file" pesa menos puede estar incompleto"
        #        echo  $file" el archivo no esta autorizado para escribir en este directorio" >> $logdir/ArchivosNoPermitos$fechaActual.log
        #        chown centos:centos $logdir/ArchivosNoPermitos$fechaActual.log
        fi
        if [[ "$filtro" == "SI" ]]; then
                if [[ $file == *.oh  ]]; then
                    echo "Archivo esta comprimido"
                    gunzip -c < $path$file | while read line 
                    do
                        #echo "Entre a CCHOTE"
                        compara="`echo $line | cut -b 1,2,3`"
                        #echo $compara
                        if [[ $compara == "01:" ]]; then
                                inten2="`echo $line | cut -d ":" -f 2`"
                                inten2="`python -c "print $inten2"`"
                                echo "Intensidad = "$inten2
                        fi
                        if [[ $compara == "02:" ]]; then
                            acum2="`echo $line | cut -d ":" -f 2`"
                            acum2="`python -c "print $acum2"`"
                            echo "Acumulada = "$acum2
                            echo "Estos es acum "$acum2
                            concatena2=$control$estacion
                            echo "Esto es concatena2 "$concatena2
                            primeravez2=${!concatena2}
                            echo "Esto es primera vez "$primeravez2
                            if [[ $primeravez2 == true ]]; then
                                echo "esta la primera vez quee paso por la estacion: "$estacion
                                export $control$estacion=false
                                concatena3=$control$estacion
                                echo "Esto es concatena3 "$concatena3
                                segundavez=${!concatena3}
                                echo "Esto es dentro del if primeravez "$segundavez



                                export $estacion$cumu=`cat /home/centos/scripts/Node/data2/$estacion$cumu2`
                                export $tmp$estacion$cumu=$acum2
                                direccion1=$estacion$cumu
                                NAcum=${!direccion1}
                                acumuladamas2=$NAcum                                 
                            else
                                        echo "esta NO es la primera vez quee paso por la estacion: "$estacion
                                        direccion1=$estacion$cumu
                                        direccion2=$tmp$estacion$cumu
                                        NAcum=${!direccion1}
                                        tmpAcum=${!direccion2}

                                        echo "esto es NACUM "$NAcum
                                        echo "esto es tmpAcum "$tmpAcum

                                        resta=`calc $tmpAcum - $acum`
                                        echo "Esto es Resta "$resta
                                          algo=`echo $resta'>'$valorP | bc -l`
                                          echo $algo
                                        if [[ "$algo" -eq 1 ]];then
                                            echo "La resta es mayor o igual a cero"
                                                export NAcum=`calc $NAcum + $acum`
                                                export $estacion$cumu=`echo $NAcum`
                                                echo $NAcum > /home/centos/scripts/Node/data2/$estacion$cumu2
                                                acumuladamas2=$NAcum
                                                export $tmp$estacion$cumu=$acum2
                                        else
                                            echo "La resta es menor o igual a cero"
                                                export NAcum=`calc $NAcum + $acum - $tmpAcum`
                                                export $estacion$cumu=`echo $NAcum`
                                                echo $NAcum > /home/centos/scripts/Node/data2/$estacion$cumu2
                                                acumuladamas2=$NAcum
                                                export $tmp$estacion$cumu=$acum2
 
                                        fi
                            fi
                            echo "Esto es acumuladamas "$acumuladamas2


                        fi

                        if [[ $compara == "05:" ]]; then
                                tipopre="`echo $line | cut -d ":" -f 2`"
                                tipopre="`echo $tipopre|sed 's/^ *//'`"
                                tipopre=${tipopre:0:4}
                                echo "TipoPrecipitacion = "$tipopre
                        fi


                        if [[ $compara == "07:" ]]; then
                                reflec2="`echo $line | cut -d ":" -f 2`"
                                reflec2=`echo $reflec2|sed 's/^0*//'`
                                echo "Reflectiviad = "$reflec2
                        fi

                        if [[ $compara == "08:" ]]; then
                                visi2="`echo $line | cut -d ":" -f 2`"
                                visi2=`echo $visi2|sed 's/^0*//'`
                                echo "Visibilidad = "$visi2
                        fi


                        if [[ $compara == "11:" ]]; then
                                gotas2="`echo $line | cut -d ":" -f 2`"
				#if [[ "$gotas2" == "00000" ]];then
				#	gotas2=0
				#	echo "pase por la condicion"
				#else
                                #	gotas2=`echo $gotas2|sed 's/^0*//'`
				#fi
                                echo "Numero de gotas = "$gotas2
                        fi

                        if [[ $compara == "17:" ]]; then
                                voltaje2="`echo $line | cut -d ":" -f 2`"
                                voltaje2="`python -c "print $voltaje2"`"
                                echo "Voltaje = "$voltaje2
                        fi


                        if [[ $compara == "20:" ]]; then
                                hora="`echo $line | cut -d ":" -f 2`"
                                min="`echo $line | cut -d ":" -f 3`"
                                #seg="`echo $line | cut -d ":" -f 4`"
                                #seg=${seg:0:2}
                                p=":"
                                horaS2=$hora$p$min
                                horaEstacion=$hora$p$min":00"
                                #horaS="`python -c "print $horaS"`"
                                echo "Hora y minuto (estación) = "$horaS2
                        fi

                        if [[ $compara == "21:" ]]; then
                                fechaS="`echo $line | cut -d ":" -f 2`"
                                dia="`echo $fechaS | cut -d "." -f 1`"
                                mes="`echo $fechaS | cut -d "." -f 2`"
                                anio="`echo $fechaS | cut -d "." -f 3`"
                                anio=${anio:0:4}
                                 d="/"
                                d2="."
                                guion="-"
                                uno=1
                                mesp="$((mes - uno))"
                                fechaS2=$anio$d$mesp$d$dia
                                fechap=$anio$d2$mes$d2$dia
                                fechaEstacion=$anio$guion$mes$guion$dia
                                #fechaS2="`python -c "print $fechaS"`"
                                echo "Año mes dia (estación) = "$fechap
                                echo "Anio mes dia hora min (Servidor) = "$fechaActual"_"$horaLocal":"$minActual
                        fi


                        if [[ $compara == "34:" ]]; then
                                cine2="`echo $line | cut -d ":" -f 2`"
                                cine2="`python -c "print $cine2"`"
                                echo "Energía cinetica = "$cine2
                        fi


                        if [[ $compara == "50:" ]]; then
                            if [[ $mapa == "SI" ]];then  
                                echo "{ "'"type"'": "'"Feature"'",
                                "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": ["$coord"]},
                                "'"properties"'": {
                                "'"name"'": "'"'""$estacion""'"'",
                                "'"value"'": "$inten2"
                                }
                                }," >> $dir/$datos.txt
                            else
                                echo "La estación no es de la ciudad de mexico"
                            fi

                        touch $dir2/$estacion.csv
                        echo  $estacion$coma$fechaS2$coma$horaS$coma$inten2$coma$acum2$coma$reflec2$coma$visi2$coma$gotas2$coma$cine2 >> $dir2/$estacion.csv
                        echo  $estacion$coma$fechap$coma$horaS$coma$inten2$coma$acum2 > $dir2/a$estacion.csv
                        cp  $dir2/a$estacion.csv $dir3/$estacion2/a$estacion$aniomes.csv
                        mv $dir3/$estacion2/a$estacion$aniomes.csv $dir3/$estacion2/dbm$estacion$aniomes.csv
                        chown apache:centos $dir3/$estacion2/dbm$estacion$aniomes.csv
                        gzip -c $dir2/$estacion.csv > $dir3/$estacion2/$estacion.gz
                        mv $dir3/$estacion2/$estacion.gz $dir3/$estacion2/dbp$estacion$aniomes.gz
                        chown apache:centos $dir3/$estacion2/dbp$estacion$aniomes.gz
                        echo "$estacion;$coord;$inten2;$acum2" >> $dir/$datos2.txt
                        echo "$estacion,$inten2,$acum2" > $dir/$estacion.txt
                        echo "$actual,$estacion,$acum2,$inten2,$fecha" >> $dir/$estacion"acum.txt"
                        tiempoEstacion=$fechaEstacion" "$horaEstacion
                        echo $tiempoEstacion;
mysql -u root -pyorgos84 test << EOF
INSERT INTO estaciones (estacion,fecha_servidor,fecha_estacion,intensidad,acumulada,acumuladaplus,visibi,gotas,volta,reflec,tipo,cinetica) VALUES ('$estacion', '$tiempoServidor', '$tiempoEstacion', '$inten2', '$acum2', '$acumuladamas2', '$visi2', '$gotas2', '$voltaje2', '$reflec2', '$tipolluvia', '$cine2');
EOF


                        fi
                    done
                

                elif [[ $file == *.txt || $file == *.par ]]; then
                    echo "Archivo no esta comprimido"
                    while IFS= read -r line; do
                        compara="`echo "$line" | cut -b 1,2,3`"

                        if [[ $compara == "01:" ]]; then
                        inten="`echo $line | cut -d ":" -f 2`"
                        inten="`python -c "print $inten"`"
                        echo "Intensidad = "$inten
                        fi

                        if [[ $compara == "02:" ]]; then
                            acum="`echo $line | cut -d ":" -f 2`"
                            acum="`python -c "print $acum"`"
                            echo "Acumulada = "$acum
                            echo "Estos es acum "$acum
                            concatena=$control$estacion
                            primeravez=${!concatena}
                            if [[ $primeravez == true ]];then
                                echo "esta la primera vez quee paso por la estacion: "$estacion
                                export $control$estacion=false
                                export $estacion$cumu=`cat /home/centos/scripts/Node/data2/$estacion$cumu2`
                                export $tmp$estacion$cumu=$acum
                                direccion1=$estacion$cumu
                                NAcum=${!direccion1}
                                acumuladamas=$NAcum                                 
                            else
                                        echo "esta NO es la primera vez quee paso por la estacion: "$estacion
                                        direccion1=$estacion$cumu
                                        direccion2=$tmp$estacion$cumu
                                        NAcum=${!direccion1}
                                        tmpAcum=${!direccion2}

                                        echo "esto es NACUM "$NAcum
                                        echo "esto es tmpAcum "$tmpAcum

                                        resta=`calc $tmpAcum - $acum`
                                        echo "Esto es Resta "$resta
                                          algo=`echo $resta'>'$valorP | bc -l`
                                          echo $algo
                                        if [[ "$algo" -eq 1 ]];then
                                            echo "La resta es mayor o igual a cero"
                                                export NAcum=`calc $NAcum + $acum`
                                                export $estacion$cumu=`echo $NAcum`
                                                echo $NAcum > /home/centos/scripts/Node/data2/$estacion$cumu2
                                                acumuladamas=$NAcum
                                                export $tmp$estacion$cumu=$acum
                                        else
                                            echo "La resta es menor o igual a cero"
                                                export NAcum=`calc $NAcum + $acum - $tmpAcum`
                                                export $estacion$cumu=`echo $NAcum`
                                                echo $NAcum > /home/centos/scripts/Node/data2/$estacion$cumu2
                                                acumuladamas=$NAcum
                                                export $tmp$estacion$cumu=$acum
 
                                        fi
                            fi
                              echo "Esto es acumuladamas "$acumuladamas

                        fi

                         if [[ $compara == "05:" ]]; then
                                tipopre="`echo $line | cut -d ":" -f 2`"
                                tipopre="`echo $tipopre|sed 's/^ *//'`"
                                tipopre=${tipopre:0:4}
                                echo "TipoPrecipitacion = "$tipopre
                        fi

                        if [[ $compara == "07:" ]]; then
                                reflec="`echo $line | cut -d ":" -f 2`"
                                reflec=`echo $reflec|sed 's/^0*//'`
                                echo "Reflectiviad = "$reflec
                        fi

                        if [[ $compara == "08:" ]]; then
                                visi="`echo $line | cut -d ":" -f 2`"
                                visi=`echo $visi|sed 's/^0*//'`
                                echo "Visibilidad = "$visi
                        fi

                        if [[ $compara == "11:" ]]; then
                                gotas="`echo $line | cut -d ":" -f 2`"
                                #gotas=`echo $gotas|sed 's/^0*//'`
				#if [[ -z "$gotas" ]];then
				#gotas=0
				#fi
                                echo "Numero de gotas = "$gotas
                        fi

                        if [[ $compara == "17:" ]]; then
                                voltaje2="`echo $line | cut -d ":" -f 2`"
                                voltaje2="`python -c "print $voltaje2"`"
                                echo "Voltaje = "$voltaje2
                        fi

                        if [[ $compara == "20:" ]]; then
                                hora="`echo $line | cut -d ":" -f 2`"
                                min="`echo $line | cut -d ":" -f 3`"
                                #seg="`echo $line | cut -d ":" -f 4`"
                                #seg=${seg:0:2}
                                p=":"
                                horaS=$hora$p$min
                                horaEstacion=$hora$p$min":00"
                                #horaS="`python -c "print $horaS"`"
                                echo "Horas y minutos (estación) "$horaS
                        fi

                        if [[ $compara == "21:" ]]; then
                                fechaS="`echo $line | cut -d ":" -f 2`"
                                dia="`echo $fechaS | cut -d "." -f 1`"
                                mes="`echo $fechaS | cut -d "." -f 2`"
                                anio="`echo $fechaS | cut -d "." -f 3`"
                                anio=${anio:0:4}
                                d="/"
                                d2="."
                                guion="-"
                                uno=1
                                mesp="$((mes - uno))"
                                fechaC=$anio$d$mesp$d$dia
                                fechap=$anio$d2$mes$d2$dia
                                fechaEstacion=$anio$guion$mes$guion$dia
                                #fechaS2="`python -c "print $fechaS"`"
                                echo "Año mes y dia (estación) = "$fechap
                                echo "Anio mes dia hora min (Servidor) = "$fechaActual"_"$horaLocal":"$minActual
                        fi

                        if [[ $compara == "34:" ]]; then
                                cine="`echo $line | cut -d ":" -f 2`"
                                cine="`python -c "print $cine"`"
                                echo "Energía cinética = "$cine
                        fi

                        if [[ $compara = "50:"  ]]; then
                            if [[ $mapa == "SI" ]];then  
                                echo "{ "'"type"'": "'"Feature"'",
                                "'"geometry"'": {"'"type"'": "'"Point"'", "'"coordinates"'": ["$coord"]},
                                "'"properties"'": {
                                "'"name"'": "'"'""$estacion""'"'",
                                "'"value"'": "$inten"
                                }
                                }," >> $dir/$datos.txt
                            else
                                echo "La estación no es de la ciudad de mexico"
                            fi


                        touch $dir2/$estacion.csv
                        echo  $estacion$coma$fechaC$coma$horaS$coma$inten$coma$acum$coma$reflec$coma$visi$coma$gotas$coma$cine >> $dir2/$estacion.csv
                        echo  $estacion$coma$fechap$coma$horaS$coma$inten$coma$acum > $dir2/a$estacion.csv
                        cp  $dir2/a$estacion.csv $dir3/$estacion2/a$estacion$aniomes.csv
                        mv $dir3/$estacion2/a$estacion$aniomes.csv $dir3/$estacion2/dbm$estacion$aniomes.csv
                        chown apache:centos $dir3/$estacion2/dbm$estacion$aniomes.csv
                        gzip -c $dir2/$estacion.csv > $dir3/$estacion2/$estacion.gz
                        mv $dir3/$estacion2/$estacion.gz $dir3/$estacion2/dbp$estacion$aniomes.gz
                        chown apache:centos $dir3/$estacion2/dbp$estacion$aniomes.gz
                        echo "$estacion;$coord;$inten;$acum" >> $dir/$datos2.txt
                        echo "$estacion,$inten,$acum" > $dir/$estacion.txt
                        echo "$actual,$estacion,$acum,$inten,$fecha" >> $dir/$estacion"acum.txt"
                        tiempoEstacion=$fechaEstacion" "$horaEstacion
                        echo $tiempoEstacion;
mysql -u root -pyorgos84 test << EOF
INSERT INTO estaciones (estacion,fecha_servidor,fecha_estacion,intensidad,acumulada,acumuladaplus,visibi,gotas,volta,reflec,tipo,cinetica) VALUES ('$estacion', '$tiempoServidor', '$tiempoEstacion', '$inten', '$acum', '$acumuladamas', '$visi', '$gotas', '$voltaje2', '$reflec', '$tipolluvia', '$cine');
EOF

                        fi
                    done < $path$file
                else
                echo "El archivo no es .oh ni .txt"
                fi
        else
        echo "El filtro por nombre es NA"

        fi

    else
        echo "El archivo "$file" pesa menos puede estar incompleto"
        echo  $file" archivo pesa menos puede estar incompleto la ruta completa es "$path$file >> $logdir/ArchivosIncompletos$fechaActual.log
        chown centos:centos $logdir/ArchivosIncompletos$fechaActual.log
    fi

    done

