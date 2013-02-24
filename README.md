### Dependencies

- libgeoip

```bash
brew install libgeoip
```

### JS Example

```javascript
closestEC2Region = require("closest-ec2-region")();

var ip = "xxx.xxx.xx.xx";

closestEC2Region(ip, function(err, regionName) {
    
});
```

### Express Example

```javascript

var express = require("express"),
closestEC2Region = require("closest-ec2-region")();

var server = express();

server.get("/ec2/region", function(req, res) {
  closestEC2Region(req, function(err, region) {
    res.end(region);
  });
});

```

### Custom Geo data

```javascript
closestEC2Region = require("closest-ec2-region")({
  cityDataPath: "/path/to/city/data"
});

var ip = "xxx.xxx.xx.xx";

closestEC2Region(ip, function(err, regionName) {
    
});
```


### With [node-ectwo](http://github.com/crcn/node-ectwo)

```javascript

closestEC2Region(ip, function(err, regionName) {
  ectwo.regions.findOne({ name: regionName || "us-east-1" }, function(err, region) {
    //do stuff with the target region
  });
});
