resource "aws_iam_role" "terraform_role" {
  name = "TerraformRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      },
    ]
  })
}

resource "aws_iam_policy" "terraform_policy" {
  name        = "TerraformPolicy"
  description = "Policy for Terraform to manage AWS resources"
  policy      = file("${path.module}/terraform-policy.json")
}

resource "aws_iam_role_policy_attachment" "terraform_policy_attachment" {
  role       = aws_iam_role.terraform_role.name
  policy_arn = aws_iam_policy.terraform_policy.arn
}
