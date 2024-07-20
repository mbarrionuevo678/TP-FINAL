resource "aws_iam_instance_profile" "terraform_instance_profile" {
  name = "TerraformInstanceProfile"
  role = aws_iam_role.terraform_role.name
}
