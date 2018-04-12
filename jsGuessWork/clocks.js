// one clock function to run two separate clocks
// start & stop & alert(activeSide + " resigns"); & resetBtn()
function clock() {

  let seconds, timer, time,
    abrv1 = 2500,
    abrv2 = 500,
    stopped = false;

  function convert() {
    let temp = "" + abrv1;
    if (temp[2] === '0' && temp[3] === '0') {
      time = temp[0] + temp[1];
    }
    else if (abrv1 < 1000) { time = temp[0]; }
  } // converts time

  function down() {
    if (+abrv1 > 100) { abrv1 -= 100; }
    convert();
    document.getElementById('time').html(time);
    stopped = false;

  } // decreases timer by one second

  function up() {
    if (+time < 60) { abrv1 = (+abrv1 + 100); }
    convert();
    document.getElementById('time1').html(time);
    stopped = false;

  } // inceases timer by one second

  function page() {
    convert();
    document.getElementById('time1').html(time);
  }; // displays timers

  function start() {
    if (!stopped) { seconds = (+time * 60); }

    stopped = false;
    document.getElementById('start1').html('Stop');
    document.getElementById('down1').setAttribute('onclick', '');
    document.getElementById('up1').setAttribute('onclick', '');
    document.getElementById('start1').setAttribute('onclick', 'stop()');
    timer = setTimeout(countDown1, 1000);

    function countDown() {
      if (seconds > 0) { seconds--; }
      if (seconds > 0 && !stopped) {
        timer = setTimeout(countDown, 1000);
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
    clearTimeout(timer);
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
}
