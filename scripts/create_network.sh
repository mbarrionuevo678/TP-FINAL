#!/bin/bash

# Crear VPC, subnets, security groups, etc.
# Aquí debes usar AWS CLI para crear los recursos de red necesarios.
# Guarda los IDs de los recursos creados para usarlos en otros scripts.

VPC_ID=$(aws ec2 describe-vpcs --filters "Name=tag:Name,Values=PinVPC" --query 'Vpcs[0].VpcId' --output text)

if [ "$VPC_ID" == "None" ]; then
  VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)
  aws ec2 create-tags --resources $VPC_ID --tags Key=Name,Value=PinVPC
  echo "VPC created: $VPC_ID"
else
  echo "VPC already exists: $VPC_ID"
fi

SUBNET_ID=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query 'Subnets[0].SubnetId' --output text)

if [ "$SUBNET_ID" == "None" ]; then
  SUBNET_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --query 'Subnet.SubnetId' --output text)
  aws ec2 create-tags --resources $SUBNET_ID --tags Key=Name,Value=PinSubnet
  echo "Subnet created: $SUBNET_ID"
else
  echo "Subnet already exists: $SUBNET_ID"
fi

SG_ID=$(aws ec2 describe-security-groups --filters "Name=vpc-id,Values=$VPC_ID" --query 'SecurityGroups[0].GroupId' --output text)

if [ "$SG_ID" == "None" ]; then
  SG_ID=$(aws ec2 create-security-group --group-name PinSecurityGroup --description "Security group for Pin instance" --vpc-id $VPC_ID --query 'GroupId' --output text)
  aws ec2 create-tags --resources $SG_ID --tags Key=Name,Value=PinSecurityGroup
  echo "Security group created: $SG_ID"
else
  echo "Security group already exists: $SG_ID"
fi

# Guardar los IDs para su uso posterior
echo $VPC_ID > vpc_id.txt
echo $SUBNET_ID > subnet_id.txt
echo $SG_ID > sg_id.txt
