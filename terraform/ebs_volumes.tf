resource "aws_ebs_volume" "prometheus_volume" {
  availability_zone = "us-east-1a"
  size              = 20  # Tamaño en GB
  tags = {
    Name = "PrometheusVolume"
  }
}

resource "aws_ebs_volume" "grafana_volume" {
  availability_zone = "us-east-1a"
  size              = 10  # Tamaño en GB
  tags = {
    Name = "GrafanaVolume"
  }
}

