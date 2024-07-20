#!/bin/bash

CLUSTER_NAME="eks-mundos-e"

# Verificar si el cluster ya existe
if eksctl get cluster --name=${CLUSTER_NAME} --region=us-east-1; then
    echo "Cluster ${CLUSTER_NAME} already exists."
else
    # Crear cluster EKS
    eksctl create cluster \
    --name ${CLUSTER_NAME} \
    --region us-east-1 \
    --node-type t3.small \
    --nodes 3 \
    --with-oidc \
    --ssh-access \
    --ssh-public-key pin \
    --managed \
    --full-ecr-access \
    --zones us-east-1a, us-east-1b, us-east-1c
fi
