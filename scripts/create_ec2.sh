#!/bin/bash

# Variables
SECURITY_GROUP_ID="tu-security-group-id"
SUBNET_ID="tu-subnet-id"
AMI_ID="ami-0ac80df6eff0e70b5"  # AMI de Ubuntu Free Tier

# Verificar si la instancia EC2 ya existe
INSTANCE_ID=$(aws ec2 describe-instances \
    --filters "Name=instance-state-name,Values=running" "Name=tag:Name,Values=PIN-EC2-Instance" \
    --query "Reservations[*].Instances[*].InstanceId" \
    --output text)

if [ -n "$INSTANCE_ID" ]; then
  echo "EC2 instance already exists with ID: $INSTANCE_ID"
else
  # Crear instancia EC2
  aws ec2 run-instances \
      --image-id $AMI_ID \
      --count 1 \
      --instance-type t3.small \
      --key-name pin \
      --security-group-ids $SECURITY_GROUP_ID \
      --subnet-id $SUBNET_ID \
      --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=PIN-EC2-Instance}]' \
      --user-data file://scripts/ec2_user_data.sh
fi
