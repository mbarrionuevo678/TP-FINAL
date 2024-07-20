#!/bin/bash

# Crear un pod de nginx
kubectl run nginx --image=nginx

# Exponer el pod para acceso externo
kubectl expose pod nginx --port=80 --type=LoadBalancer
