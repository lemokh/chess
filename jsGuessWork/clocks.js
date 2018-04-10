// replace any jQuery with JS
// one clock function to run two separate clocks
// start & stop & alert(activeSide + " resigns"); & resetBtn()

var abrv1 = 2500, abrv2 = 500, stopped = false, timer1, timer2, time1, time2;

function convert1() {
  
  var temp = "" + abrv1;
  
  if ( temp[2] === '0' && temp[3] === '0' ) {
    
    time1 = temp[0] + temp[1];
  
  } 
  
  else if ( abrv1 < 1000 ) {
  
    time1 = temp[0];
  
  }
  
} // closes convert1()

function convert2() {
  
  var temp = "" + abrv2;
  
  if ( temp[2] === '0' && temp[3] === '0' ) {
  
    time2 = temp[0] + temp[1];
  
  } 
  
  else if ( abrv2 < 1000 ) {
  
    time2 = temp[0];
  
  }
  
} // closes convert2()

function down1() {
  
  if ( parseInt( abrv1 ) > 100 ) {
  
    abrv1 = parseInt( abrv1 ) - 100;
  
  }
  
  convert1();
  
  $( '#time1' ).html( time1 );
  
  stopped = false;

} // closes down1()

function down2() {
  
  if ( parseInt( abrv2 ) > 100 ) {
 
    abrv2 = parseInt( abrv2 ) - 100;
  
  }
  
  convert2();
  
  $( '#time2' ).html( time2 );
  
  stopped = false;

} // closes down2()

function up1() {
  
  if ( parseInt( time1 ) < 60 ) {
  
    abrv1 = parseInt( abrv1 ) + 100;
  
  }
  
  convert1();
  
  $( '#time1' ).html( time1 );
  
  stopped = false;

} // closes up1()

function up2() {
  
  if ( parseInt( time2 ) < 60) {
  
    abrv2 = parseInt( abrv2 ) + 100;
  
  }
  
  convert2();
  
  $( '#time2' ).html( time2 );
  
  stopped = false;

} // closes up2()

$( document ).ready( function page1() {
  
  convert1();
  
  $( '#time1' ).html( time1 );
  
  $( '#time2' ).html( time2 );

} ); // closes page1()

function start1() {
  
  if ( stopped === false ) {
  
    seconds = parseInt( time1 ) * 60;
  
  }
  
  stopped = false;
  
  $( '#start1' ).html( 'Stop' );

  document.getElementById( 'down1' ).setAttribute( 'onclick', '' );
  
  document.getElementById( 'up1' ).setAttribute( 'onclick', '' );
  
  document.getElementById( 'start1' ).setAttribute( 'onclick', 'stop1()' );

  timer1 = setTimeout( countDown1, 1000 );

  function countDown1() {
    
    if ( seconds > 0 ) { seconds--; }
    
    if ( seconds > 0 && stopped === false ) {
      
      timer1 = setTimeout( countDown1, 1000 );
    
    }  // closes countDown1()
    
    if ( stopped === false && seconds % 60 >= 10 ) {
    
      $( '#time1' ).html( Math.floor( seconds / 60 ) + ':' + seconds % 60 );
    
    } 
    
    else if ( seconds % 60 < 10 && seconds % 60 >= 0 && seconds / 60 !== 0 ) {
    
      $( '#time1' ).html( Math.floor( seconds / 60 ) + ':0' + seconds % 60 );
    
    } 
    
    else if ( seconds / 60 === 0 ) {
    
      $( '#time1' ).html( 'BREAK' );
    
    }
    
  } // closes countDown1()
  
} // closes start1()

function stop1() {
  
  clearTimeout( timer1 );
  
  stopped = true;
  
  $( '#start1' ).html( 'Start' );
  
  document.getElementById( 'down1' ).setAttribute( 'onclick', 'down1()' );
  
  document.getElementById( 'up1' ).setAttribute( 'onclick', 'up1()' );
  
  document.getElementById( 'start1' ).setAttribute( 'onclick', 'start1()' );
  
  if ( seconds % 60 >= 10 ) {
  
    $( '#time1' ).html( Math.floor( seconds / 60 ) + ':' + seconds % 60 );
  
  } 
  
  else {
  
    $( '#time1' ).html( Math.floor( seconds / 60 ) + ':0' + seconds % 60 );
  
  }

} // closes stop1()

function reset1() {
 
  if ( stopped === false ) {  
   
    clearTimeout( timer1 );
    
    document.getElementById( 'down1' ).setAttribute( 'onclick', 'down1()' );
    
    document.getElementById( 'up1' ).setAttribute( 'onclick', 'up1()' );
    
    document.getElementById( 'start1' ).setAttribute( 'onclick', 'start1()' );
    
    $( '#start1' ).html( 'Start' );
    
    stopped = true;
  
  }
  
  seconds = 1500;
  
  abrv1 = 2500;
  
  time1 = '25';
  
  $( '#time1' ).html( time1 );

} // closes reset1()

$( document ).ready( function page2() {
  
  convert2();
  
  $( '#time1' ).html( time1 );
  
  $( '#time2' ).html( time2 );

} ); // closes page2()

function start2() {
  
  if ( stopped === false ) {
  
    seconds = parseInt( time2 ) * 60;
  
  }
  
  stopped = false;
  
  $( '#start2' ).html( 'Stop' );  
  
  document.getElementById( 'down2' ).setAttribute( 'onclick', '' );
  
  document.getElementById( 'up2' ).setAttribute( 'onclick', '' );
  
  document.getElementById( 'start2' ).setAttribute( 'onclick', 'stop2()' );

  timer2 = setTimeout( countDown2, 1000 );

  function countDown2() {
    
    if ( seconds > 0 ) { seconds--; }
    
    if ( seconds > 0 && stopped === false ) {
      
      timer2 = setTimeout( countDown2, 1000 );
    
    }
    
    if ( stopped === false && seconds % 60 >= 10 ) {
    
      $( '#time2' ).html( Math.floor( seconds / 60 ) + ':' + seconds % 60 );
    
    } 
    
    else if ( seconds % 60 < 10 && seconds % 60 >= 0 && seconds / 60 !== 0 ) {
    
      $( '#time2' ).html( Math.floor( seconds / 60 ) + ':0' + seconds % 60 );
    
    } 
    
    else if ( seconds / 60 === 0 ) {
    
      $( '#time2' ).html( 'FOCUS' );
    
    }
  
  } // closes countDown2()
  
} // closes start2()

function stop2() {
  
  clearTimeout( timer2 );
  
  stopped = true;
  
  $( '#start2' ).html( 'Start' );
  
  document.getElementById( 'down2' ).setAttribute( 'onclick', 'down2()' );
  
  document.getElementById( 'up2' ).setAttribute( 'onclick', 'up2()' );
  
  document.getElementById( 'start2' ).setAttribute( 'onclick', 'start2()' );
  
  if ( seconds % 60 >= 10 ) {
  
    $( '#time2' ).html( Math.floor( seconds / 60 ) + ':' + seconds % 60 );
  
  }
  
  else {
  
    $( '#time2' ).html( Math.floor( seconds / 60 ) + ':0' + seconds % 60 );
  
  }
  
} // closes stop2()

function reset2() {
  
  if ( stopped === false ) {
  
    clearTimeout( timer2 );
    
    document.getElementById( 'down2' ).setAttribute( 'onclick', 'down2()' );
    
    document.getElementById( 'up2' ).setAttribute( 'onclick', 'up2()' );
    
    document.getElementById( 'start2' ).setAttribute( 'onclick', 'start2()' );
 
    $( '#start2' ).html( 'Start' );
    
    stopped = true;
  
  }
  
  seconds = 1500;
  
  abrv2 = 500;
  
  time2 = '5';
  
  $( '#time2' ).html( time2 );

} // closes reset2()