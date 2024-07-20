resource "aws_ebs_volume" "prometheus_volume" {
  availability_zone = "${var.aws_region}a"
  size              = 20  # Tamaño en GB
  tags = {
    Name = "PrometheusVolume"
  }
}

resource "aws_ebs_volume" "grafana_volume" {
  availability_zone = "${var.aws_region}a"
  size              = 10  # Tamaño en GB
  tags = {
    Name = "GrafanaVolume"
  }
}

output "prometheus_volume_id" {
  value = aws_ebs_volume.prometheus_volume.id
}

output "grafana_volume_id" {
  value = aws_ebs_volume.grafana_volume.id
}
