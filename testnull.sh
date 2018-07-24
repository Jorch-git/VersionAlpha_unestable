#! /bin/bash        

echo "nuevo"
#temporal2=`mysql -N -u root -pyorgos84 test << EOF
#        select MAX(acumuladaplus), MIN(acumuladaplus) from estaciones where estacion = 'IIUNAM' AND date(fecha_servidor) >= '2018-03-07';
#EOF`

#temporal3=`mysql -N -u root -pyorgos84 test << EOF
#        select MAX(acumuladaplus), MIN(acumuladaplus) from estaciones where estacion = 'IIUNAM' AND date(fecha_servidor) >= '2018-07-03';
#EOF`

#test2="`echo $temporal2 | cut -d " " -f 1`"
#test3="`echo $temporal3 | cut -d " " -f 1`"

#echo " Temporal 2 es "$test2
#echo " Temporal 3 es "$test3
