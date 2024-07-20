#!/bin/bash

# Crear IAM Role para EBS CSI
aws iam create-role --role-name AmazonEKS_EBS_CSI_DriverRole --assume-role-policy-document file://trust-policy.json

# Adjuntar política de IAM al rol
aws iam attach-role-policy --role-name AmazonEKS_EBS_CSI_DriverRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy

# Crear EKS Add-on
aws eks create-addon --cluster-name eks-mundos-e --addon-name aws-ebs-csi-driver --service-account-role-arn arn:aws:iam::<account-id>:role/AmazonEKS_EBS_CSI_DriverRole
