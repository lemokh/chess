function toggleClocks() {

	clearInterval(runTimer);
	
	if (activeSide[0].dataset.side === 'blue') {	
		obj = blueTime;
		clockToUpdate = clock1;
	}
	else { 
		obj = orangeTime;
		clockToUpdate = clock2;
	}

	function startClock() {
		runTimer = setInterval(countDown, 1000);
	};
	
	startClock();
}