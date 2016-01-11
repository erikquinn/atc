function weather_init() {
	// airport_get().wind.profile = generateWindProfile();
}

function weather_update() {
	updateWind();
}

function generateWindProfile() {
	var windByMin = [];
	windByMin.push(airport_get().wind);

	var basis = airport_get().wind;
	var avg_min_chg = 0.065;
	var variance = 0.0075;
	var std_dev = Math.sqrt(variance) / 2;
	var drift_dir = 0.0005 * (.5-Math.random()) * (Math.pow(15,3) / Math.pow(basis.angle,3));
	var drift_spd = 0.0005 * (.5-Math.random()) * (Math.pow(15,3) / Math.pow(basis.speed,3));
	var last = basis;
	
	for(var i=1; i<180; i++) {	//generates 180min (3h) of wind
		var dir = last.angle * Math.exp(drift_dir + std_dev*(normSInv(Math.random())));
		var spd = last.speed * Math.exp(drift_spd + std_dev*(normSInv(Math.random())));
		var wind = {"angle": dir, "speed": spd};
		windByMin.push(wind);
	}
	return windByMin;
	confirm("did it");
}

function updateWind() {
	airport_get().setWind(airport_get().wind.profile[Math.floor(prop.game.time/60)]);
}