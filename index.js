const { Neurosity } = require("@neurosity/sdk");
require("dotenv").config();

const deviceId = process.env.DEVICE_ID || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";

const verifyEnvs = (email, password, deviceId) => {
    const invalidEnv = (env) => {
      return env === "" || env === 0;
    };
    if (invalidEnv(email) || invalidEnv(password) || invalidEnv(deviceId)) {
      console.error(
        "Please verify deviceId, email and password are in .env file, quitting..."
      );
      process.exit(0);
    }
};

verifyEnvs(email, password, deviceId);
  
console.log(`${email} attempting to authenticate to ${deviceId}`);

const neurosity = new Neurosity({
    deviceId
});


/*
const fs = require('fs');

const content = ' ';

fs.writeFile("textVals.json", content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
*/


var myListbrainwaves = [];
var brainwavesTimes = [];
var brainwavesDataFiltered = [];
var brainwavesDataUnfiltered = [];
var stdevsigqual = [];

const main = async () => {
    await neurosity
      .login({
        email,
        password
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
    console.log("Logged in");

    
    // Getting the raw filtered brainwaves
    neurosity.brainwaves("raw").subscribe((brainwaves) => {
        console.log("Raw Filtered");
        //console.log(brainwaves);
        
        brainwavesDataFiltered.push(brainwaves.data)
        brainwavesTimes.push(brainwaves.info.startTime)
        var conv = brainwaves.info.startTime - brainwavesTimes[0]

        if (conv > 120000 && conv < 121000) {
          console.log(conv);
          var fs = require('fs');
          fs.writeFile("testValsRawFiltered7NF.json", String(brainwavesDataFiltered), function(err) {
            if (err) {
                console.log(err);
            }
          });
        }
      });


    // Getting the raw unfiltered brainwaves  
    neurosity.brainwaves("rawUnfiltered").subscribe((brainwaves) => {
        console.log("Raw Unfiltered");
      
        myListbrainwaves.push(brainwaves)
        brainwavesTimes.push(brainwaves.info.startTime)
        brainwavesDataUnfiltered.push(brainwaves.data)
        var conv = brainwaves.info.startTime - brainwavesTimes[0]
             
        if (conv > 120000 && conv < 121000) {
          console.log(conv);
          var fs = require('fs');
          fs.writeFile("testValsRawUnFiltered7NF.json", String(brainwavesDataUnfiltered), function(err) {
            if (err) {
                console.log(err);
            }
          });
        }
        
        if (conv > 121000){
          console.log("stop")
        }        
    });  

    
    // Getting the timepoints for each data point
        /*
        var jsonDataTimes = JSON.stringify(brainwavesTimes);
        console.log(jsonDataTimes)
            
        var fs = require('fs');
            fs.writeFile("testTimes.json", jsonDataTimes, function(err) {
              if (err) {
                  console.log(err);
              }
            });
        */
    
   
    // Channels       
    channelNames: [
      'CP3', 'C3',
      'F5',  'PO3',
      'PO4', 'F6',
      'C4',  'CP4'
    ]
    /*
    function getData(){
      return Math.random();
    }

    Plotly.plot('chart',[{
      y:[getData()],
      type: 'line'
    }])
    */


    // Outputing PSDs and Powers but not yet saving
    /*
    neurosity.brainwaves("psd").subscribe((brainwaves) => {
        console.log(brainwaves);
    });
      
    neurosity.brainwaves("powerByBand").subscribe((brainwaves) => {
        console.log("Power by Band");
        console.log(brainwaves);
      });

    */

    // Getting signal quality 
    /*
    neurosity.signalQuality().subscribe((signalQuality) => {
        console.log(signalQuality);

        stdevsigqual.push(signalQuality)
        var fs = require('fs');
        fs.writeFile("testSigQual.json", String([stdevsigqual]), function(err) {
          if (err) {
              console.log(err);
          }
        });
      });
      */


    // Outputing calm and calm.probability  
     /*      
    neurosity.calm().subscribe((calm) => {
        if (calm.probability > 0.3) {
          myList.push(calm.probability)
          //console.log(calm)
          //console.log(calm.probability)
          console.log(myList)
        }
      });
    */
    };      

main();