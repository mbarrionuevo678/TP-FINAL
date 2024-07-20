module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "17.1.0"
  cluster_name    = "eks-cluster"
  cluster_version = "1.21"
  subnets         = module.vpc.public_subnets
  vpc_id          = module.vpc.vpc_id

  manage_aws_auth = true

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

resource "aws_eks_node_group" "eks_nodes" {
  cluster_name    = module.eks.cluster_id
  node_group_name = "eks-node-group"
  node_role_arn   = aws_iam_role.eks_node_group_role.arn
  subnet_ids      = module.vpc.public_subnets

  scaling_config {
    desired_size = 3
    max_size     = 4
    min_size     = 1
  }

  instance_types = ["t3.medium"]

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy_attachment,
    aws_iam_role_policy_attachment.eks_cni_policy_attachment,
    aws_iam_role_policy_attachment.eks_registry_readonly_policy_attachment,
  ]
}
