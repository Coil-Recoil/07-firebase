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
	var addName = $("#addName").val().trim();
	var addDest = $("#addDestination").val().trim();
	var addTime = $("#addTime").val().trim();
	var addFreq = $("#addFreq").val().trim();


	addTime = moment(moment(addTime, "hh:mm A").subtract(1, "years"), "hh:mm").format("hh:mm A");

	dataRef.ref().push({
		name: addName,
		dest: addDest,
		start: addTime,
		freq: addFreq,
	})

	$("#addName").val("");
	$("#addDestination").val("");
	$("#addTime").val("");
	$("#addFreq").val("");

	return false;
});

dataRef.ref().on("child_added", function (childSnapshot, prevChildKey) {

	var name = childSnapshot.val().name;
	var dest = childSnapshot.val().dest;
	var start = childSnapshot.val().start;
	var freq = childSnapshot.val().freq;

	// Arrival Calculations

	var timeDiff = moment().diff(moment(start, "hh:mm A"), 'm');
	var timeNext = timeDiff % freq;
	var timeAway = freq - timeNext;
	var timeNext = moment().add(timeAway, 'm');
	var next = moment(timeNext).format("hh:mm A");
	var away = timeAway;

	$("#trainresults").append(
		"<tr><td>" + name +
		"</td><td>" + dest +
		"</td><td>" + freq +
		"</td><td>" + next +
		"</td><td>" + away +
		"</td></tr>");
},
); 