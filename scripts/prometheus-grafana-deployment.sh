#!/bin/bash

# Verificar si Prometheus y Grafana ya están instalados
if helm list -n prometheus | grep prometheus &>/dev/null; then
    echo "Prometheus is already installed."
else
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo update
    kubectl create namespace prometheus
    helm install prometheus prometheus-community/prometheus --namespace prometheus --set alertmanager.persistentVolume.storageClass="gp2" --set server.persistentVolume.storageClass="gp2"
fi

if helm list -n grafana | grep grafana &>/dev/null; then
    echo "Grafana is already installed."
else
    helm repo add grafana https://grafana.github.io/helm-charts
    helm repo update
    kubectl create namespace grafana
    helm install grafana grafana/grafana --namespace grafana --set persistence.storageClassName="gp2" --set persistence.enabled=true --set adminPassword='EKS!sAWSome' --set service.type=LoadBalancer
fi
