#!/bin/bash

minikube start

docker context use default

# minikube -p minikube docker-env --shell powershell | Invoke-Expression

kubectl apply -f ".\database\postgres-db"


# kubectl get service

minikube service pg-admin-external-service