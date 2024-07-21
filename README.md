# Proyecto DevOps - Despliegue de Infraestructura y Aplicaciones

## Descripción

Este proyecto tiene como objetivo desplegar una infraestructura en AWS utilizando Terraform, desplegar aplicaciones en un clúster EKS y configurar un sistema de monitoreo con Grafana y Prometheus. La infraestructura incluye un clúster de Kubernetes (EKS) y varias instancias de EC2. Además, se utiliza un pipeline de GitHub Actions para automatizar el despliegue.

## Estructura del Proyecto

```plaintext
.
├── index.html
├── manifests
│   ├── nginx-deployment.yaml
│   ├── nginx-service.yaml
│   ├── persistent_volume_claim_grafana.yaml
│   ├── persistent_volume_claim_nginx.yaml
│   ├── persistent_volume_claim_prometheus.yaml
│   ├── persistent_volume_grafana.yaml
│   ├── persistent_volume_nginx.yaml
│   └── persistent_volume_prometheus.yaml
├── README.md
├── terraform
│   ├── main.tf
│   ├── outputs.tf
│   ├── pin.pem
│   ├── providers.tf
│   ├── terraform.tfstate
│   ├── terraform.tfstate.backup
│   ├── todo.zip
│   ├── user_data.sh
│   └── variables.tf
└── terraform.tfstate

Prerrequisitos
Tener una cuenta en AWS.
Instalar Terraform.
Instalar kubectl.
Configurar las credenciales de AWS.
Despliegue de Infraestructura
Inicializar Terraform:
cd terraform
terraform init


Planificar la Infraestructura:
terraform plan -out=tfplan


Aplicar la Infraestructura:
terraform apply -auto-approve tfplan


Verificar los recursos desplegados:
terraform output

Despliegue de Aplicaciones

Configurar kubectl para el clúster EKS:
aws eks update-kubeconfig --name DevOpsGroup7 --region us-east-1

Desplegar los recursos de Kubernetes:
kubectl apply -f

