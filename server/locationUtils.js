"use strict";


module.exports = {

  isCountry: function isCountry (data) {
    return data.country === data.name;
  },

  setCountry: function setCountry (trends, data, country) {
    trends[country].woeid = data.woeid;
  },

  setCity: function setCity (data, city, cb) {
    city.name = data.name;
    city.woeid = data.woeid;
    cb();
  },

  setCountryData: function setCountryData (collection, data, country, city, cb) {
    if (this.isCountry(data)) {
      this.setCountry(collection, data, country)
    } else {
      this.setCity(data, city, cb);
    }
  }


};

