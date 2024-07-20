#!/bin/bash

# Parámetros
IMAGE_ID="ami-0c55b159cbfafe1f0"
INSTANCE_TYPE="t2.micro"
KEY_NAME="pin"
SECURITY_GROUP_ID="<YOUR-SECURITY-GROUP-ID>"
SUBNET_ID="<YOUR-SUBNET-ID>"
TAG_KEY="Name"
TAG_VALUE="MyEC2Instance"

# Verificar si ya existe una instancia con el nombre especificado
INSTANCE_ID=$(aws ec2 describe-instances --filters "Name=tag:${TAG_KEY},Values=${TAG_VALUE}" --query "Reservations[*].Instances[*].InstanceId" --output text)

if [ -n "$INSTANCE_ID" ]; then
  echo "Instance ${TAG_VALUE} already exists with ID ${INSTANCE_ID}."
else
  echo "Creating new instance ${TAG_VALUE}..."
  INSTANCE_ID=$(aws ec2 run-instances \
    --image-id ${IMAGE_ID} \
    --count 1 \
    --instance-type ${INSTANCE_TYPE} \
    --key-name ${KEY_NAME} \
    --security-group-ids ${SECURITY_GROUP_ID} \
    --subnet-id ${SUBNET_ID} \
    --user-data file://ec2_user_data.sh \
    --tag-specifications "ResourceType=instance,Tags=[{Key=${TAG_KEY},Value=${TAG_VALUE}}]" \
    --query "Instances[0].InstanceId" \
    --output text)
    
  echo "Created instance with ID ${INSTANCE_ID}."
fi
