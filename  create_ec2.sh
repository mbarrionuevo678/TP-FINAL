#!/bin/bash

aws ec2 run-instances \
    --image-id ami-0a91cd140a1fc148a \
    --count 1 \
    --instance-type t2.micro \
    --key-name pin \
    --security-group-ids <your-security-group-id> \
    --subnet-id <your-subnet-id> \
    --user-data file://user_data.sh \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=PIN-FINAL-EC2}]'
