// begin Train app; 
// get user input from a web form
// save user data to a Firebase DB
// calculate stuff
// retrieve calc and data
// display new info to users

// **** reference js file in HTML *****
    
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyBmRaO8Q6_ys3lG00udeoEZ6QSu_JTkeOY",
        authDomain: "train-1234.firebaseapp.com",
        databaseURL: "https://train-1234.firebaseio.com",
        projectId: "train-1234",
        storageBucket: "",
        messagingSenderId: "147546853230"
    };

// init Firebase
    firebase.initializeApp(config);

// Create a variable to reference the database
    var database = firebase.database();



    $(document).ready(function() {
        // initial variables
        var firstTrain; // date-time for the first train
        var firstTrainMin; // minutes parsed from firstTrain
        var intervalTrain; // how long between trains
        var minutesAway; // how long until next train (CALCULATED)
        var trainName = []; // train names array to store data from users
        var destination = []; // array for user-entered destination names
        var nextArrival; // date-time (CALCULATED)
        var now; // current time
        var nowMin; // current time, parsed for minutes only
        var remainder; // leftover for math functions
        var tDiff; // difference between interval & now (minutes)
        var nextArrivalMin; // next arrival time, parsed for minutes


        // set current time in header
        var updateNow = function() {
            now = moment().format('MMM DD HH:mm:ss');
            $("#current-time").html(now);            
            setInterval(updateNow, 1000);
            //return now;
            
        }

        updateNow();

        var calcNext = function () {
            var currentTime = moment().format('MMM DD HH:mm:ss');
            firstTrainMin = parseInt(moment(firstTrain,'hh:mm').format('mm')); // first Train in integer minutes
            //console.log(typeof(firstTrain));
            console.log("first train in minutes: " + firstTrainMin);
            nowMin = parseInt(moment(currentTime).format('mm'));  // now in interger minutes
            console.log("now in minutes: " + nowMin);


            // difference in integer minutes between now and firstTrain
            tDiff = (nowMin - firstTrainMin);
            console.log("difference: " + tDiff);

            // modulus of difference and interval
            remainder = (tDiff % intervalTrain);
            console.log("remainder: " + remainder);

            // calculated values
            minutesAway = (intervalTrain - remainder);
            console.log("minutes away: " + minutesAway)

            nextArrivalMin = (nowMin + minutesAway);
            console.log("next arrival in min: " + nextArrivalMin)

            var tTime = moment().format('HH:mm');
            nextArrival = moment(tTime,'HH:mm').add(nextArrivalMin,'minutes');
            //alert(nextArrival);

        }       
        
                      
        // ADD button handler        
        $("#add").on("click", function() {
            // don't refresh the page
            event.preventDefault();

            // get user inputs
            trainName = $("#trainName").val().trim();
            destination = $("#destination").val().trim();
            firstTrain = $("#start-time").val().trim();
            intervalTrain = $("#frequency").val().trim();
            //console.log(trainName);
            //console.log(destination);
            //console.log(firstTrain);
            //console.log(intervalTrain);

            calcNext();
            console.log("after function (minutesAway): " + minutesAway);
            console.log("after function (nextArrivalMin): " + nextArrivalMin);
            //console.log("after function (nextArrival): " + nextArrival);
            console.log(nextArrival.format('HH:mm'));
            alert(nextArrival);

            //database.ref().push({
            //    trainName: trainName,
            //    destination: destination,
            //    firstTrain: firstTrain,
            //    frequency: intervalTrain,
                // minutesAway: minutesAway,
                // nextArrival: nextArrival,
            //    dateAdded: firebase.database.ServerValue.TIMESTAMP
            //});
        

        })
        
  
      });