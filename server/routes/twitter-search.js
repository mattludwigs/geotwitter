/**
 * @router
 * @get /api/twitter/search/:query/:type
 * @get /api/twitter/trends/
 * @get /api/twitter/trends/:location
 */

var express = require("express"),
    auth = require("../auth"),
    locationUtils = require("../locationUtils"),
    router = express.Router(),
    trends = {};

// Every 15 minutes clear server trends cache
setInterval(function () {
    if (Object.keys(trends).length) {
      trends = {};
    }
  },
  900000);

router.get("/api/twitter/search/:query/:type", function (req, res, next) {
  var query = req.params.query,
      type = req.params.type;

  auth.get("https://api.twitter.com/1.1/search/tweets.json?q=%23" + query + "%20" + query +"&result_type=" + type,
    function (err, data) {
      if (err) {
        return next(err);
      }
      var geoTweets = [];

      JSON.parse(data).statuses.forEach(function (tweet, i) {
        var geoTweet = {};
        geoTweet.id = i + 1;
        geoTweet.location = tweet.user.location;
        geoTweet.tweet = tweet.text.replace(/&amp;/g, '&');
        geoTweet.user = tweet.user.name;
        geoTweet.image = tweet.user.profile_image_url_https;
        geoTweets.push(geoTweet);
      });

      res.json(geoTweets);

    }
  )

});

router.get("/api/twitter/trends", function (req, res, next) {

  if (!Object.keys(trends).length) {

    auth.get("https://api.twitter.com/1.1/trends/available.json", function (err, data) {
      if (err) {
        return next(err);
      }

      JSON.parse(data).forEach(function (trend) {
        var country = trend.country,
          city = {};

        if (!trends[country]) {
          trends[country] = {};
          trends[country].name = trend.country;
          trends[country].cities = [];
        } else {

          locationUtils.setCountryData(trends, trend, country, city, function () {
            trends[country].cities.push(city);
          });
        }
      });
      res.json(trends);
    });

  } else {
    res.json(trends);
  }

});


router.get("/api/twitter/trends/:location", function (req, res, next) {
  var location = req.params.location;
  auth.get("https://api.twitter.com/1.1/trends/place.json?id=" + location, function (err, data) {
    if (err) {
      return next(err);
    }
    res.json(JSON.parse(data));
  });
});

  module.exports = router;
