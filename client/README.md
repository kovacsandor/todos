# client-service

## Updating packages

Tests break above the following versions of these packages:

```json
{
  "@tanstack/react-query": "4.10.3",
  "@tanstack/react-query-devtools": "4.10.3",
  "@testing-library/user-event": "14.3.0"
}
```

## Provide environment variables for running the app locally

.env

```bash
REACT_APP_ORIGIN=http://todos.local.com
REACT_APP_WEBSITE_NAME=Todos
```
