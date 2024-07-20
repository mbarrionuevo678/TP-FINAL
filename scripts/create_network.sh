#!/bin/bash

# Crear VPC
VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)
echo "VPC ID: $VPC_ID"

# Crear subnets
SUBNET1_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --availability-zone us-east-1a --query 'Subnet.SubnetId' --output text)
SUBNET2_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.2.0/24 --availability-zone us-east-1b --query 'Subnet.SubnetId' --output text)
SUBNET3_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.3.0/24 --availability-zone us-east-1c --query 'Subnet.SubnetId' --output text)
echo "Subnets: $SUBNET1_ID, $SUBNET2_ID, $SUBNET3_ID"

# Crear Internet Gateway y asociarlo al VPC
IGW_ID=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --internet-gateway-id $IGW_ID --vpc-id $VPC_ID
echo "Internet Gateway ID: $IGW_ID"

# Crear Route Table y asociar subnets
ROUTE_TABLE_ID=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $ROUTE_TABLE_ID --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID
aws ec2 associate-route-table --subnet-id $SUBNET1_ID --route-table-id $ROUTE_TABLE_ID
aws ec2 associate-route-table --subnet-id $SUBNET2_ID --route-table-id $ROUTE_TABLE_ID
aws ec2 associate-route-table --subnet-id $SUBNET3_ID --route-table-id $ROUTE_TABLE_ID
echo "Route Table ID: $ROUTE_TABLE_ID"

# Crear Security Group
SECURITY_GROUP_ID=$(aws ec2 create-security-group --group-name "eks-security-group" --description "Security group for EKS cluster" --vpc-id $VPC_ID --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $SECURITY_GROUP_ID --protocol all --port all --cidr 0.0.0.0/0
echo "Security Group ID: $SECURITY_GROUP_ID"

# Guardar IDs en un archivo para usarlos posteriormente
echo "VPC_ID=$VPC_ID" > scripts/resource_ids.sh
echo "SUBNET1_ID=$SUBNET1_ID" >> scripts/resource_ids.sh
echo "SUBNET2_ID=$SUBNET2_ID" >> scripts/resource_ids.sh
echo "SUBNET3_ID=$SUBNET3_ID" >> scripts/resource_ids.sh
echo "IGW_ID=$IGW_ID" >> scripts/resource_ids.sh
echo "ROUTE_TABLE_ID=$ROUTE_TABLE_ID" >> scripts/resource_ids.sh
echo "SECURITY_GROUP_ID=$SECURITY_GROUP_ID" >> scripts/resource_ids.sh
