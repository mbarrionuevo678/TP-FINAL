variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "CIDR block for the subnet"
  default     = "10.0.1.0/24"
}

variable "cluster_name" {
  description = "EKS Cluster Name"
  default     = "my-cluster"
}

variable "ebs_volume_size" {
  description = "Size of the EBS volume in GB"
  default     = 10
}
