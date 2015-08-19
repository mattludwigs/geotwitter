"use strict";

/**
 * @module
 * @name GeoTwitter
 * @author Matt Ludwigs
 */
angular.module("GeoTwitter", [
  "ui.router",
  "uiGmapgoogle-maps",
  "smoothScroll",
  "gt.twitter",
  "gt.gmaps",
  "gt.searchBox"
])

  /**
   * @config
   * @description
   * Set up ui router and ui google map api version
   */
  .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

    uiGmapGoogleMapApiProvider.configure({
      v: "3.17"
    });

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("app", {
        url: "/",
        controller: "GTSearchController",
        templateUrl: "/views/app.html"
      });

  })

  /**
   * @name GTSearchController
   * @description
   * Controller for the main app view
   */

  .controller("GTSearchController", function ($scope, twApiService, $timeout, GMapsService) {

    $scope.clearCurrentTweet = function clearCurrentTweet () {
      if ($scope.currentTweet) {
        $scope.currentTweet = "";
      }
    };

    $scope.markerClickEvent = function (event, marker, tweet) {
      GMapsService.map.panTo(marker.getPosition());

      $timeout(function () {
        GMapsService.map.setZoom(5);
      }, 500);

      $scope.currentTweet = tweet;
    };

    $scope.getRecent = function getRecent (searchTerm) {
      GMapsService.map.setZoom(2);
      GMapsService.clearAllMarkers();
      $scope.clearCurrentTweet();

      twApiService.getRecent(searchTerm)
        .then(function (res) {
          $scope.tweets = res.data;
          $scope.tweets.forEach(function (tweet) {
            GMapsService.setMarker(tweet, $scope.markerClickEvent);
          });
        });

    };

    $scope.map = {
      center: {
        latitude: 32.751673,
        longitude: -114.765493
      },
      zoom: 2,
      events: {
        tilesloaded: function (map) {
          $scope.$apply(function () {
            GMapsService.setMap(map);
          });
        }
      }
    };


  });