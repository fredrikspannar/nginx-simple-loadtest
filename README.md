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
PORT=9000
CLUSTER_INSTANCES=5
NODE_ENV=production
```

Make sure to set NODE_ENV to production - or else Express will not compact the requests, some debug-data is sent also.

Next setup the Nginx-configuration with an upstream proxy (replace "[YOUR DOMAIN HERE]" with your domain though):

```
upstream app1 {
		# session persistance
		ip_hash;

		# upstream / loadbalance to which servers
        server 127.0.0.1:9000;
        server 127.0.0.1:9001;
}

server {
        listen 80;
        listen [::]:80;

        server_name [YOUR DOMAIN HERE];

        location / {
                proxy_pass http://app1;

                # forward ip from client
  				proxy_set_header X-Real-IP   $remote_addr;
  				proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

                # If using websocket we need http 1.1
    			#proxy_http_version 1.1;
    			#proxy_set_header Upgrade $http_upgrade;
    			#proxy_set_header Connection $connection_upgrade;                
        }

}

```

### Running

All instances can be run with only:

```
#npm start
```
