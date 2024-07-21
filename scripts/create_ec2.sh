#!/bin/bash

# Verificar si la instancia EC2 ya existe
INSTANCE_ID=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=PinInstance" --query "Reservations[].Instances[?State.Name == 'running'].InstanceId" --output text)

if [ -n "$INSTANCE_ID" ]; then
  echo "EC2 instance already exists: $INSTANCE_ID"
else
  # Crear instancia EC2
  VPC_ID=$(cat vpc_id.txt)  # Obtener el VPC_ID guardado
  SUBNET_ID=$(cat subnet_id.txt)  # Obtener el SUBNET_ID guardado
  SG_ID=$(cat sg_id.txt)  # Obtener el SG_ID guardado
  
  aws ec2 run-instances \
    --image-id ami-12345678 \  # Debes actualizar esto con un ID de AMI válido para la región
    --count 1 \
    --instance-type t3.micro \
    --key-name pin \
    --security-group-ids $SG_ID \
    --subnet-id $SUBNET_ID \
    --user-data file://scripts/ec2_user_data.sh \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=PinInstance}]'
fi
