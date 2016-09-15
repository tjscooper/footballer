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

Git commit and push

*server*

Pull latest and then run `npm install` from the project root

Restart the app `pm2 list` to get the app index, then `npm restart 0` (if 0 is index)

*server logs*

app output `tail -f /root/.pm2/logs/footballer-out.log`

errors `tail -f /root/.pm2/logs/footballer-error.log`
