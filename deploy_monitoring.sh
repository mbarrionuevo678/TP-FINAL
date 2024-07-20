#!/bin/bash

# Añadir repositorio de Helm para Prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Crear namespace para Prometheus
kubectl create namespace prometheus

# Instalar Prometheus
helm install prometheus prometheus-community/prometheus --namespace prometheus --set alertmanager.persistentVolume.storageClass="gp2" --set server.persistentVolume.storageClass="gp2"

# Crear namespace para Grafana
kubectl create namespace grafana

# Instalar Grafana
helm install grafana grafana/grafana --namespace grafana --set persistence.storageClassName="gp2" --set persistence.enabled=true --set adminPassword='EKS!sAWSome' --values ${HOME}/environment/grafana/grafana.yaml --set service.type=LoadBalancer
