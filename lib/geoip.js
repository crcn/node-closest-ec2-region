var geoip = require("geoip");

module.exports = function(options) {

  var city      = new geoip.City(options.cityDataPath || __dirname + "/geoip/city.dat");

  return {
    lookup: function(ip, callback) {
      city.lookup(ip, function(err, cityData) {
        
        if(err) return callback(err);

        callback(null, {
          country: cityData.country_code,
          region: cityData.region,
          ll: [cityData.latitude, cityData.longitude]
        });
      });
    }
  }
}
