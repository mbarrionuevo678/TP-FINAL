#!/bin/bash
# Actualiza e instala kubectl y otras herramientas necesarias
yum update -y
yum install -y curl jq

# Instala kubectl
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.21.13/2022-07-26/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /usr/local/bin

# Instala aws-iam-authenticator
curl -o aws-iam-authenticator https://amazon-eks.s3.us-west-2.amazonaws.com/1.21.13/2022-07-26/bin/linux/amd64/aws-iam-authenticator
chmod +x ./aws-iam-authenticator
mv ./aws-iam-authenticator /usr/local/bin
