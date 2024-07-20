#!/bin/bash

# Variables
AMI_ID="ami-04a81a99f5ec58529"
INSTANCE_TYPE="t2.micro"
KEY_NAME="pin"
SECURITY_GROUP="allow_ssh_http"
TAG_NAME="pin"

# Crear instancia EC2
aws ec2 run-instances \
    --image-id $AMI_ID \
    --instance-type $INSTANCE_TYPE \
    --key-name $KEY_NAME \
    --security-groups $SECURITY_GROUP \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value='$TAG_NAME'}]' \
    --user-data file://ec2_user_data.sh
