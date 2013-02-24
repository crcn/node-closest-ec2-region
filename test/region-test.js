var whichRegion = require("../")(),
express = require("express"),
expect = require("expect.js"),
comerr = require("comerr"),
request = require("request");

describe("whichregion", function() {

  var server, port = 80321;

  before(function() {
    server = express();

    server.get("/findIp", function(req, res) {
      whichRegion(req, function(err, region) {
        if(err) return res.end("err");
        res.end(region);
      });
    });

    server.listen(port);
  });

  /*it("should be able to find a region", function(done) {

  });*/

  it("should should return an invalid error", function(done) {
    whichRegion("abcde", function(err, region) {
      expect(err).to.be.an(comerr.IncorrectType);
      done();
    });
  });

  it("should not be able to find IP", function(done) {
    whichRegion("0.0.0.0", function(err, region) {
      expect(err).to.be.an(Error);
      done();
    });
  });

  var ipTests = {
    "95.211.99.12": {
      name: "Netherlands",
      region: "eu-west-1",
    },
    "189.22.119.130": {
      name: "Brazil",
      region: "sa-east-1",
    },
    "110.229.209.69": {
      name: "China",
      region: "ap-northeast-1",
    },
    "118.96.14.228": {
      name: "Indonesia",
      region: "ap-southeast-1"
    },
    "178.18.17.211": {
      name: "USA",
      region: "us-east-1"
    },
    "199.21.86.118": {
      name: "Philz Coffee SF",
      region: "us-west-1"
    },
    "89.218.0.50": {
      name: "Kazakhstan",
      region: "eu-west-1"
    },
    "66.241.75.22": {
      name: "Oregon",
      region: "us-west-2"
    },
    "67.199.155.0": {
      name: "Vermont",
      region: "us-east-1"
    },
    "12.73.128.0": {
      name: "Minneapolis",
      region: "us-east-1"
    },
    "117.120.18.134": {
      name: "Australia",
      region: "ap-southeast-2"
    },
    "190.5.208.0": {
      name: "Costa Rica",
      region: "us-east-1"
    },
    "181.114.232.0": {
      name: "Chile",
      region: "sa-east-1"
    }
  }

  /**
   */

  Object.keys(ipTests).forEach(function(ip) {
    var info = ipTests[ip];

    it(info.name + " IP should point correct region", function(done) {
      whichRegion(ip, function(err, region) {
        if(err) return done(err);
        expect(region).to.be(info.region);
        done();
      });
    });
  });


  /**
   */


  it("can fetch region from express route, but error because of local ip", function(done) {
    request.get("http://localhost:" + port + "/findIp", function(err, request, body) {
      expect(body).to.be("err");
      done();
    });
  });

});