#!/bin/bash

ROLE_NAME="AmazonEKS_EBS_CSI_DriverRole"
POLICY_ARN="arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"

# Verificar si el IAM role ya existe
if ! aws iam get-role --role-name $ROLE_NAME; then
  aws iam create-role --role-name $ROLE_NAME --assume-role-policy-document file://scripts/ebs-csi-driver-trust-policy.json
  aws iam attach-role-policy --role-name $ROLE_NAME --policy-arn $POLICY_ARN
else
  echo "IAM role $ROLE_NAME already exists."
fi
