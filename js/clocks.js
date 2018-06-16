var interval = null,
    minuteNum = null,
    colon = ':',
    tenthSecondStr = '5',
    tenthSecondNum = +tenthSecondStr,
    hundredthSecondStr = '9',
    hundredthSecondNum = +hundredthSecondStr,
    mainTime = '',
    focusTime = 10,
    relaxTime = 10;

function countDown() {
  interval = setInterval( runClock,  1000 );
}

function runClock() { // runs clock down to 0

  minute_str = minuteNum.toString();

  tenthSecondStr = tenthSecondNum.toString();

  hundredthSecondStr = hundredthSecondNum.toString();

  mainTime = minute_str + colon + tenthSecondStr + hundredthSecondStr;

  $( 'countDown' ).html( mainTime );

  hundredthSecondNum -= 1;

  if( hundredthSecondNum < 0 ) {
    tenthSecondNum -= 1;
    hundredthSecondNum = 9;
  }
  if( tenthSecondNum < 0 ) {
    minuteNum -= 1;
    tenthSecondNum = 5;
  }
  if( minuteNum < 0 ) {
    transition();
  }
}

function transition() {

  if ( $( 'clocks' ).hasClass( 'focusMode' ) ) { 

    clearInterval( interval );
    minuteNum = relaxTime;
    $( 'clocks' ).removeClass( 'focusMode' );
    $( 'focus, clock1' ).removeClass( 'active' );
    $( 'relax' ).trigger( 'click' );
    $( '#relax' ).trigger( 'play' );
  }
  else {

    clearInterval( interval );
    minuteNum = focusTime;
    $( 'clocks' ).removeClass( 'relaxMode' );
    $( 'relax, clock2' ).removeClass( 'active' );
    $( 'focus' ).trigger( 'click' );
    $( '#focus' ).trigger( 'play' );
  }
}


$( 'focusTime' ).html( focusTime );


$( 'relaxTime' ).html( relaxTime );


$( 'focus' ).on( 'click', function runFocus() {

    minuteNum = focusTime - 1;
    $( 'adjust1, adjust2, focus, relax' ).addClass( 'darken' );
    $( 'reset' ).removeClass( 'noClick' ).addClass( 'lighten' );
    $( 'countDown span' ).html( focusTime + ':00' );
    $( 'focus, clock1' ).addClass( 'active' );
    $( 'clocks' ).addClass( 'focusMode' );
    $( 'reset' ).html( 'RESET' );

    countDown();
} );


$( 'relax' ).on( 'click', function runRelax() {

    minuteNum = relaxTime - 1;
    $( 'adjust1, adjust2, focus, relax' ).addClass( 'darken' );
    $( 'reset' ).removeClass( 'noClick' ).addClass( 'lighten' );
    $( 'countDown span' ).html( relaxTime + ':00' );
    $( 'relax, clock2' ).addClass( 'active' );
    $( 'clocks' ).addClass( 'relaxMode' );
    $( 'reset' ).html( 'RESET' );
    countDown();
} );


$( 'reset' ).on( 'click', function reset() {
  $( 'clocks' ).removeClass( 'focusMode relaxMode' );
  location.reload();
} );


$( 'up1' ).on( 'click', function additionFocus() {

  let plus_focus = focusTime + 1;

  if( focusTime < 60 ) {
    $( 'focusTime' ).html( plus_focus );
    focusTime = plus_focus;
  }
} );


$( 'up2' ).on( 'click', function additionRelax () {

  let plus_relax = relaxTime + 1;

  if( relaxTime < 60 ) {
    $( 'relaxTime' ).html( plus_relax );
    relaxTime = plus_relax;
  }
} );


$( 'down1' ).on( 'click', function subtractionFocus () {

  let minus_focus = focusTime - 1;

  if( minus_focus >= 1 ) {
    $( 'focusTime' ).html( minus_focus );
    focusTime = minus_focus;
  }
} );


$( 'down2' ).on( 'click', function subtractionRelax () {

  let minus_relax = relaxTime - 1;

  if ( minus_relax >= 1) {
    $( 'relaxTime' ).html( minus_relax );
    relaxTime = minus_relax;
  }
} );
