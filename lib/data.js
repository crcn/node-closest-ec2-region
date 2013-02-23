var fs = require("fs");

function _load(path) {
  var content = fs.readFileSync(path, "utf8");

  return content.split(/[\n\r]+/g).map(function(line) {
    var parts = line.split(";");
    return {
      code: parts[0],
      name: parts[1],
      region: parts[2]
    };
  })
};


["countries", "usa"].forEach(function(name) {
  exports[name] = function() {
    return _load(__dirname + "/data/" + name + ".index");
  };
});