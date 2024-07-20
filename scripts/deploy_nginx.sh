#!/bin/bash

# Verificar si el servicio nginx ya está desplegado
if kubectl get services | grep -q "nginx"; then
  echo "NGINX service already exists."
else
  # Desplegar NGINX en el clúster EKS
  kubectl apply -f manifests/nginx-deployment.yaml
  kubectl apply -f manifests/nginx-service.yaml
fi
