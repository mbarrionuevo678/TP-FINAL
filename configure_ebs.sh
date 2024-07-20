#!/bin/bash

# Variables
ROLE_NAME="AmazonEKS_EBS_CSI_DriverRole"
POLICY_ARN="arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
TRUST_POLICY_FILE="ebs-csi-driver-trust-policy.json"

# Verifica si el rol ya existe
if aws iam get-role --role-name $ROLE_NAME; then
  echo "IAM Role $ROLE_NAME already exists. Skipping creation."
else
  # Crear el rol
  aws iam create-role --role-name $ROLE_NAME --assume-role-policy-document file://$TRUST_POLICY_FILE
fi

# Adjunta la política al rol
aws iam attach-role-policy --role-name $ROLE_NAME --policy-arn $POLICY_ARN
