#!/bin/bash
# -*- ENCODING: UTF-8 -*-
echo "Descargando aplicacion"
git pull
echo "Generando nueva imagen"
sudo docker build . -t efs/node-web-app
echo "Eliminando contenedor viejo"
docker stop efs
docker stop bd_sisop
docker rm efs
echo "Desplegando nuevo contenedor"
docker start bd_sisop
docker run --name efs -p 7680:7680 efs/node-web-app
exit