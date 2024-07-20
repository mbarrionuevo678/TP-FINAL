#!/bin/bash

# Variables
CLUSTER_NAME="eks-mundos-e"
REGION="us-east-1"

eksctl create cluster \
    --name $CLUSTER_NAME \
    --region $REGION \
    --node-type t3.small \
    --nodes 3 \
    --with-oidc \
    --ssh-access \
    --ssh-public-key pin \
    --managed \
    --full-ecr-access \
    --zones us-east-1a,us-east-1b,us-east-1c
