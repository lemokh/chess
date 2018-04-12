// one clock function to run two separate clocks
// start & stop & alert(activeSide + " resigns"); & resetBtn()

var abrv1 = 2500,
  abrv2 = 500,
  stopped = false,
  seconds, timer1, timer2, time1, time2;

function convert() {
  var temp = "" + abrv1;
  if (temp[2] === '0' && temp[3] === '0') {
    time1 = temp[0] + temp[1];
  }
  else if (abrv1 < 1000) { time1 = temp[0]; }
} // converts time1

function down() {
  if (+abrv1 > 100) { abrv1 -= 100; }
  convert();
  document.getElementById('time').html(time1);
  stopped = false;

} // decreases timer by one second

function up() {
  if (+time1 < 60) { abrv1 = (+abrv1 + 100); }
  convert();
  document.getElementById('time1').html(time1);
  stopped = false;

} // inceases timer by one second

function page() {
  convert();
  document.getElementById('time1').html(time1);
}; // displays timers

function start() {
  if (!stopped) { seconds = (+time1 * 60); }

  stopped = false;
  document.getElementById('start1').html('Stop');
  document.getElementById('down1').setAttribute('onclick', '');
  document.getElementById('up1').setAttribute('onclick', '');
  document.getElementById('start1').setAttribute('onclick', 'stop()');
  timer1 = setTimeout(countDown1, 1000);

  function countDown() {
    if (seconds > 0) { seconds--; }
    if (seconds > 0 && !stopped) {
      timer1 = setTimeout(countDown, 1000);
    }
    if (!stopped && seconds % 60 >= 10) {
      document.getElementById('time1').html(
        Math.floor(seconds / 60) + ':' + seconds % 60
      );
    }
    else if (seconds % 60 < 10) {
      if (seconds % 60 >= 0) {
        if (seconds / 60 !== 0) {
          document.getElementById('time1').html(
            Math.floor(seconds / 60) + ':0' + seconds % 60
          );
        }
      }
    }
    else if (seconds / 60 === 0) {
      document.getElementById('time1').html('BREAK');
    }
  } // counts down clock
} // starts clock

function stop() {
  clearTimeout(timer1);
  stopped = true;
  document.getElementById('start1').html('Start');
  document.getElementById('down1').setAttribute('onclick', 'down()');
  document.getElementById('up1').setAttribute('onclick', 'up()');
  document.getElementById('start1').setAttribute('onclick', 'start()');

  if (seconds % 60 >= 10) {
    document.getElementById('time1').html(
      Math.floor(seconds / 60) + ':' + seconds % 60
    );
  }
  else {
    document.getElementById('time1').html(
      Math.floor(seconds / 60) + ':0' + seconds % 60
    );
  }
} // stops clock

function reset() {
  if (stopped === false) {
    clearTimeout(timer1);
    document.getElementById('down1').setAttribute('onclick', 'down()');
    document.getElementById('up1').setAttribute('onclick', 'up()');
    document.getElementById('start1').setAttribute('onclick', 'start()');
    document.getElementById('start1').html('Start');
    stopped = true;
  }
  seconds = 1500;
  abrv1 = 2500;
  time1 = '25';

  document.getElementById('time1').html(time1);
} // resets clock
