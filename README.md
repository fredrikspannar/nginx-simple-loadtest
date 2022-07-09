# Simple Nginx Reverse Proxy/Load balancing

I wanted to do a simple and a somewhat fair test with Nginx Reverse Proxy and Load balancing with different backend frameworks serving a simple static small site.

My thought was to simulate a server enviroment of multiple servers running the same backend to create load balancing with a Nginx Reverse Proxy in front to serve to each
server. But for this test I used multiple instances of the backend on the same server to check concurrency load.

I do not expect the results to be completely fair but a rough estimate of load balancing with this simple approch (Nginx Reverse Proxy).

## Node Backend

## Install

Install all dependencies with:

```
#npm install
```

### Configuration
Create an .env in the root directory of the cloned branch with the appropiate number of ports which will span that number of instances, you should probably use all 5 to span 5 instances
so it is somewhat similar to the PHP backend.

Example .env:

```
LOADTEST_PORT1=9000
LOADTEST_PORT2=9001
LOADTEST_PORT3=9002
LOADTEST_PORT4=9003
LOADTEST_PORT5=9004
```

Next setup the Nginx-configuration with an upstream proxy (replace "[YOUR DOMAIN HERE]" with your domain though):

```
upstream app1 {
        server 127.0.0.1:9000;
        server 127.0.0.1:9001;
        server 127.0.0.1:9002;
        server 127.0.0.1:9003;
        server 127.0.0.1:9004;
}

server {
        listen 80;
        listen [::]:80;

        server_name [YOUR DOMAIN HERE];

        location / {
                proxy_pass http://app1;
        }

}

```

### Running

All instances can be run with only:

```
#npm start
```