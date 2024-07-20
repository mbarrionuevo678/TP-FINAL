#!/bin/bash

# Desplegar tu aplicación
kubectl apply -f manifests/web-app-deployment.yaml
kubectl apply -f manifests/web-app-service.yaml
