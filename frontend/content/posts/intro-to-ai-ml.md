---
title: "Introduction to AI & Machine Learning"
date: "2026-02-28"
category: "AI"
excerpt: "Understand the basics of Artificial Intelligence and Machine Learning with practical Python examples."
coverImage: "/images/posts/ai.jpg"
author: "Nattavee"
---

# Introduction to AI & Machine Learning

Artificial Intelligence (AI) and Machine Learning (ML) are transforming every industry. Let's explore the fundamentals with hands-on examples.

## What is Machine Learning?

Machine Learning is a subset of AI that enables systems to learn from data without being explicitly programmed.

### Types of ML

- **Supervised Learning** — labeled training data (classification, regression)
- **Unsupervised Learning** — unlabeled data (clustering, dimensionality reduction)
- **Reinforcement Learning** — learning through rewards and penalties

## Setting Up Your ML Environment

```bash
# Create a virtual environment
python -m venv ml-env
source ml-env/bin/activate  # Linux/Mac
# ml-env\Scripts\activate   # Windows

# Install essential packages
pip install numpy pandas scikit-learn matplotlib jupyter
```

## Your First ML Model

```python
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Generate sample data
from sklearn.datasets import load_iris

# Load the Iris dataset
iris = load_iris()
X = iris.data
y = iris.target

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2%}")
print(classification_report(y_test, predictions))
```

## Neural Networks with TensorFlow

```python
import tensorflow as tf
from tensorflow import keras

# Build a simple neural network
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# model.fit(X_train, y_train, epochs=10, batch_size=32)
```

## Key AI/ML Concepts

| Concept | Description |
|---------|-------------|
| **Overfitting** | Model memorizes training data, poor generalization |
| **Underfitting** | Model too simple to capture patterns |
| **Feature Engineering** | Creating meaningful input features |
| **Cross-Validation** | Robust model evaluation technique |
| **Hyperparameter Tuning** | Optimizing model configuration |

## Conclusion

AI and ML are powerful tools that can solve complex problems. Start with simple models, understand the fundamentals, and gradually tackle more advanced topics like deep learning and NLP!
