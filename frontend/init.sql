-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    color VARCHAR(20) NOT NULL DEFAULT '#3b82f6',
    icon VARCHAR(100) NOT NULL DEFAULT 'default'
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(500) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    cover_image TEXT NOT NULL DEFAULT '',
    author VARCHAR(255) NOT NULL DEFAULT 'Anonymous',
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Seed default categories
INSERT INTO categories (name, slug, color, icon) VALUES
    ('Cloud Native', 'cloud-native', '#2563eb', 'cloud-native'),
    ('HomeLab', 'homelab', '#0ea5e9', 'homelab'),
    ('Networking', 'networking', '#3b82f6', 'networking'),
    ('Cloud', 'cloud', '#1d4ed8', 'cloud'),
    ('AI', 'ai', '#6366f1', 'ai'),
    ('ETC', 'etc', '#3b82f6', 'etc')
ON CONFLICT (slug) DO NOTHING;

-- Seed initial posts
INSERT INTO posts (slug, title, date, category, excerpt, cover_image, author, content) VALUES
    (
        'getting-started-with-kubernetes',
        'Getting Started with Kubernetes',
        '2026-03-10',
        'Cloud Native',
        'Learn the fundamentals of Kubernetes and deploy your first containerized application step by step.',
        '/images/posts/kubernetes.jpg',
        'Nattavee',
        '# Getting Started with Kubernetes

Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and operations for containerized applications.

## Why Kubernetes

- High availability with replica management
- Automated rollout and rollback
- Service discovery and load balancing
- Horizontal scaling

## Quick Start

```bash
kubectl create deployment nginx --image=nginx:1.25
kubectl expose deployment nginx --type=NodePort --port=80
kubectl get pods,svc
```

Next, explore Helm, Ingress, and GitOps workflows to build production-ready platform skills.'
    ),
    (
        'aws-cloud-basics',
        'AWS Cloud Basics',
        '2026-03-01',
        'Cloud',
        'A practical introduction to core AWS services and how they fit together.',
        '/images/posts/aws-basics.jpg',
        'Nattavee',
        '# AWS Cloud Basics

This guide introduces the foundational AWS building blocks used in most architectures.

## Core Services

- **EC2** for compute
- **S3** for object storage
- **RDS** for managed relational databases
- **VPC** for network isolation
- **IAM** for access control

## Starter Architecture

Use a VPC with public and private subnets, put application servers behind a load balancer, and store static assets in S3.

Understanding these primitives makes it easier to design secure and scalable systems.'
    ),
    (
        'intro-to-ai-ml',
        'Intro to AI/ML',
        '2026-02-18',
        'AI',
        'Understand core AI and machine learning concepts with practical examples.',
        '/images/posts/ai-ml.jpg',
        'Nattavee',
        '# Intro to AI/ML

AI is a broad field, while machine learning is a subset focused on learning patterns from data.

## Typical Workflow

1. Collect and clean data
2. Split train/validation/test datasets
3. Train model and tune hyperparameters
4. Evaluate with appropriate metrics
5. Deploy and monitor model drift

Start with simple models first, then iterate toward higher complexity as needed.'
    )
ON CONFLICT (slug) DO NOTHING;
