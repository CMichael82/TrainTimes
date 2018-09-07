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

var $trainName = "";
var $destination = "";
var $startTime = "";
var $frequency = "";

$("#submit").on("click", function (event) {

	//prevent form from "submitting"
	event.preventDefault();
	//assign inputs to JS variables
	$trainName = $("#nameInput").val().trim();
	$destination = $("#destInput").val().trim();
	$startTime = moment($("#timeInput").val().trim(), "HH:mm").format("X")
	$frequency = $("#freqInput").val().trim();

	//create an object for the new train input
	var newTrain = {
		trainName: $trainName,
		destination: $destination,
		startTime: $startTime,
		frequency: $frequency
	}

	//push new train info into Firebase
	database.ref().push(newTrain);

	console.log(newTrain.trainName);
	console.log(newTrain.destination);
	console.log(newTrain.startTime);
	console.log(newTrain.frequency);

	//clear input fields in DOM
	$("#nameInput").val("");
	$("#destInput").val("");
	$("#timeInput").val("");
	$("#freqInput").val("")
});