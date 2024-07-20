#!/bin/bash

# Verificar si el deployment y servicio de la aplicación web ya existen
if kubectl get deployment web-app &>/dev/null; then
    echo "Deployment web-app already exists."
else
    kubectl apply -f ../manifests/web-app-deployment.yaml
fi

if kubectl get service web-app &>/dev/null; then
    echo "Service web-app already exists."
else
    kubectl apply -f ../manifests/web-app-service.yaml
fi
