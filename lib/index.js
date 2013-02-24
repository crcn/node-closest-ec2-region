var ipFactory = require("./ipFactory"),
comerr        = require("comerr"),
sift          = require("sift"),
data          = require("./data"),
initGeoip     = require("./geoip"),
countries     = data.countries(),
usa           = data.usa();



module.exports = function(options) {

  var geoip = initGeoip(options || {});

  return function(ip, defaultRegion, callback) {

    if(arguments.length === 2) {
      callback = defaultRegion;
      defaultRegion = undefined;
    }

    var realIp = ipFactory.getIp(ip);
    if(!realIp) return callback(new comerr.IncorrectType("ip " + ip + " is invalid"));


    geoip.lookup(realIp, function(err, geo) {

      if(err) return callback(err);

      var results;
      if(geo.country == "US") {
        results = sift({ code: geo.region }, usa);
      } else {
        results = sift({ code: geo.country }, countries);

      }

      if(!results.length) {
        //sometimes it's necessary to always return a region - do it here.
        if(defaultRegion) {
          return callback(null, defaultRegion);
        }

        return callback(new comerr.NotFound("Unable to find data center"));
      }
      

      callback(null, results.shift().region);
    });
    
  }
}




