var soundentity = null;
var isTargetFound = false;
var interacted = false;
var dino = null;

/* function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

document.getElementById("banner-section").style.display = "none";
	document.getElementById("initial-banner-section").style.display = "block";		
	sleep(6000);
document.getElementById("msg").innerHTML  = "hi none";
	document.getElementById("banner-section").style.display = "block";
*/ 

AFRAME.registerComponent("markerhandler",{
	init:function() {
		console.log('markerhandler-init');
		
		 markerObj = document.querySelector('a-marker');
		 markerObj.hidden = true;

		 soundentity = document.querySelector('[sound]');

	     dino = document.querySelector('#animated-dino');
		 dino.object3D.visible = false;
	document.getElementById("msg").innerHTML  = "hi none";
		 //dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
	},

	tick:function() {

			if (markerObj != null)
        	{
	          	if (markerObj.object3D.visible == true) {
	          		if (isTargetFound)
	          			return;

	          		isTargetFound = true;
	          		console.log ("marker visible");
					document.getElementById("banner-section").style.display = "none";

					dino.object3D.visible = true;
	          	//	if (interacted)
	          	//	{
	          			soundentity.components.sound.playSound();
		 				dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
	          	//	}

	          	}
	          	else {
	          		if (!isTargetFound)
	          			return;

	          		isTargetFound = false;
					console.log ("marker invisible");
					document.getElementById("banner-section").style.display = "block";

	          		dino.object3D.visible = false;
				//	if (interacted)
				//	{
	          		//	soundentity.components.sound.stopSound();
				//	}

	          	}
	          }
		}
	});

AFRAME.registerComponent('dinoInteractionListener', {
	init: function () {
			if (dino == null)
				dino = document.querySelector('#animated-dino');
	        dino.addEventListener('touchstart', function(ev){
	        	//console.log('touched at - ', ev.detail.intersection.object);
				interacted = true;

				soundentity.components.sound.playSound();
				dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
	        });
	    }
	});
