var noble = require('noble');
var firebase = require("firebase");
var fs = require("fs");

var ESTIMOTE_FRAME_TYPE_TELEMETRY = 2;

var ESTIMOTE_TELEMETRY_SUBFRAME_A = 0;
var ESTIMOTE_TELEMETRY_SUBFRAME_B = 1;

var file = '/home/pi/Beacon_Scan/logs.txt';

firebase.initializeApp({
	serviceAccount: "service_Creds.json",
	databaseURL: "https://YOUR_APP_HERE.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref("logs");
var beaconRef = ref.child("Beacon Movement");




noble.on('stateChange', function (state) {
	console.log('state has changed', state);
	if (state == 'poweredOn') {
		var serviceUUIDs = ['fe9a']; // Estimote Service
		var allowDuplicates = true;
		noble.startScanning(serviceUUIDs, allowDuplicates, function (error) {
			if (error) {
				console.log('error starting scanning', error);
			} else {
				console.log('started scanning');
				console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
			}
		});
	}
});

noble.on('discover', function (peripheral) {
	var data = peripheral.advertisement.serviceData.find(function (el) {
		return el.uuid == 'fe9a';
	}).data;

	var frameType = data.readUInt8(0) & 0b00001111;
	if (frameType != ESTIMOTE_FRAME_TYPE_TELEMETRY) {
		return;
	}

	var protocolVersion = (data.readUInt8(0) & 0b11110000) >> 4;
	// firmware version 4.5.0 and later broadcast protocol version 0
	// for firmware version >= 4.0.0 && < 4.5.0, use protocol version 1
	if (protocolVersion != 1) {
		return;
	}

	var shortIdentifier = data.toString('hex', 1, 9);

	var subFrameType = data.readUInt8(9) & 0b00000011;
	if (subFrameType == ESTIMOTE_TELEMETRY_SUBFRAME_A) {

		var isMoving = (data.readUInt8(15) & 0b00000011) == 1;

		var indvRef = beaconRef.child(shortIdentifier);


        // Here is push up to Firebase
       if(isMoving == true){
       	indvRef.push({
		    time_Stamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            moved: isMoving});

		   var obj = JSON.stringify({Beacon: shortIdentifier,
			   time_Stamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
			   Moved: isMoving}) + "/n";

		fs.appendFile(file,obj,function (err) {
			if (err) throw err;

		});

       }

	} else if (subFrameType == ESTIMOTE_TELEMETRY_SUBFRAME_B) {

	}
});

