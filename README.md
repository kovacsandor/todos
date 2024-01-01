# Todos

## Running the app locally

### Map application host to localhost

> Mandatory for all methods to start up the app locally.

In your `/etc/host` file map `todos.local.com` to your local ip address. This is needed if you wish to work on multiple projects locally.

```bash
127.0.0.1 todos.local.com
```

Once the application is running visit the app in the browser <http://todos.local.com/>

### Starting up the app in Docker Compose

> The _easiest_ and recommended method to start up the app locally.

Start application in development mode with live code refresh and live reload in the browser.

```bash
cd ~/Projects/todos/
docker-compose up --detach
```

If you make changes outside of the src folder you might want to rebuild the images with `docker-compose up --detach --build`.

#### Environment variables for Docker Compose

Make sure you provided the `.env` file for all microservices.

- [client/](./client/README.md)
- [notification-service/](./notification-service/README.md)
- [task-service/](./task-service/README.md)
- [user-service/](./user-service/README.md)

#### Accessing the databases running in Docker Compose locally

Find the database you want to connect to in the `docker-compose.yaml` file and see what port it is mapped to on your local computer.

```yaml
services:
  user-service-database:
    ports:
      - '27080:27017'
```

Then connect to the database using that port `mongodb://localhost:27080`.

#### Stop app in Docker Compose

Stops and deletes the containers

```bash
docker-compose down
```

### Starting up the app in Kubernetes

#### Docker images

##### Build Docker images

All microservices need to have Docker images build from them.

```bash
cd ~/Projects/todos/
# react app environment variables need to be present at build time
build_with_args="docker build -t andorkovacs/todos-client-service -f ./client/Dockerfile $(cat ./client/.env | while read -r line; do out+="--build-arg \"$line\" "; done; echo $out;out="")./client/"
eval "$build_with_args"
docker build -t andorkovacs/todos-notification-service -f ./notification-service/Dockerfile ./notification-service/
docker build -t andorkovacs/todos-task-service -f ./task-service/Dockerfile ./task-service/
docker build -t andorkovacs/todos-user-service -f ./user-service/Dockerfile ./user-service/
```

##### Push Docker images

All images need to be pushed to Docker Hub.

```bash
docker push andorkovacs/todos-client-service
docker push andorkovacs/todos-notification-service
docker push andorkovacs/todos-task-service
docker push andorkovacs/todos-user-service
```

#### Kubernetes objects

##### Create secrets for environment variables

Make sure you provided the `secret.yaml` file for all microservices.

```bash
# client environment variables were set at image build time
kubectl apply -f ./notification-service/secret.yaml
kubectl apply -f ./task-service/secret.yaml
kubectl apply -f ./user-service/secret.yaml
```

##### Create the Kubernetes deployments and Cluster IP services

The deployments will create pods running containers made based on the docker images.

```bash
kubectl apply -f ./deployment/client-service.yaml
kubectl apply -f ./deployment/kafka.yaml
kubectl apply -f ./deployment/notification-service.yaml
kubectl apply -f ./deployment/task-service-database.yaml
kubectl apply -f ./deployment/task-service.yaml
kubectl apply -f ./deployment/user-service-database.yaml
kubectl apply -f ./deployment/user-service.yaml
```

##### Install NGINX ingress controller

Create a LoadBalancer service and an ingress-nginx-controller deployment. [NGINX Ingress Controller Installation Guide - Quick start](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml
```

##### Configure NGINX ingress controller

Create a an ingress configuration for the ingress-nginx-controller.

```bash
kubectl apply -f ingress.dev.yaml
```

#### Restart app in Kubernetes

```bash
kubectl rollout restart deployment client-service-deployment
kubectl rollout restart deployment notification-service-deployment
kubectl rollout restart deployment task-service-database-deployment
kubectl rollout restart deployment task-service-deployment
kubectl rollout restart deployment user-service-database-deployment
kubectl rollout restart deployment user-service-deployment
```

> Note that if you restart your database deployments all your data saved will be lost.

#### Accessing the databases running in Kubernetes locally

List pods

```bash
kubectl get pods
```

Find the database's pod that you want to connect to.

| NAME                                              | READY | STATUS  | RESTARTS | AGE |
| ------------------------------------------------- | ----- | ------- | -------- | --- |
| ⋯                                                 | ⋯     | ⋯       | ⋯        | ⋯   |
| user-service-database-deployment-59d59df77c-b2gdj | 1/1   | Running | 0        | 21m |
| ⋯                                                 | ⋯     | ⋯       | ⋯        | ⋯   |

You can forward the port of the pod the database runs in.

```bash
kubectl port-forward user-service-database-deployment-59d59df77c-b2gdj 27080:27017
```

You can access the database with the connection string of `mongodb://localhost:27080`.

#### Stop and delete app in Kubernetes

```bash
kubectl delete deployment client-service-deployment
kubectl delete deployment kafka-deployment
kubectl delete deployment notification-service-deployment
kubectl delete deployment task-service-database-deployment
kubectl delete deployment task-service-deployment
kubectl delete deployment user-service-database-deployment
kubectl delete deployment user-service-deployment
kubectl delete service client-service
kubectl delete service kafka
kubectl delete service notification-service
kubectl delete service task-service-database
kubectl delete service task-service
kubectl delete service user-service-database
kubectl delete service user-service
kubectl delete all --all -n ingress-nginx
```

## GitHub actions

### Running tests

If you open a pull request all the tests of the changes microservices will run.
