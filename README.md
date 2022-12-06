# deploy-to-render

This is a github action that deploys the commit sha that triggered it to [Render](https://render.com)

## Example use

```yml
name: Deploy to Render
on:
  push:
    branches:
      - main
jobs:
  main:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        uses: bankfliptech/deploy-to-render@v1
        with:
          serviceId: ${{ secrets.RENDER_SERVICE_ID }}
          apiKey: ${{ secrets.RENDER_API_KEY }}
          deployHookURL: ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
```

The action has a timeout of 10 minutes since requesting the deployment to check if the deploy is marked as `live` before giving up and erroring out

## API

### Inputs

- **serviceId**: Render's ServiceId for the project you want to deploy
- **apiKey**: A Render API key ([find yours](https://api-docs.render.com/reference/authentication))
- **deployHookURL**: Render's DeployHook URL for specific commit deployment ([read more](https://render.com/docs/deploy-a-commit#deploying-a-commit-via-webhook))

### Outputs

- **success**: A boolean indicating whether the deployment finished successfully or not
