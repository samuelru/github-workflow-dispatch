# Webhook (GET) PROXY for Github Workflow Dispatch

This is a proxy for the Github Workflow Dispatch API. It allows you to trigger a workflow run from a webhook without using headers.

## Development
```bash
yarn install
yarn dev 1234567890

# Example
# http://localhost:3000?url=https://api.github.com/repos/johndoe/my-cool-project/actions/workflows/my-cool-workflow.yml/dispatches&apikey=1234567890&headers={"Accept":"application/vnd.github+json","Authorization":"Bearer ghp_22jdasflkJLFSaksadljlksdaflk"}&data={"ref":"main"}
```

## Production

docker-compose.yml
```yaml
TODO: Add docker-compose.yml
```

## Webhook example (with fake credentials)
```bash
https://workflow-dispatch.mycooldomain.com?url=https://api.github.com/repos/johndoe/my-cool-project/actions/workflows/my-cool-workflow.yml/dispatches&apikey=1234567890&headers={"Accept":"application/vnd.github+json","Authorization":"Bearer ghp_22jdasflkJLFSaksadljlksdaflk"}&data={"ref":"main"}
```

⚠️Warning: Please set the `apikey` to a random string and keep it secret. It is used to prevent unauthorized access to your Github API.