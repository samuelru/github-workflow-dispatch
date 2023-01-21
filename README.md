# Webhook PROXY (GET,POST,PUT,PATCH) to Github Workflow Dispatch (POST)

This is a proxy for the Github Workflow Dispatch API. It allows you to trigger a workflow run from a webhook without using headers.

## Why?

Strapi does not allow you to use headers in webhooks. This is a workaround to trigger a workflow run from a webhook.

## Development
```bash
yarn install
yarn dev 1234567890

# Example
# http://localhost:3000?url=https://api.github.com/repos/johndoe/my-cool-project/actions/workflows/my-cool-workflow.yml/dispatches&apikey=1234567890&headers={"Accept":"application/vnd.github+json","Authorization":"Bearer ghp_22jdasflkJLFSaksadljlksdaflk"}&data={"ref":"main"}
```

## Production

This is how your production docker-compose.yml could look like.

Make sure to add a strong password (avoid using this chars ?,&"{}') as docker secret GITHUB_WORKFLOW_DISPATCH_APIKEY
```yaml
version: "3.4"

services:
  github-workflow-dispatch:
    image: samuelrunggaldier/github-workflow-dispatch:latest
    restart: always
    secrets:
      - GITHUB_WORKFLOW_DISPATCH_APIKEY
    networks:
      - traefik
    deploy:
      mode: replicated
      replicas: 1
      update_config:
        delay: 60s
        monitor: 60s
      labels:
        - traefik.enable=true
        - traefik.http.services.github-workflow-dispatch.loadbalancer.server.port=3000
        - traefik.http.routers.github-workflow-dispatch.tls=true
        - traefik.http.routers.github-workflow-dispatch.tls.certresolver=myresolver
        - traefik.http.routers.github-workflow-dispatch.rule=Host(`workflow-dispatch.mycooldomain.com`)
        - traefik.http.routers.github-workflow-dispatch.service=github-workflow-dispatch
        - traefik.http.routers.github-workflow-dispatch.entrypoints=websecure
        - traefik.docker.network=traefik

secrets:
  GITHUB_WORKFLOW_DISPATCH_APIKEY:
    external: true

networks:
  traefik:
    external: true
```

## Webhook example (with fake credentials)
```bash
https://workflow-dispatch.mycooldomain.com?url=https://api.github.com/repos/johndoe/my-cool-project/actions/workflows/my-cool-workflow.yml/dispatches&apikey=1234567890&headers={"Accept":"application/vnd.github+json","Authorization":"Bearer ghp_22jdasflkJLFSaksadljlksdaflk"}&data={"ref":"main"}
```

⚠️Warning: Please set the `apikey` to a random string and keep it secret. It is used to prevent unauthorized access to your Github API.