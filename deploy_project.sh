#!/bin/bash

# Clonar el repositorio
git clone https://github.com/mbarrionuevo678/PIN-FINAL.git
cd PIN-FINAL/geminis-tributario-portal-develop

# Construir la imagen de Docker
docker build -t geminis-tributario-portal .

# Crear un contenedor de NGINX con el proyecto
docker run -d --name geminis-tributario-portal -p 80:80 geminis-tributario-portal

echo "Project deployment complete. Access it using the EC2 instance public IP."
