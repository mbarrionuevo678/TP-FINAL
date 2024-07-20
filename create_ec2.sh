#!/bin/bash

# Configura variables
AMI_ID="ami-0b69ea66ff7391e80" # Ubuntu Server 22.04 en us-east-1
INSTANCE_TYPE="t2.micro"
KEY_NAME="pin"
SECURITY_GROUP_NAME="pin-security-group"

# Crea el grupo de seguridad si no existe
SECURITY_GROUP_ID=$(aws ec2 describe-security-groups --filters Name=group-name,Values=$SECURITY_GROUP_NAME --query 'SecurityGroups[*].GroupId' --output text)
if [ -z "$SECURITY_GROUP_ID" ]; then
  SECURITY_GROUP_ID=$(aws ec2 create-security-group --group-name $SECURITY_GROUP_NAME --description "Security group for PIN-FINAL project" --output text)
  aws ec2 authorize-security-group-ingress --group-id $SECURITY_GROUP_ID --protocol tcp --port 22 --cidr 0.0.0.0/0
  aws ec2 authorize-security-group-ingress --group-id $SECURITY_GROUP_ID --protocol tcp --port 80 --cidr 0.0.0.0/0
fi

# Ejecuta la instancia
aws ec2 run-instances \
  --image-id $AMI_ID \
  --count 1 \
  --instance-type $INSTANCE_TYPE \
  --key-name $KEY_NAME \
  --security-group-ids $SECURITY_GROUP_ID \
  --user-data file://ec2_user_data.sh \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=PIN-FINAL-Instance}]'

# Espera a que la instancia se ejecute
INSTANCE_ID=$(aws ec2 describe-instances --filters Name=tag:Name,Values=PIN-FINAL-Instance --query 'Reservations[*].Instances[*].InstanceId' --output text)
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

# Imprime la IP pública de la instancia
PUBLIC_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[*].Instances[*].PublicIpAddress' --output text)
echo "La instancia EC2 se ha iniciado con la IP pública: $PUBLIC_IP"
