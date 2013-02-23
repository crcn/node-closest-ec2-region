### Dependencies

- libgeoip

```bash
brew install libgeoip
```

### JS Example

```javascript
whichRegion = require("whichRegion")();

var ip = "xxx.xxx.xx.xx";

whichRegion(ip, function(err, regionName) {
    
});
```

### Express Example

```javascript

var express = require("express"),
whichRegion = require("whichregion")();

var server = express();

server.get("/ec2/region", function(req, res) {
  whichRegion(req, function(err, region) {
    res.end("region");
  });
});

