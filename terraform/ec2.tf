resource "aws_instance" "jenkins" {
  ami           = "ami-0c55b159cbfafe1f0"  # Actualiza con el ID de la AMI que prefieras
  instance_type = "t3.medium"
  key_name      = "jenkins"
  iam_instance_profile = aws_iam_instance_profile.terraform_instance_profile.name
  user_data     = file("${path.module}/ec2_user_data.sh")

  tags = {
    Name = "Jenkins"
  }

  security_groups = [aws_security_group.allow_ssh_http.name]
}
