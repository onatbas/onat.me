
	var maxSpeed = 220;
	var running = false;
	var speed = 0;
	var degrees = 0;
	var accelerating = false;
	var looper;

	function beginTurning() {

		if (!accelerating) {
			speed = speed * 0.9;
		} else {
			speed += 1;
			speed = speed > maxSpeed ? maxSpeed : speed;
		}

		degrees = (degrees + speed) % 360;

		var elem = document.getElementById("blue");
		elem.style.webkitTransform = 'rotate(' + degrees + 'deg)';
		elem.style.mozTransform = 'rotate(' + degrees + 'deg)';
		elem.style.msTransform = 'rotate(' + degrees + 'deg)';
		elem.style.oTransform = 'rotate(' + degrees + 'deg)';
		elem.style.transform = 'rotate(' + degrees + 'deg)';

		looper = setTimeout('beginTurning()', 30);

		if (speed < 0.1 && degrees > 0.1) {
			var suggesstedPosition = degrees - 4;
			degrees = suggesstedPosition > 0 ? suggesstedPosition : 0;
		}
	}

	function start() {
		accelerating = true;
		if (!running) {
			running = true;
			beginTurning();
		}
	}

	function stop() {
		accelerating = false;
	}