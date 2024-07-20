#!/bin/bash

# Verificar si el driver EBS CSI ya está instalado
if kubectl get daemonset ebs-csi-node -n kube-system &>/dev/null; then
    echo "EBS CSI Driver is already installed."
else
    kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/?ref=release-1.20"
fi
