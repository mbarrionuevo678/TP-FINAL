#!/bin/bash

# Configurar kubectl para usar el clúster EKS
aws eks update-kubeconfig --region us-east-1 --name eks-mundos-e
