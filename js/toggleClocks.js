import countDown from './countDown.js';
import activeSide from './index.js';

export default function toggleClocks() {
	var runTimer;

	function startClock() { 
		runTimer = setInterval(countDown, 1000);
	};

	clearInterval(runTimer);
	
	if (activeSide[0].dataset.side === 'blue') {	
		obj = blueTime;
		clockToUpdate = clock1;
	}
	else { 
		obj = orangeTime;
		clockToUpdate = clock2;
	}
	startClock();
}