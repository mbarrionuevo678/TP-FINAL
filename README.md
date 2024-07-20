# Proyecto Integrador DevOps

## Introducción
Este proyecto tiene como objetivo principal el aprendizaje de diversas tecnologías y la implementación práctica mediante un laboratorio que integra diferentes herramientas y tecnologías. El enfoque principal es la creación de una instancia EC2 en AWS y la configuración de un clúster EKS con monitoreo utilizando Prometheus y Grafana.

## Estructura del Proyecto
- **.github/workflows/pipeline.yml**: Definición del pipeline de CI/CD.
- **create_ec2.sh**: Script para crear la instancia EC2.
- **create_eks.sh**: Script para crear el clúster EKS.
- **deploy_nginx.sh**: Script para desplegar un pod de NGINX en EKS.
- **deploy_project.sh**: Script para desplegar el proyecto.
- **install_ebs_csi.sh**: Script para instalar el driver EBS CSI.
- **deploy_monitoring.sh**: Script para desplegar Prometheus y Grafana.
- **configure_ebs.sh**: Script para configurar EBS.

## Pasos para Configuración

### 1. Crear Instancia EC2
La creación de la instancia EC2 se realiza mediante el script `create_ec2.sh`. Este script configura una instancia en AWS con Ubuntu Server 22.04 y todos los paquetes necesarios:
```sh
chmod +x create_ec2.sh
./create_ec2.sh

2. Crear Clúster EKS
El clúster EKS se crea usando el script create_eks.sh. Este script configura el clúster y habilita el acceso SSH y las zonas especificadas:

chmod +x create_eks.sh
./create_eks.sh

3. Desplegar NGINX
Para desplegar un pod de NGINX en el clúster EKS:

chmod +x deploy_nginx.sh
./deploy_nginx.sh

4. Desplegar Proyecto
El proyecto se despliega utilizando el script deploy_project.sh, que clona el repositorio y configura todos los componentes necesarios:

chmod +x deploy_project.sh
./deploy_project.sh

5. Instalar EBS CSI Driver
Para instalar el driver EBS CSI en el clúster EKS:

chmod +x install_ebs_csi.sh
./install_ebs_csi.sh

6. Configurar EBS
Para configurar EBS, ejecuta el script:

chmod +x configure_ebs.sh
./configure_ebs.sh

7. Desplegar Monitoreo
Para desplegar Prometheus y Grafana para el monitoreo del clúster:

sh


chmod +x deploy_monitoring.sh
./deploy_monitoring.sh


Limpiar Recursos
Para desinstalar los recursos de Prometheus y Grafana:

helm uninstall prometheus --namespace prometheus
kubectl delete ns prometheus

helm uninstall grafana --namespace grafana
kubectl delete ns grafana
rm -rf ${HOME}/environment/grafana


Para eliminar el clúster EKS:

eksctl delete cluster --name eks-mundos-e
