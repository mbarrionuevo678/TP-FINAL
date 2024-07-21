output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet_ids" {
  value = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
}

output "eks_sg_id" {
  value = aws_security_group.eks_sg.id
}

output "ec2_sg_id" {
  value = aws_security_group.ec2_sg.id
}

output "grafana_volume_id" {
  value = aws_ebs_volume.ebs_volume_grafana.id
}

output "prometheus_volume_id" {
  value = aws_ebs_volume.ebs_volume_prometheus.id
}

output "cluster_name" {
  value = aws_eks_cluster.main.name
}

output "public_ip" {
  value = aws_instance.kubectl_instance.public_ip
}

output "public_dns" {
  value = aws_instance.kubectl_instance.public_dns
}
