# footballer
Version 3.2.5 of my Meteor app for following NFL weekly winners

## stack
This app uses Meteor, React, MongoDb and Semantic UI.

## set local db (if restoring from production)
`export MONGO_URL=mongodb://localhost:27017/footballer`

## starting the app
Navigate to app root folder and type:
`meteor`

## tests
Run tests, open browser to localhost:3300 to view results:
`meteor test --driver-package practicalmeteor:mocha --port 3300`

## build / server / database / deploy

#### *build docker image*

###### from Meteor root folder
`meteor build ../build --server-only --architecture os.linux.x86_64`

###### ensure build folder (1 level up) contains a `Dockerfile`:
```
FROM node:4.8.2-alpine
MAINTAINER Tim Cooper <email address>

ENV BUILD_PACKAGES="python make gcc g++ git libuv bash curl tar bzip2" \
    NODE_ENV=production \
    ROOT_URL=http://localhost:3000 \
    PORT=3000

WORKDIR /root/app/bundle

ADD footballer.tar.gz /root/app
RUN apk --update add ${BUILD_PACKAGES} \
    && (cd programs/server/ && npm install --unsafe-perm) \
    && apk --update del ${BUILD_PACKAGES}

EXPOSE 3000
CMD node main.js
```

###### navigate to ../build folder, create a docker image (note the ".")
`docker build -t tjscooper/footballer:2.0.7 .`

###### push "tjscooper/footballer" image to https://hub.docker.com/
`docker push tjscooper/footballer:2.0.7`

### *server*

###### log into Digital Ocean and create a new CentOS droplet (7.3.1611 x64)
Using GUI...

###### SSH into the droplet
`ssh root@<IP ADDRESS OF DROPLET>`

###### start docker service
`systemctl start docker`

###### enable docker service to start with OS on reboots
`systemctl enable docker`

###### verify docker service
`systemctl status docker`

### *database*

###### pull mongodb image from Docker hub
`docker pull mongo:3.2`

###### run mongodb container
`docker run -d --restart=always -v /root/database/:/data/db --name mongodb mongo:3.2 mongod --smallfiles --nohttpinterface --replSet rs0`

###### configure replica set, and create oplog user
`docker exec -it mongodb mongo`

###### in the mongo console, remember use better password
`use admin`
`rs.initiate()`
`db.createUser({user: "oplogger", pwd: "footballer", roles: [{role: "read", db: "local"}]})`

### *update app in production to use new docker image*

###### log into server
`ssh <user>@<domain>` and enter password

###### pull latest docker image
`docker pull tjscooper/footballer:2.0.6`

###### view list of running docker processes
`ps -a`

###### view list of docker images
`docker images`

###### blow away current footballer image (if exists)
`docker rm footballer -f`

###### start up new image
`docker run -d -p 80:3000 --restart=always --link mongodb -e MONGO_URL=mongodb://mongodb:27017/footballer -e MONGO_OPLOG_URL=mongodb://oplogger:footballer@mongodb:27017/local?authSource=admin --name=footballer tjscooper/footballer:2.0.6`

### *server db dump to local restore (from docker image)*

###### log into server
`ssh <user>@<domain>` and enter password

###### get a list of docker images
`docker ps`

###### use the name of the mongodb docker image to open bash terminal
`docker exec -it mongodb bash`

###### *(optional) check out the mongodb itself
`mongo` them `exit`

###### navigate to the root folder
`cd /`

###### dump the database (inside the image)
`mongodump -o /dump/` and then `exit`

###### copy the dump from the image to the server root
`docker cp mongodb:/dump .` and then `exit`

###### copy files from server to local folder
`scp -r <user>@<domain>:/root/dump .` and enter password

###### drop and restore to local database
`mongorestore --drop --db footballer ./dump/footballer`

### *nginx notes*

```
server {
    listen 80;

    server_name example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /app2 {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

###### test and restart nginx
`sudo nginx -t`
`sudo service nginx restart`
