#!/bin/bash
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
export DOCKER_CLI_EXPERIMENTAL=enabled
rm -rf ./template
faas-cli template pull https://github.com/rafaelpernil2/openfaas-template-node-typescript-uwebsockets
faas-cli publish -f https-graphql-notifications.yml --platforms linux/arm/v7
