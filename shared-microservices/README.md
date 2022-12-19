# Shared

## Publishing

The `.npmrc` file must be configured with the following content.

```bash
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow#create-and-check-in-a-project-specific-npmrc-file