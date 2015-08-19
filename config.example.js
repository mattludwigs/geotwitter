"use strict";

module.exports = {
  "twitterAuth" : {
    // keys from https://apps.twitter.com
    consumerKey: "string",
    consumerSecret: "string",
    // If using callback add callback url, this cannot be localhost
    callbackUrl: "http://dummy.com:3000/auth/twitter/callback",
    // keys from https://apps.twitter.com
    accessToken: "string",
    accessTokenSecret: "string"
  }
};