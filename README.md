# DevOps Project: Kubernetes Deployment with Terraform and GitHub Actions

## Descripción del Proyecto

Este proyecto integra varias herramientas y tecnologías de DevOps para crear un flujo de trabajo automatizado que despliega una aplicación en un clúster de Kubernetes. Utilizamos Terraform para la infraestructura, Docker Compose para el desarrollo local y GitHub Actions para CI/CD. El despliegue incluye Prometheus y Grafana para monitoreo.

## Estructura del Proyecto

project-root/
├── .github/
│ └── workflows/
│ ├── deploy.yml
│ └── destroy.yml
├── terraform/
│ ├── main.tf
│ ├── variables.tf
│ ├── outputs.tf
│ ├── security_groups.tf
│ ├── eks_cluster.tf
│ ├── ebs_csi_driver.tf
│ ├── iam.tf
│ ├── iam_instance_profile.tf
│ ├── ec2.tf
│ ├── terraform-policy.json
│ ├── ec2_user_data.sh
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
└── docker/
└── geminis-tributario-portal-develop/
└── docker-compose.yml

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
iam.tf: Configura los roles IAM necesarios.
iam_instance_profile.tf: Configura el perfil de instancia IAM.
ec2.tf: Configura la instancia EC2.
terraform-policy.json: Define la política IAM para Terraform.
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

Ejemplo de Pipeline para Desplegar

name: Deploy to AWS and Run Docker Compose

# Permitir ejecución manual
on:
  workflow_dispatch:
  # Comentado para futuras ejecuciones automáticas en push o pull request a main
  # push:
  #   branches:
  #     - main
  # pull_request:
  #   branches:
  #     - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: 🎉 Checkout code
      uses: actions/checkout@v2

    - name: 🚀 Setup Terraform
      uses: hashicorp/setup-terraform@v1
      with:
        terraform_version: 1.0.0

    - name: 🔑 Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: 🛠 Initialize Terraform
      working-directory: ./terraform
      run: terraform init

    - name: 📦 Apply Terraform
      working-directory: ./terraform
      run: terraform apply -auto-approve

    - name: 🐋 Install Docker
      run: |
        sudo apt-get update
        sudo apt-get install -y docker.io
        sudo systemctl start docker
        sudo systemctl enable docker
        sudo usermod -aG docker $USER

    - name: 🐳 Install Docker Compose
      run: |
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        docker-compose --version

    - name: 🏗 Run Docker Compose
      working-directory: ./docker/geminis-tributario-portal-develop
      run: docker-compose up -d

    - name: ⚙️ Install kubectl
      run: |
        curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
        chmod +x ./kubectl
        sudo mv ./kubectl /usr/local/bin/kubectl

    - name: 📁 Create Persistent Volumes and Claims
      run: |
        kubectl apply -f ./k8s/prometheus/prometheus-pv.yaml
        kubectl apply -f ./k8s/prometheus/prometheus-pvc.yaml
        kubectl apply -f ./k8s/grafana/grafana-pv.yaml
        kubectl apply -f ./k8s/grafana/grafana-pvc.yaml

    - name: 📈 Deploy Prometheus
      working-directory: ./k8s/prometheus
      run: kubectl apply -f prometheus-deployment.yaml

    - name: 📊 Deploy Grafana
      working-directory: ./k8s/grafana
      run: kubectl apply -f grafana-deployment.yaml

    - name: 🌐 Deploy Nginx
      working-directory: ./k8s/nginx
      run: kubectl apply -f nginx-deployment.yaml

Pipeline de GitHub Actions para Destruir la Infraestructura
El pipeline en .github/workflows/destroy.yml incluye pasos para:

Configurar Terraform.
Destruir la infraestructura creada por Terraform.
Ejemplo de Pipeline para Destruir

name: Destroy AWS Infrastructure

on:
  workflow_dispatch:

jobs:
  destroy:
    runs-on: ubuntu-latest

    steps:
    - name: 🎉 Checkout code
      uses: actions/checkout@v2

    - name: 🚀 Setup Terraform
      uses: hashicorp/setup-terraform@v1
      with:
        terraform_version: 1.0.0

    - name: 🔑 Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: 🛠 Initialize Terraform
      working-directory: ./terraform
      run: terraform init

    - name: 🗑️ Destroy Terraform-managed infrastructure
      working-directory: ./terraform
      run: terraform destroy -auto-approve

Notas Finales
Asegúrate de reemplazar <YOUR_EBS_VOLUME_ID> en los archivos de configuración de volúmenes persistentes con los IDs de tus volúmenes EBS.
Verifica que los permisos de IAM estén correctamente configurados para permitir la creación y gestión de los recursos necesarios.
Utiliza la pestaña "Actions" en GitHub para monitorear y revisar la ejecución de tus pipelines.