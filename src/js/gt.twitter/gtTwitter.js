"use strict";

/**
 * @module
 * @name gt.twitter
 * @author Matt Ludwigs
 */

angular.module("gt.twitter", [
  "gt.displayTweet"
])

  /**
   * @name twApiService
   * @description
   * makes http requests to the twitter endpoints of server
   */

  .service("twApiService", function ($http) {

    this.getRecent = function getRecent (query) {
      return $http.get(`/api/twitter/search/${query}/recent`);
    };

    this.getTrends = function getTrends () {
      return $http.get(`/api/twitter/trends`);
    };

    this.getTrendsByLocation = function getTrendsByLocation (location) {
      return $http.get(`/api/twitter/trends/${location}`);
    };


  });



