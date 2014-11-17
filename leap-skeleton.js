
var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];

// Store frame for motion functions
var previousFrame = null;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;


$(document).on("frame", function( event, frame, previousFrame ) {

	// Frame motion factors
	if (previousFrame && previousFrame.valid) {
		var translation = frame.translation(previousFrame);
		var rotationAxis = frame.rotationAxis(previousFrame);
		var rotationAngle = frame.rotationAngle(previousFrame);
		var scaleFactor = frame.scaleFactor(previousFrame);
	}
	
	if(typeof logFrame !== "undefined" )
		logFrame(event,frame,previousFrame,translation,rotationAxis,rotationAngle,scaleFactor);

});

$(document).on("hand", function( event, hand, previousFrame ) {

	// Hand motion factors
	if (previousFrame && previousFrame.valid) {
		var translation = hand.translation(previousFrame);
		var rotationAxis = hand.rotationAxis(previousFrame, 2);
		var rotationAngle = hand.rotationAngle(previousFrame);
		var scaleFactor = hand.scaleFactor(previousFrame);
	}

	// IDs of pointables associated with this hand
	if (hand.pointables.length > 0) {
		var fingerIds = [];
		for (var j = 0; j < hand.pointables.length; j++) {
			var pointable = hand.pointables[j];
			fingerIds.push(pointable.id);
		}
	}
	
	if(typeof logHand !== "undefined" )
		logHand(event,hand,previousFrame,translation,rotationAxis,rotationAngle,scaleFactor);
	
});

$(document).on("hands", function( event, hands, previousFrame ) {

	if( hands.length < 1){
		$(document).trigger("no-hands",[previousFrame]);
		return;
	}

	for (var i = 0; i < hands.length; i++) {
		var hand = hands[i];
		$(document).trigger("hand",[hand,previousFrame]);
	}
	
	if(typeof logHands !== "undefined" )
		logHands(event,frame,previousFrame,translation,rotationAxis,rotationAngle,scaleFactor);

});

Leap.loop(controllerOptions, function(frame) {

	$(document).trigger("frame",[frame,previousFrame]);
	$(document).trigger("hands",[frame.hands,previousFrame]);

	// Display Pointable (finger and tool) object data
	if (frame.pointables.length > 0) {
		for (var i = 0; i < frame.pointables.length; i++) {
			if (frame.pointables[i].tool)
				$(document).trigger("pointable-tool",[frame.pointables[i]]);
			else
				$(document).trigger("pointable-finger",[frame.pointables[i]]);
		}
	}

	// Display Gesture object data
	if (frame.gestures.length > 0) {
		for (var i = 0; i < frame.gestures.length; i++) {
			$(document).trigger("gesture",[frame.gestures[i]]);

			switch (frame.gestures[i].type) {
				case "circle":
					$(document).trigger("gesture-circle",[frame.gestures[i]]);
					break;
				case "swipe":
					$(document).trigger("gesture-swipe",[frame.gestures[i]]);
					break;
				case "screenTap":
					$(document).trigger("gesture-screenTab",[frame.gestures[i]]);
					break;
				case "keyTap":
					$(document).trigger("gesture-circle",[frame.gestures[i]]);
					break;
				default:
					$(document).trigger("gesture-unknown",[frame.gestures[i]]);
			}
		}
	}

	// Store frame for motion functions
	previousFrame = frame;
})

function vectorToString(vector, digits) {
	if (typeof digits === "undefined") {
		digits = 1;
	}
	return "(" + vector[0].toFixed(digits) + ", "
	+ vector[1].toFixed(digits) + ", "
	+ vector[2].toFixed(digits) + ")";
}
