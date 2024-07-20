# DevOps Project: Kubernetes Deployment with Terraform and GitHub Actions

## Descripción del Proyecto

Este proyecto integra varias herramientas y tecnologías de DevOps para crear un flujo de trabajo automatizado que despliega una aplicación en un clúster de Kubernetes. Utilizamos Terraform para la infraestructura, Docker Compose para el desarrollo local y GitHub Actions para CI/CD. El despliegue incluye Prometheus y Grafana para monitoreo.

## Estructura del Proyecto

project-root/
├── .github/
│ └── workflows/
│ └── deploy.yml
├── terraform/
│ ├── main.tf
│ ├── variables.tf
│ ├── outputs.tf
│ ├── security_groups.tf
│ ├── eks_cluster.tf
│ └── ebs_csi_driver.tf
├── k8s/
│ ├── prometheus/
│ │ ├── prometheus-deployment.yaml
│ │ ├── prometheus-pv.yaml
│ │ ├── prometheus-pvc.yaml
│ ├── grafana/
│ │ ├── grafana-deployment.yaml
│ │ ├── grafana-pv.yaml
│ │ ├── grafana-pvc.yaml
│ └── nginx/
│ ├── nginx-deployment.yaml
│ ├── nginx-service.yaml
├── docker/
│ └── geminis-tributario-portal-develop/
│ └── docker-compose.yml
└── README.md


## Configuración y Despliegue

### Prerrequisitos

1. Cuenta en AWS con permisos para crear recursos (EC2, EKS, IAM, etc.).
2. Instalar Terraform: [Instrucciones de instalación](https://learn.hashicorp.com/tutorials/terraform/install-cli).
3. Configurar GitHub Secrets con tus credenciales de AWS:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

### Paso a Paso

#### 1. Clonar el Repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>

2. Configurar Terraform
Editar terraform/variables.tf con tu región y ID de cuenta de AWS.

3. Ejecutar Terraform
Iniciar y aplicar Terraform para configurar la infraestructura:

sh

cd terraform
terraform init
terraform apply -auto-approve

4. Configurar GitHub Actions
El pipeline de GitHub Actions está definido en .github/workflows/deploy.yml. Asegúrate de que los archivos necesarios están en sus respectivas ubicaciones.

5. Ejecutar el Pipeline
Cada vez que realices un push a la rama main, el pipeline se ejecutará automáticamente.

Puedes verificar el estado del pipeline en la pestaña de "Actions" en tu repositorio de GitHub.

Archivos de Configuración
Terraform
main.tf: Define el proveedor de AWS y configura el VPC y el clúster EKS.
variables.tf: Define las variables utilizadas en los scripts de Terraform.
outputs.tf: Define las salidas de los scripts de Terraform.
security_groups.tf: Configura los grupos de seguridad.
eks_cluster.tf: Configura el clúster EKS.
ebs_csi_driver.tf: Configura el controlador CSI de EBS.
Kubernetes
prometheus/: Contiene los archivos de configuración de Prometheus.
prometheus-deployment.yaml: Configura el despliegue de Prometheus.
prometheus-pv.yaml: Define el volumen persistente para Prometheus.
prometheus-pvc.yaml: Define el claim de volumen persistente para Prometheus.
grafana/: Contiene los archivos de configuración de Grafana.
grafana-deployment.yaml: Configura el despliegue de Grafana.
grafana-pv.yaml: Define el volumen persistente para Grafana.
grafana-pvc.yaml: Define el claim de volumen persistente para Grafana.
nginx/: Contiene los archivos de configuración de Nginx.
nginx-deployment.yaml: Configura el despliegue de Nginx.
nginx-service.yaml: Configura el servicio de Nginx.
Docker
geminis-tributario-portal-develop/: Contiene el archivo docker-compose.yml para el despliegue de la aplicación.
Pipeline de GitHub Actions
El pipeline en .github/workflows/deploy.yml incluye pasos para:

Configurar Terraform.
Aplicar Terraform para crear la infraestructura.
Instalar Docker y Docker Compose.
Ejecutar Docker Compose para desplegar la aplicación.
Instalar kubectl.
Crear volúmenes persistentes y claims en Kubernetes.
Desplegar Prometheus, Grafana y Nginx en el clúster EKS.