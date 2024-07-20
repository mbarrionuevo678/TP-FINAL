#!/bin/bash

# Verifica si el clúster ya existe
if eksctl get cluster --name=eks-mundos-e --region=us-east-1; then
  echo "Cluster eks-mundos-e already exists. Skipping creation."
else
  eksctl create cluster \
  --name eks-mundos-e \
  --region us-east-1 \
  --node-type t3.small \
  --nodes 3 \
  --with-oidc \
  --ssh-access \
  --ssh-public-key pin \
  --managed \
  --full-ecr-access \
  --zones us-east-1a,us-east-1b,us-east-1c
fi
