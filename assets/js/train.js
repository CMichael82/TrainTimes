// Initialize Firebase
var config = {

	apiKey: "AIzaSyCD90HUBJ-fMj70oYrUAwYgsYQ1JhpK2SI",
	authDomain: "trainscheduler-8553b.firebaseapp.com",
	databaseURL: "https://trainscheduler-8553b.firebaseio.com",
	projectId: "trainscheduler-8553b",
	storageBucket: "trainscheduler-8553b.appspot.com",
	messagingSenderId: "754142041433"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {

	//prevent form from "submitting"
	event.preventDefault();
	//assign inputs to JS variables
	$trainName = $("#nameInput").val().trim();
	$destination = $("#destInput").val().trim();
	$startTime = $("#timeInput").val().trim();
	$frequency = $("#freqInput").val().trim();

	//create an object for the new train input
	var newTrain = {
		trainName: $trainName,
		destination: $destination,
		startTime: $startTime,
		frequency: $frequency
	}
	console.log (newTrain.trainName +": First Train Out: " + newTrain.startTime);
	//push new train info into Firebase
	database.ref().push(newTrain);

	//clear input fields in DOM
	$("#nameInput").val("");
	$("#destInput").val("");
	$("#timeInput").val("");
	$("#freqInput").val("")
});

//Create an event Listener in Firebase for adding a new train
database.ref().on("child_added", function (addedTrain) {

	var $trainName = addedTrain.val().trainName;
	var $destination = addedTrain.val().destination;
	var $startTime = addedTrain.val().startTime;
	var $frequency = addedTrain.val().frequency;

//Determine when the next train will arrive and how many minutes away
	var startConverted = moment($startTime, "HH:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDiff = moment().diff(moment(startConverted), "minutes");
	var timeRemainder = timeDiff % $frequency;
	var minsAway = $frequency - timeRemainder;
	var nextArrival = currentTime.add(minsAway, "minutes").format("LT");
	
//Add data to a new row
	var newRow = $("<tr>").append(
		$("<td>").text($trainName),
		$("<td>").text($destination),
		$("<td>").text( moment(startConverted).format("LT")),
		$("<td>").text($frequency),
		$("<td>").text(nextArrival),
		$("<td>").text(minsAway),
		)
//Add the new row to the table body
	$("tbody").append(newRow);

//Console log for possible bugs
	console.log ("TRAIN: " + $trainName);
	console.log("Start Time: " + moment(startConverted).format("hh:mm"));
	console.log("Current Time: " + moment().format("hh:mm"));
	console.log ("Time Passed from Start: " + timeDiff);
	console.log("Remainder: " + timeRemainder);
	console.log("Minutes Away: " + minsAway);
	console.log("Arrival Time: " + nextArrival);

}, 
//create a function to check for errors
function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

