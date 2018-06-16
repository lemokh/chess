var minuteNum,
    tenthSecondStr = '5',
    tenthSecondNum = +tenthSecondStr,
    hundredthSecondStr = '9',
    hundredthSecondNum = +hundredthSecondStr,

    clock1 = 10,
    clock2 = 10,
    
    runClock1,
    runClock2,
    clockToUpdate,
    clockToRun;

function countDown() { // runs clock down to 0

  minuteStr = minuteNum+'';
  tenthSecondStr = tenthSecondNum+'';
  hundredthSecondStr = hundredthSecondNum+'';
  hundredthSecondNum -= 1;

  if( hundredthSecondNum < 0 ) {
    tenthSecondNum -= 1;
    hundredthSecondNum = 9;
  }

  if( tenthSecondNum < 0 ) {
    minuteNum -= 1;
    tenthSecondNum = 5;
  }

  if( minuteNum < 0 ) { endOfGame(); }

  document.getElementById(clockToUpdate).html(
    minuteStr + ':' + tenthSecondStr + hundredthSecondStr
  );
}

function runClock(clock) {
  while (clockToRun) { setInterval( runClock, 1000 ); }
}
