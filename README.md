# footballer
Version 2.0 of my Meteor app for following NFL weekly winners

## stack
This app uses Meteor, React, MongoDb and Semantic UI.

## starting the app
Navigate to app root folder and type:
`meteor`

## tests
Run tests, open browser to localhost:3300 to view results:
`meteor test --driver-package practicalmeteor:mocha --port 3300`

## build / deploy

*local*

Upgrade node version `nvm install stable` should go to v6.5.0 or greater.

From app root, run `demeteorizer --output ../footballer-build`

Preview the build using `MONGO_URL=mongodb://localhost:27017/footballer PORT=8080 ROOT_URL=http://localhost:8080 npm start`

Git commit and push (footballer-build repository)


*server*

Pull latest and then run `npm install` from the project root

Restart the app `pm2 list` to get the app index, then `npm restart 0` (if 0 is index)


*server logs*

app output `tail -f /root/.pm2/logs/footballer-out.log`

errors `tail -f /root/.pm2/logs/footballer-error.log`


*server notes*

installing nodejs on ubuntu `sudo apt-get install -y nodejs`

*server db dump to local restore*

log into server as user 'tjscooper', run `mongodump -d footballer -o footballer-dump` from outside of app folder

make root the owner, `chown -R tjscooper footballer-dump`

exit server and copy files from server to local folder using,
`sudo scp -r tjscooper@middlelogic.com:/var/www/footballer-dump footballer-dump` and enter password

drop and restore to local database using, `mongorestore --drop --db footballer footballer-dump/footballer`

*nginx notes*

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

test and restart nginx

`sudo nginx -t`
`sudo service nginx restart`
