
#! /bin/bash
echo "Programa Carga a Base"
ruta="/var/ftp/pub"
dir="data"
file="Abases.csv"


cd /home/centos/scripts/Node
while [[ 1 ]]; do

		while IFS= read -r line; do
                estacion="`echo $line | cut -d ";" -f 1`"
                tiempoServidor="`echo $line | cut -d ";" -f 2`"
                tiempoEstacion="`echo $line | cut -d ";" -f 3`"
                inten="`echo $line | cut -d ";" -f 4`"
                acum="`echo $line | cut -d ";" -f 5`"
                acumuladamas="`echo $line | cut -d ";" -f 6`"
                visi="`echo $line | cut -d ";" -f 7`"
                gotas="`echo $line | cut -d ";" -f 8`"
                voltaje2="`echo $line | cut -d ";" -f 9`"
                reflec="`echo $line | cut -d ";" -f 10`"
                tipolluvia="`echo $line | cut -d ";" -f 11`"
                cine="`echo $line | cut -d ";" -f 12`"
		       mysql -A -u root -pyorgos84 test << EOF
		       INSERT INTO estaciones (estacion,fecha_servidor,fecha_estacion,intensidad,acumulada,acumuladaplus,visibi,gotas,volta,reflec,tipo,cinetica) VALUES ('$estacion', '$tiempoServidor', '$tiempoEstacion', '$inten', '$acum', '$acumuladamas', '$visi', '$gotas', '$voltaje2', '$reflec', '$tipolluvia', '$cine');
EOF

 
        done < $dir/$file




	segundo=$(date "+%S")
	segundo=`echo $segundo | sed 's/^0*//'`
    echo $segundo
    resta="`calc $para - $segundo`"
    echo $resta
    sleep $resta
done
