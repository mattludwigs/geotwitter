var OAuth = require("oauth").OAuth;

module.exports = {

  importConfig: function importConfig (config) {
    this.config = config;
    if (!this.secretToken) {
      this.secretToken = this.config.twitterAuth.accessTokenSecret;
    }
    if (!this.accessToken) {
      this.accessToken = this.config.twitterAuth.accessToken;
    }
    return this;
  },

  getNewOAuth: function getNewOAuth () {
    this.oa = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      this.config.twitterAuth.consumerKey,
      this.config.twitterAuth.consumerSecret,
      "1.0A",
      this.config.twitterAuth.callbackUrl,
      "HMAC-SHA1"
    );

    return this;
  },

  get: function get (url, cb) {
    this.oa.get(url,
      this.accessToken,
      this.secretToken,
      function (err, data) {
        cb(err, data);
      }
    )
  }


};