# notification-service

## Provide environment variables for running the app locally in Docker Compose

.env

```bash
REACT_APP_ORIGIN= ...
SENDGRID_API_KEY= ...
SENDGRID_FROM= ...
```

## Provide environment variables for running the app locally in Kubernetes

secret.yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: notification-service-secret
type: Opaque
stringData:
  REACT_APP_ORIGIN: ...
  SENDGRID_API_KEY: ...
  SENDGRID_FROM: ...
```
