# task-service

## Provide environment variables for running the app locally in Docker Compose

.env

```bash
JWT_SECRET=JWT_SECRET
```

## Provide environment variables for running the app locally in Kubernetes

secret.yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: task-service-secret
type: Opaque
stringData:
  JWT_SECRET: JWT_SECRET
```
