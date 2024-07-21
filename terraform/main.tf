# VPC
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  tags = {
    Name = "main-vpc"
  }
}

# Subnet
resource "aws_subnet" "main" {
  vpc_id     = aws_vpc.main.id
  cidr_block = var.subnet_cidr
  tags = {
    Name = "main-subnet"
  }
}

# Security Group
resource "aws_security_group" "eks_sg" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "eks-sg"
  }
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.main.id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_policy
  ]
}

resource "aws_iam_role" "eks_role" {
  name = "eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "eks_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_role.name
}

# EBS Volumes
resource "aws_ebs_volume" "ebs_volume_prometheus" {
  availability_zone = "us-east-1a"
  size              = var.ebs_volume_size
  tags = {
    Name = "ebs-volume-prometheus"
  }
}

resource "aws_ebs_volume" "ebs_volume_grafana" {
  availability_zone = "us-east-1a"
  size              = var.ebs_volume_size
  tags = {
    Name = "ebs-volume-grafana"
  }
}

output "ebs_volume_prometheus_id" {
  value = aws_ebs_volume.ebs_volume_prometheus.id
}

output "ebs_volume_grafana_id" {
  value = aws_ebs_volume.ebs_volume_grafana.id
}

output "cluster_name" {
  value = aws_eks_cluster.main.name
}
