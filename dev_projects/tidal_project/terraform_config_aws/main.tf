provider "aws"{
    profile = "default"
    region  = "us-east-1"
}


variable "vpc_id" {}

data "aws_vpc" "tidal_app_vpc" {
  id = var.vpc_id
}

data "aws_subnet_ids" "tidal_subnet_ids" {
  vpc_id = var.vpc_id
}

data "aws_subnet" "tidal_subnet" {
  for_each = data.aws_subnet_ids.tidal_subnet_ids.ids
  id       = each.value
}


resource "aws_security_group" "tidal_elb_security_group"{
    name = "tidal_elb_security_group"
    description = "Inbound and outbound rules for our elastic load balancer"

    vpc_id = data.aws_vpc.tidal_app_vpc.id



    ingress {
        description = "Allow https to our load balancer"
        from_port = 443
        to_port     = 443
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
        Service = "test_service"
    }
}

resource "aws_elb" "tidal_elb"{
    name = "tidal-elb"
    subnets = [for subnet in data.aws_subnet.tidal_subnet: subnet.id]

    access_logs {
        bucket = "tidal-logs"
        bucket_prefix = "elb/tidal_elb"


    }

    listener {
        instance_port = 8080
        instance_protocol = "http"
        lb_port = 443
        lb_protocol = "https"
        ssl_certificate_id = "arn:aws:iam::123456789012:server-certificate/certName"
    }
    
    health_check {
        healthy_threshold = 3
        unhealthy_threshold = 3
        target = "HTTP:443/health"
        interval = 10
        timeout = 2
    }

    security_groups = [aws_security_group.tidal_elb_security_group.id]

    tags = {
        Service = "test_service"
    }
}


resource "aws_security_group_rule" "rule_for_app_group" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080  
  protocol          = "tcp"
  security_group_id = aws_security_group.tidal_app_security_group.id
  source_security_group_id = aws_security_group.tidal_elb_security_group.id
}

resource "aws_security_group" "tidal_app_security_group"{
    name = "tidal_app_security_group"
    description = "Inbound and outbound rules for our elastic load balancer"
    vpc_id = data.aws_vpc.tidal_app_vpc.id
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Service = "test_service"
    }
}
