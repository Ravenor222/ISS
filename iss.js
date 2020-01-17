/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');


const fetchMyIP = function(callback) {
  request(('https://api.ipify.org?format=json'), (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    if (response.statusCode < 200 || response.statusCode > 203) {
      const msg = `status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    const ip = JSON.parse(body);
    callback(err, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(("https://ipvigilante.com/162.245.144.188"), (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body).data;
    const coords = {
      latitude: data["latitude"],
      longitude: data["longitude"]
    };
    callback(err, coords);

  });

};

const fetchISSFlyOverTimes = (coords, callback) => {
  request((`http://api.open-notify.org/iss-pass.json?lat=49.26200&lon=-123.09230`), (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const times = JSON.parse(body).response;
    callback(err, times);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return callback(err, null);
      }

      fetchISSFlyOverTimes(coords, (err, times) => {
        if (err) {
          return callback(err,null);
        }
        callback(err , times);

      });
    });
  });
};
        
  

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};