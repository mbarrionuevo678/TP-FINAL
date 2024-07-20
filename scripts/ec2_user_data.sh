#!/bin/bash
# Actualizar y configurar EC2 con las herramientas necesarias
sudo apt-get update
sudo apt-get install -y awscli jq docker.io
sudo systemctl start docker
sudo systemctl enable docker
