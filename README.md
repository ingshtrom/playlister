# playlister

# Local Dev

automatic hot-reloading for web and api

```
docker-compose up
```

# Deployment

## New Server

1. Create server
2. SSH in and run the following:
```
sudo /usr/bin/git clone -c /opt/playlister https://github.com/ingshtrom/playlister.git
/opt/playlister/infra/scripts/init.sh
```

NOTE: I did have to scale down the `prd_api` service to 1 replica in order for it to have the DNS be refreshed. ¯\_(ツ)_/¯

## Update Node App

SSH in to server, set the environment variable `REACT_APP_AUTH0_LOGIN_CALLBACK_URL` (stage and prod should have it set in `.bashrc`) and run:
```
/opt/playlister/infra/scripts/update_react.sh
```

## Update Node App

SSH in to server and run:
```
/opt/playlister/infra/scripts/update_docker.sh
```

# Organization

- infra                       => scripts and config for the VM
- node                        => Node.js application (API)
- react                       => front end application
- docker-compose.yml          => local docker compose file
- docker-stack-production.yml => production compose file for using Docker Swarm
- Vagrantfile                 => used for testing out VM config localy


# TODO
[] add authentication via Auth0 or something
[] add a progress bar of some sort for uploading media
[] some sort of odd bug where you delete a media item and it shows up in the parent container list after using the back button to navigate?
[] make the breadcrumbs clickable
