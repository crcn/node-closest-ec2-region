var net = require("net");

exports.getIp = function(data) {
  if(typeof data === "string" && net.isIP(data)) {
    return getIpFromString(data);
  } else 
  if(typeof data === "object") {
    if(data.headers) {
      return getIpFromReq(data);
    }
  }

  return false;
}


function getIpFromReq(req) {
  return req.headers["X-Forwarded-For"] || req.connection.removeAddress;
}

function getIpFromString(str) {
  return str;
}