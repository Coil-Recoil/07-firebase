//Firebase

var config = {
	apiKey: "AIzaSyBhvDWxzgJSUD0VuEd4bszwgflEB5KpvSg",
	authDomain: "new-test-820ea.firebaseapp.com",
	databaseURL: "https://new-test-820ea.firebaseio.com",
	projectId: "new-test-820ea",
	storageBucket: "new-test-820ea.appspot.com",
	messagingSenderId: "152776526119"
};
firebase.initializeApp(config);

//Declare Variables

var dataRef = firebase.database();
var name = "";
var destination = "";
var frequency = 0;
var next = 0;
var minutes = 0;

// Click Function

$('.btn').on('click', function () {
	console.log("Submit Clicked")
	var newName = $("#newName").val().trim();
	var newDest = $("#newDestination").val().trim();
	var newTime = $("#newTime").val().trim();
	var newFreq = $("#newFreq").val().trim();


	newTime = moment(moment(newTime, "hh:mm A").subtract(1, "years"), "hh:mm").format("hh:mm A");

	dataRef.ref().push({
		name: newName,
		dest: newDest,
		start: newTime,
		freq: newFreq,
	})


	$("#newName").val("");
	$("#newDestination").val("");
	$("#newTime").val("");
	$("#newFreq").val("");

	return false;
});

dataRef.ref().on("child_added", function (childSnapshot, prevChildKey) {


	var name = childSnapshot.val().name;
	var dest = childSnapshot.val().dest;
	var start = childSnapshot.val().start;
	var freq = childSnapshot.val().freq;


	// Arrival Calculations
	var timeDifference = moment().diff(moment(start, "hh:mm A"), 'm');
	var timeRemaining = timeDifference % freq;
	var timeMinsAway = freq - timeRemaining;


	var timeNext = moment().add(timeMinsAway, 'm');



	var next = moment(timeNext).format("hh:mm A");
	console.log("Formatted minutes: " + next);
	var away = timeMinsAway;
	console.log("Minutes away: " + away);


	$("#trainresults").append(
		"<tr><td>" + name +
		"</td><td>" + dest +
		"</td><td>" + freq +
		"</td><td>" + next +
		"</td><td>" + away +
		"</td></tr>");

}, function (errorObject) {
	console.log(errorObject.code)

}); 