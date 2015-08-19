# GeoTwitter

## Minimum Requirements

1. Node v.0.10.x
2. Gulp
3. bower

If you do not have numbers two and/or three follow the following steps.

```
npm install -g gulp
npm install -g bower
```

## Local Development

### Clone

```
git clone https://github.com/mattludwigs/geotwitter.git
```

### Npm

```
npm install
```

### Bower

```
bower install
```

### Config

Look at the config.example.js file. This is the data the app needs to run since twitter api using oauth. Go to
[Twitter Apps](https://apps.twitter.com/) to register to get your keys. Then once you have your keys you can run

```
touch config.js && cat config.example.js > config.js
```

Then fill in the properties

### Gulp

#### serve

serve is the command to run the local server with the watches on the files

```
gulp serve
```

#### production

production uglifies the js for the app and builds the out directory for us to run the server against.

```
gulp production
```