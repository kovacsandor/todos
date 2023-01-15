# notification-service

## Provide environment variables for running the app locally in Docker Compose

.env

```bash
REACT_APP_ORIGIN=http://todos.local.com
SENDGRID_API_KEY= ... # a working Sendgrid API Key (or a random string)
SENDGRID_FROM= ...    # a registered Sendgrid sender (or a random email)
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
  REACT_APP_ORIGIN: http://todos.local.com
  SENDGRID_API_KEY: ... # a working Sendgrid API Key (or a random string)
  SENDGRID_FROM: ... # a registered Sendgrid sender (or a random email)
```
