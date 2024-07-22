resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = "main-vpc"
  }
}

resource "aws_subnet" "subnet_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.subnet_a_cidr
  availability_zone = "us-east-1a"

  tags = {
    Name = "subnet-a"
  }
}

resource "aws_subnet" "subnet_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.subnet_b_cidr
  availability_zone = "us-east-1b"

  tags = {
    Name = "subnet-b"
  }
}

resource "aws_security_group" "ec2_sg" {
  description = "Allow SSH inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2-sg"
  }
}

resource "aws_security_group" "eks_sg" {
  description = "Managed by Terraform"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "eks-sg"
  }
}

resource "aws_ebs_volume" "ebs_volume_grafana" {
  availability_zone = "us-east-1a"
  size              = 10

  tags = {
    Name = "ebs-volume-grafana"
  }
}

resource "aws_ebs_volume" "ebs_volume_prometheus" {
  availability_zone = "us-east-1a"
  size              = 10

  tags = {
    Name = "ebs-volume-prometheus"
  }
}

resource "aws_iam_role" "eks_role" {
  name               = "eks-cluster-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_policy" {
  role       = aws_iam_role.eks_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_eks_cluster" "main" {
  name     = var.eks_cluster_name
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_policy
  ]
}

resource "aws_instance" "kubectl_instance" {
  ami           = "ami-0de53d8956e8dcf80" # AMI válida para us-east-1
  instance_type = var.instance_type
  key_name      = var.key_pair_name
  subnet_id     = aws_subnet.subnet_a.id

  security_groups = [aws_security_group.ec2_sg.id]

  tags = {
    Name = "kubectl-instance"
  }

  user_data = file("user_data.sh")
}
