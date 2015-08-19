"use strict";

/**
 * @module
 * @name gt.displayTweet
 * @author Matt Ludwigs
 */

angular.module("gt.displayTweet", [
  "gt.gmaps"
])
  /**
   * @name displayTweets
   * @description
   *
   */
  .directive("displayTweets", function (GMapsService) {

    return {
      restrict: "AE",
      templateUrl: "/views/ui/display-tweet/displayTweets.tpl.html",
      scope: {
        tweets: "=",
        currentTweet: "="
      },
      link (scope) {
        scope.showAll = function showAll () {
          scope.currentTweet = null;
          GMapsService.map.setZoom(2);
          GMapsService.map.panTo({lat: 32.751673, lng:-114.765493});
        };
      }
    }
  });

