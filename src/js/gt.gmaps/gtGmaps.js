"use strict";

/**
 * @module
 * @name tw.gmaps
 * @author Matt Ludwigs
 */

angular.module("gt.gmaps", [])

  /**
   * @name GMpsService
   * @description
   * A service to provide some lower level google maps api
   *  functionally that the ui.gmap did not provide
   */
  .service("GMapsService", function (MarkerFactory) {

    this.geocoder = new google.maps.Geocoder();
    this.markers = [];

    this.setMap = function setMap (map) {
      this.map = map;
    };

    this.setMarker = function setMarker (data, eventListener) {
      if (this.markers.length) {
        this.clearAllMarkers();
      }

      this.geocoder.geocode({
        address: data.location
      }, function (res, status) {

        if (status === google.maps.GeocoderStatus.OK) {

          let marker = MarkerFactory.makeMarker(this.map, res[0].geometry.location, true);

          marker.addListener("click", function () {
            eventListener("click", marker, data);
          });

          this.markers.push(marker);
        } else {
          // TODO: error handle
        }

      }.bind(this));

    };

    this.clearAllMarkers = function clearAllMarkers () {
      if (this.markers.length) {
        let len = this.markers.length;
        for (let i = 0; i < len; i++) {
          this.markers[i].setMap(null);
        }
      }
    };

  })

  /**
   * @name MarkerFactory
   * @description
   * A factory to make google map markers
   */

  .factory("MarkerFactory", function () {

    return {
      /**
       * makeMarker
       * @param mapInstance {Object}
       * @param position {Object}
       * @param drop {Boolean}
       */
      makeMarker (mapInstance, position, drop) {
        let markerConfig = {
          map: mapInstance,
          position: position
        };
        if (drop) {
          markerConfig.animation = google.maps.Animation.DROP
        }
        return new google.maps.Marker(markerConfig);
      }
    };

  });

