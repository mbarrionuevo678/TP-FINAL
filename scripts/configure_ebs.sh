#!/bin/bash

ROLE_NAME="AmazonEKS_EBS_CSI_DriverRole"

# Verificar si el rol ya existe
if aws iam get-role --role-name ${ROLE_NAME} &>/dev/null; then
    echo "Role ${ROLE_NAME} already exists."
else
    # Crear IAM Role
    cat <<EOF > ebs-csi-driver-trust-policy.json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "ec2.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    }
EOF

    aws iam create-role --role-name ${ROLE_NAME} --assume-role-policy-document file://ebs-csi-driver-trust-policy.json
    aws iam attach-role-policy --role-name ${ROLE_NAME} --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy
fi
