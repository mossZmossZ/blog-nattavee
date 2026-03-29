---
title: "AWS Cloud Basics: Your First Steps"
date: "2026-03-01"
category: "Cloud"
excerpt: "Get started with Amazon Web Services and learn core services like EC2, S3, and VPC."
coverImage: "/images/posts/aws.jpg"
author: "Nattavee"
---

# AWS Cloud Basics: Your First Steps

Amazon Web Services (AWS) is the leading cloud provider. Let's explore the core services every cloud engineer should know.

## Core AWS Services

### EC2 (Elastic Compute Cloud)

Launch a virtual server:

```bash
# Using AWS CLI to launch an EC2 instance
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t3.micro \
  --key-name my-key-pair \
  --security-groups my-security-group \
  --count 1

# Check your running instances
aws ec2 describe-instances \
  --query 'Reservations[].Instances[].[InstanceId,State.Name,PublicIpAddress]' \
  --output table
```

### S3 (Simple Storage Service)

```bash
# Create a bucket
aws s3 mb s3://my-unique-bucket-name

# Upload a file
aws s3 cp myfile.txt s3://my-unique-bucket-name/

# List objects
aws s3 ls s3://my-unique-bucket-name/

# Sync a directory
aws s3 sync ./local-folder s3://my-unique-bucket-name/backup/
```

### VPC (Virtual Private Cloud)

```python
# Terraform example for VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "main-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-southeast-1a"

  tags = {
    Name = "public-subnet"
  }
}
```

## AWS Free Tier Highlights

| Service | Free Tier Limit |
|---------|----------------|
| EC2 | 750 hrs/month (t2.micro) |
| S3 | 5 GB storage |
| RDS | 750 hrs/month (db.t3.micro) |
| Lambda | 1M requests/month |
| CloudFront | 1 TB data transfer |

## Best Practices

1. **Enable MFA** on your root account
2. **Use IAM roles** instead of access keys
3. **Set billing alerts** to avoid surprises
4. **Tag everything** for cost tracking
5. **Use regions close** to your users

## Conclusion

AWS offers an incredible range of services. Start with the free tier, experiment, and build your cloud skills progressively!
