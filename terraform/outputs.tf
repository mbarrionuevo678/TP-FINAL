output "vpc_id" {
  value = module.vpc.vpc_id
}

output "subnets" {
  value = module.vpc.public_subnets
}

output "cluster_id" {
  value = aws_eks_cluster.eks.id
}

output "cluster_endpoint" {
  value = aws_eks_cluster.eks.endpoint
}

output "cluster_security_group_id" {
  value = aws_eks_cluster.eks.vpc_config[0].cluster_security_group_id
}

output "node_security_group_id" {
  value = aws_eks_node_group.eks_nodes.resources[0].autoscaling_groups[0].security_group_ids[0]
}

output "prometheus_volume_id" {
  value = aws_ebs_volume.prometheus_volume.id
}

output "grafana_volume_id" {
  value = aws_ebs_volume.grafana_volume.id
}
