# Proyecto Integrador DevOps

## Descripción

Este proyecto tiene como objetivo principal el despliegue de un clúster EKS en AWS, la configuración de un servidor NGINX, y la integración de herramientas de monitoreo como Prometheus y Grafana.

## Estructura del Proyecto

- `.github/workflows/pipeline.yml`: Archivo de configuración del pipeline de GitHub Actions.
- `create_ec2.sh`: Script para crear una instancia EC2.
- `create_eks.sh`: Script para crear un clúster EKS.
- `deploy_nginx.sh`: Script para desplegar NGINX en el clúster EKS.
- `install_ebs_csi.sh`: Script para instalar el controlador CSI de EBS.
- `configure_ebs.sh`: Script para configurar EBS con IAM roles y políticas.
- `deploy_monitoring.sh`: Script para desplegar Prometheus y Grafana.
- `deploy_project.sh`: Script para desplegar el proyecto específico.
- `ebs-csi-driver-trust-policy.json`: Archivo de política de confianza para el controlador CSI de EBS.

## Requisitos

- Cuenta de AWS con permisos necesarios para crear recursos (EC2, EKS, IAM, etc).
- Claves de acceso y secreto de AWS configuradas en GitHub Actions como secretos (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).
- `eksctl` y `kubectl` instalados.

## Configuración del Pipeline

El pipeline de GitHub Actions está configurado para ejecutar los siguientes trabajos:

1. **Setup**: Configura las credenciales de AWS, instala las dependencias necesarias y crea la instancia EC2.
2. **Deploy**: Configura el clúster EKS, despliega NGINX, instala el controlador CSI de EBS, configura EBS y despliega el proyecto.
3. **Monitor**: Despliega las herramientas de monitoreo (Prometheus y Grafana).

## Ejecución Manual de Scripts

Si prefieres ejecutar los scripts manualmente, sigue los siguientes pasos:

1. Clonar el repositorio:

```bash
git clone https://github.com/mbarrionuevo678/PIN-FINAL.git
cd PIN-FINAL

Hacer ejecutables los scripts:
chmod +x configure_ebs.sh create_ec2.sh create_eks.sh deploy_monitoring.sh deploy_nginx.sh deploy_project.sh install_ebs_csi.sh

Ejecutar los scripts en el orden necesario:
./create_ec2.sh
./create_eks.sh
./deploy_nginx.sh
./install_ebs_csi.sh
./configure_ebs.sh
./deploy_project.sh
./deploy_monitoring.sh

Limpieza de Recursos
Para eliminar los recursos creados, puedes usar los siguientes comandos:
eksctl delete cluster --name=eks-mundos-e --region=us-east-1
aws ec2 terminate-instances --instance-ids <INSTANCE_ID>

Sustituye <INSTANCE_ID> con el ID de la instancia EC2 que deseas eliminar.

Con estas modificaciones y ajustes, tu proyecto debería estar configurado para que los recursos no se dupliquen y se manejen adecuadamente en el pipeline de GitHub Actions.
