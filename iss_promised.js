const request = require('request-promise-native');

const fetchMyIP = () => {
    return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (body) {
    const IP = JSON.parse(body).ip;
    return request(`https://ipvigilante.com/${IP}`);
};
const fetchISSFlyOverTimes = (data) => {
    const { latitude, longitude } = JSON.parse(data).data;   
    return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
};
const nextISSTimesForMyLocation = () => {
    return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
        const { response } = JSON.parse(data);
        return response;
    });
};

module.exports = {
    nextISSTimesForMyLocation
}