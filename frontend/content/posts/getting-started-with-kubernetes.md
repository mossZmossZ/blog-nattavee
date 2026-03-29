---
title: "Getting Started with Kubernetes"
date: "2026-03-10"
category: "Cloud Native"
excerpt: "Learn the fundamentals of Kubernetes and deploy your first containerized application step by step."
coverImage: "/images/posts/kubernetes.jpg"
author: "Nattavee"
---

# Getting Started with Kubernetes

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. In this guide, we'll walk through the basics and deploy our first app.

## Prerequisites

- Docker installed on your machine
- kubectl CLI tool
- A Kubernetes cluster (we'll use Minikube for local development)

## Installing Minikube

First, let's install Minikube to create a local Kubernetes cluster:

```bash
# Install Minikube on Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start the cluster
minikube start

# Verify the cluster is running
kubectl cluster-info
```

## Your First Deployment

Let's create a simple Nginx deployment:

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
```

Apply the deployment:

```bash
kubectl apply -f deployment.yaml
kubectl get pods
kubectl get deployments
```

## Exposing Your Service

To access the Nginx deployment from outside the cluster:

```bash
kubectl expose deployment nginx-deployment --type=NodePort --port=80
minikube service nginx-deployment
```

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Pod** | Smallest deployable unit in Kubernetes |
| **Deployment** | Manages ReplicaSets and provides declarative updates |
| **Service** | Exposes pods to network traffic |
| **Namespace** | Virtual cluster for resource isolation |

## Conclusion

You've successfully deployed your first application on Kubernetes! From here, you can explore more advanced topics like Helm charts, Ingress controllers, and GitOps workflows.
