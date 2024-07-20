#!/bin/bash

# Verificar si el deployment y servicio de NGINX ya existen
if kubectl get deployment nginx &>/dev/null; then
    echo "Deployment nginx already exists."
else
    kubectl apply -f ../manifests/nginx-deployment.yaml
fi

if kubectl get service nginx &>/dev/null; then
    echo "Service nginx already exists."
else
    kubectl apply -f ../manifests/nginx-service.yaml
fi
