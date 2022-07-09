# Simple Nginx Reverse Proxy/Load balancing

I wanted to do a simple and a somewhat fair test with Nginx Reverse Proxy and Load balancing with different backend frameworks serving a simple static small site.

My thought was to simulate a server enviroment of multiple servers running the same backend to create load balancing with a Nginx Reverse Proxy in front to serve to each
server. But for this test I used multiple instances of the backend on the same server to check concurrency load.

I do not expect the results to be completely fair but a rough estimate of load balancing with this simple approch (Nginx Reverse Proxy).

## Backends

They are divived into multiple branches, checkout each branch which can be installed in a seperate site/server.

### Laravel/PHP

Checkout the branch [>-- Here --<](https://github.com/fredrikspannar/nginx-simple-loadtest/tree/backend-laravel)

Be mindful of what PHP settings and what type is used ( fpm, cgi ). This test is mainly for fpm with a pool of max 5 so
it can be somewhat similiar to the Node backend.

### Node

Checkout the branch [>-- Here --<](https://github.com/fredrikspannar/nginx-simple-loadtest/tree/backend-node)

Read the [README for the Node-branch](https://github.com/fredrikspannar/nginx-simple-loadtest/blob/backend-node/README.md) for configuration options.

## Setup of server that should be tested

Nginx at the target server needs to be configured properly or else you will get an "connection reset by peer", ie. the server was not configured to handle
so many requests.

Edit /etc/nginx/nginx.conf and change worker_connections in the events block:

```
...
events {
        worker_connections 20000;
}
...
```

This will make sure that Nginx can handle up to 20000 connections. Make sure to run nginx -t and then restart nginx.

### Installation of benchmarking tools

Apache benchmark:

```
#apt-get install apache2-utils
```