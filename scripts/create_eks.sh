#!/bin/bash

source scripts/resource_ids.sh

CLUSTER_NAME="eks-mundos-e"
REGION="us-east-1"
SSH_KEY="pin"

# Crear el clúster EKS si no existe
if ! eksctl get cluster --name $CLUSTER_NAME --region $REGION; then
  eksctl create cluster \
      --name $CLUSTER_NAME \
      --region $REGION \
      --node-type t3.small \
      --nodes 3 \
      --with-oidc \
      --ssh-access \
      --ssh-public-key $SSH_KEY \
      --managed \
      --full-ecr-access \
      --zones us-east-1a,us-east-1b,us-east-1c \
      --vpc-private-subnets=$SUBNET1_ID,$SUBNET2_ID,$SUBNET3_ID \
      --vpc-public-subnets=$SUBNET1_ID,$SUBNET2_ID,$SUBNET3_ID
else
  echo "Cluster $CLUSTER_NAME already exists."
fi
