# user-service

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
  name: user-service-secret
type: Opaque
stringData:
  JWT_SECRET: JWT_SECRET
```
