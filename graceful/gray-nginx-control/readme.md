# Setup Node.js, Apache and an nginx reverse-proxy with Docker

$ docker-compose up

Go to http://localhost:8000 and see the result: 

 - An nginx reverse-proxy forward incoming traffic to the appropriate server and directly serves static assets (images and scripts).
 - A Node.js server build pages with content pre-fetched from the PHP api (server side rendering).
 - A PHP Api running on Apache provides content as Json.