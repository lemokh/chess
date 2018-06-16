$( document ).ready( function page() {

  var interval = null,
      minute_num = null,
      colon = ':',
      tenth_second_str = '5',
      tenth_second_num = +tenth_second_str,
      hundredth_second_str = '9',
      hundredth_second_num = +hundredth_second_str,
      main_time = '',
      focus_time = 25,
      relax_time = 8;


  $( 'reset' ).addClass( 'noClick' );


  function countDown() {
    interval = setInterval( runClock,  1000 );
  }


  function runClock() { // runs clock down to 0, then swaps times and repeats

    minute_str = minute_num.toString();

    tenth_second_str = tenth_second_num.toString();

    hundredth_second_str = hundredth_second_num.toString();

    main_time = minute_str + colon + tenth_second_str + hundredth_second_str;

    $( 'countDown' ).html( main_time );

    hundredth_second_num -= 1;

    if( hundredth_second_num < 0 ) {
      tenth_second_num -= 1;
      hundredth_second_num = 9;
    }
    if( tenth_second_num < 0 ) {
      minute_num -= 1;
      tenth_second_num = 5;
    }
    if( minute_num < 0 ) {
      transition();
    }
  }

  function transition() {

    if ( $( 'clocks' ).hasClass( 'focusMode' ) ) { 

      clearInterval( interval );
      minute_num = relax_time;
      $( 'clocks' ).removeClass( 'focusMode' );
      $( 'focus, clock1' ).removeClass( 'active' );
      $( 'relax' ).trigger( 'click' );
      $( '#relax' ).trigger( 'play' );
    }
    else {

      clearInterval( interval );
      minute_num = focus_time;
      $( 'clocks' ).removeClass( 'relaxMode' );
      $( 'relax, clock2' ).removeClass( 'active' );
      $( 'focus' ).trigger( 'click' );
      $( '#focus' ).trigger( 'play' );
    }
  }


  $( 'focusTime' ).html( focus_time );


  $( 'relaxTime' ).html( relax_time );


  $( 'focus' ).on( 'click', function runFocus() {

      minute_num = focus_time - 1;
      $( 'adjust1, adjust2, focus, relax' ).addClass( 'darken' );
      $( 'reset' ).removeClass( 'noClick' ).addClass( 'lighten' );
      $( 'countDown span' ).html( focus_time + ':00' );
      $( 'focus, clock1' ).addClass( 'active' );
      $( 'clocks' ).addClass( 'focusMode' );
      $( 'reset' ).html( 'RESET' );

      countDown();
  } );


  $( 'relax' ).on( 'click', function runRelax() {

      minute_num = relax_time - 1;
      $( 'adjust1, adjust2, focus, relax' ).addClass( 'darken' );
      $( 'reset' ).removeClass( 'noClick' ).addClass( 'lighten' );
      $( 'countDown span' ).html( relax_time + ':00' );
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

    let plus_focus = focus_time + 1;

    if( focus_time < 60 ) {
      $( 'focusTime' ).html( plus_focus );
      focus_time = plus_focus;
    }
  } );


  $( 'up2' ).on( 'click', function additionRelax () {

    let plus_relax = relax_time + 1;

    if( relax_time < 60 ) {
      $( 'relaxTime' ).html( plus_relax );
      relax_time = plus_relax;
    }
  } );


  $( 'down1' ).on( 'click', function subtractionFocus () {

    let minus_focus = focus_time - 1;

    if( minus_focus >= 1 ) {
      $( 'focusTime' ).html( minus_focus );
      focus_time = minus_focus;
    }
  } );


  $( 'down2' ).on( 'click', function subtractionRelax () {

    let minus_relax = relax_time - 1;

    if ( minus_relax >= 1) {
      $( 'relaxTime' ).html( minus_relax );
      relax_time = minus_relax;
    }
  } );


} ); // closes document... page()

 // STILL-TO-DO: color gradients for focus and relax
