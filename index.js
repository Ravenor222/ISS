// Fetch our IP Address
// Fetch the geo coordinates (Latitude & Longitude) for our IP
// Fetch the next ISS flyovers for our geo coordinates
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');



//  fetchMyIP((error, ip) => {
//    if (error) {
//      console.log("It didn't work!" , error);
//      return;
//    }
//    console.log('It worked! Returned IP:' , ip.ip);

//  });

//////////////////////////////////

//    fetchCoordsByIP(("162.245.144.188"), (err, coords)=>{
//      if (err) {
//        console.log("It didn't work!" , err);
//        return;
//      }
//        console.log(`It worked! Your coordinates are : ,${coords}`);

//    });

    // fetchISSFlyOverTimes({latitude: '49.26200', longitude: '-123.09230' }, (err, times) => {
    //  if(err) {
    //    console.log("It didn't work! : ", err);
    //    return;
    // }
    //    console.log(times);

    // });
     const printPassTimes = function(passTimes) {
         for (const pass of passTimes) {
           const datetime = new Date(0);
           datetime.setUTCSeconds(pass.risetime);
           const duration = pass.duration;
           console.log(`Next pass at ${datetime} for ${duration} seconds!`);
         }
       };

    nextISSTimesForMyLocation((err, times) => {
        if(err) { 
            return console.log("it didnt(really) work!:", err)
    }
        //console.log(times);
     printPassTimes(times)
    })
