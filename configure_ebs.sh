#!/bin/bash

# Crear el rol IAM para EBS CSI Driver
aws iam create-role --role-name AmazonEKS_EBS_CSI_DriverRole --assume-role-policy-document file://ebs-csi-driver-trust-policy.json

# Adjuntar la política de IAM al rol
aws iam attach-role-policy --role-name AmazonEKS_EBS_CSI_DriverRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy

# Crear el complemento EBS CSI en el clúster EKS
eksctl create addon --name aws-ebs-csi-driver --cluster eks-mundos-e --service-account-role-arn arn:aws:iam::AWS_ACCOUNT_ID:role/AmazonEKS_EBS_CSI_DriverRole --region us-east-1
