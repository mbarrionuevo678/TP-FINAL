#!/bin/bash

# Crear IAM role para el controlador EBS CSI si no existe
if ! aws iam get-role --role-name AmazonEKS_EBS_CSI_DriverRole; then
  aws iam create-role --role-name AmazonEKS_EBS_CSI_DriverRole --assume-role-policy-document file://scripts/ebs-csi-driver-trust-policy.json
  aws iam attach-role-policy --role-name AmazonEKS_EBS_CSI_DriverRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy
else
  echo "IAM role AmazonEKS_EBS_CSI_DriverRole already exists."
fi
