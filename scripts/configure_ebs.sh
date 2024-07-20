#!/bin/bash

# Nombre del rol EBS CSI
EBS_CSI_ROLE_NAME="AmazonEKS_EBS_CSI_DriverRole"

# Verificar si el rol ya existe
ROLE_EXISTS=$(aws iam get-role --role-name ${EBS_CSI_ROLE_NAME} --query "Role.RoleName" --output text 2>/dev/null)

if [ -n "$ROLE_EXISTS" ]; then
  echo "Role ${EBS_CSI_ROLE_NAME} already exists."
else
  # Crear el rol EBS CSI
  aws iam create-role \
    --role-name ${EBS_CSI_ROLE_NAME} \
    --assume-role-policy-document file://scripts/ebs-csi-driver-trust-policy.json

  # Adjuntar la política EBS CSI al rol
  aws iam attach-role-policy \
    --role-name ${EBS_CSI_ROLE_NAME} \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy

  echo "Role ${EBS_CSI_ROLE_NAME} created and policy attached."
fi
