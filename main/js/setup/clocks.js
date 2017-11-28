var seconds = 0;
var minutes;
var hour;
var clock;
var stopped = false;
var breakl = document.getElementById("periodb")
var sesl = document.getElementById("periods")
var time = document.getElementById("time");


function minusBreak() {
  if (document.getElementById("periodb").innerHTML > 1) {
    document.getElementById("periodb").innerHTML--;
  }
}

function plusBreak() {
  document.getElementById("periodb").innerHTML++;
}


function minusSession() {
  if (time.innerHTML > 1) {
    document.getElementById("periods").innerHTML--;
    time.innerHTML--;
  }
}

function plusSession() {
  document.getElementById("periods").innerHTML++;
  time.innerHTML++;
}


function start() {
  document.getElementById("current").innerHTML = "session";
  x = sesl.innerHTML;
  if (stopped == true) { x = time.innerHTML; }
  minutes = parseInt(x);
  hour = 0;

  if (minutes > 60) {
    hour = Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  clock = setInterval(function() { timer() }, 1000);

  function timer() {
    if (minutes == 0 && seconds == 0) {
      hour--;
      minutes = 60;
      if (hour == -1) {
        clearInterval(clock);
        removeClasses();
        stopped = false;
        startBreak();
      }
    }
    if (seconds == 0) { minutes--; }
    if (seconds == 0) { seconds = 60; }
    seconds--;
    if (hour > 0) {
      if (minutes >= 10 && seconds < 10) { time.innerHTML = hour + ":" + minutes + ":" + "0" + seconds; }
      if (minutes < 10) {
        if (seconds < 10) { time.innerHTML = hour + ":" + "0" + minutes + ":" + "0" + seconds; }
        else { time.innerHTML = hour + ":" + "0" + minutes + ":" + seconds; }
      }
      else {
        if (seconds < 10) { hour + ":" + minutes + ":" + "0" + seconds; }
        else {
          time.innerHTML = hour + ":" + minutes + ":" + seconds;
        }
      }
    }

    else {
      if (seconds < 10) { time.innerHTML = minutes + ":" + "0" + seconds; }
      else { time.innerHTML = minutes + ":" + seconds; }
    }

    //loading
    if (hour == 0 && minutes == 0 && seconds < 60) {
      document.getElementById("a").classList.add("a1");
      if (seconds < 52) { document.getElementById("b").classList.add("b2"); }
      if (seconds < 44) {
        document.getElementById("c").classList.add("c3");
      }
      if (seconds < 36) {
        document.getElementById("d").classList.add("d4");
      }
      if (seconds < 24) {
        document.getElementById("e").classList.add("e5");
      }
      if (seconds < 12) {
        document.getElementById("f").classList.add("f6");
      }
      if (seconds < 5) {
        document.getElementById("g").classList.add("g7");
      }
    }


  } //ends timer


  document.getElementById("main").setAttribute("onclick", "pause();");
}

function pause() {
  stopped = true;
  clearInterval(clock);
  document.getElementById("main").setAttribute("onclick", "start();");
}


function startBreak() {
  y = breakl.innerHTML;
  if (stopped == true) { y = time.innerHTML; }
  minutes = parseInt(y);
  hour = 0;
  document.getElementById("current").innerHTML = "break";

  if (minutes > 60) {
    hour = Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  clock = setInterval(function() { timerb() }, 1000);

  function timerb() {
    if (minutes == 0 && seconds == 0) {
      hour--;
      minutes = 60;
      if (hour == -1) {
        clearInterval(clock);
        removeClasses();
        stopped = false;
        start();
      }
    }
    if (seconds == 0) { minutes--; }
    if (seconds == 0) { seconds = 60; }
    seconds--;
    if (hour > 0) {
      if (minutes >= 10 && seconds < 10) { time.innerHTML = hour + ":" + minutes + ":" + "0" + seconds; }
      if (minutes < 10) {
        if (seconds < 10) { time.innerHTML = hour + ":" + "0" + minutes + ":" + "0" + seconds; }
        else { time.innerHTML = hour + ":" + "0" + minutes + ":" + seconds; }
      }
      else {
        if (seconds < 10) { hour + ":" + minutes + ":" + "0" + seconds; }
        else {
          time.innerHTML = hour + ":" + minutes + ":" + seconds;
        }
      }
    }

    else {
      if (seconds < 10) { time.innerHTML = minutes + ":" + "0" + seconds; }
      else { time.innerHTML = minutes + ":" + seconds; }
    }

    //loading ... later fix to % out of total time
    if (hour == 0 && minutes == 0 && seconds < 60) {
      document.getElementById("a").classList.add("a1");
      if (seconds < 52) { document.getElementById("b").classList.add("b2"); }
      if (seconds < 44) {
        document.getElementById("c").classList.add("c3");
      }
      if (seconds < 36) {
        document.getElementById("d").classList.add("d4");
      }
      if (seconds < 24) {
        document.getElementById("e").classList.add("e5");
      }
      if (seconds < 12) {
        document.getElementById("f").classList.add("f6");
      }
      if (seconds < 5) {
        document.getElementById("g").classList.add("g7");
      }
    }

  } //ends timer


  document.getElementById("main").setAttribute("onclick", "pauseb();");

}

function pauseb() {
  stopped = true;
  clearInterval(clock);
  document.getElementById("main").setAttribute("onclick", "startBreak();");
}

function removeClasses() {
  document.getElementById("a").classList.remove("a1");
  document.getElementById("b").classList.remove("b2");
  document.getElementById("c").classList.remove("c3");
  document.getElementById("d").classList.remove("d4");
  document.getElementById("e").classList.remove("e5");
  document.getElementById("f").classList.remove("f6");
  document.getElementById("g").classList.remove("g7");
}

function reset() {
  removeClasses();
  document.getElementById("current").innerHTML = "session";
  document.getElementById("main").setAttribute("onclick", "start();");
  clearInterval(clock);
  sesl.innerHTML = 25;
  time.innerHTML = 25;
  breakl.innerHTML = 5;
  stopped = false;
  seconds = 0;
}

/*
<h1>Pomodoro Timer</h1>

<div class="block" id="session"><h4>session length</h4>
<a onclick="minusSession()" class="minus">-</a>
<a onclick="plusSession()" class="plus">+</a>   
<h2 id="periods">25</h2> 
</div>


<div class="block" id="break">
<h4>break length</h4>
<a onclick="minusBreak()" class="minus">-</a>
<a onclick="plusBreak()" class="plus">+</a>   
<h2 id="periodb">5</h2>  
</div>

<div id="main" onclick="start();">
<h1 id="current">session</h1>
<h1 id="time">25</h1>
<div id="loading">
  <div class="lbox" id="a"></div>
  <div class="lbox" id="b"></div>
  <div class="lbox" id="c"></div>
  <div class="lbox" id="d"></div>
  <div class="lbox" id="e"></div>
  <div class="lbox" id="f"></div>
  <div class="lbox" id="g"></div>
</div>
</div>

<a id= "reset" onclick="reset()">RESET</a> 








@import url(https://fonts.googleapis.com/css?family=Special+Elite);

body{
 color: #ccc; 
 background-color: #223; 
 text-align: center; 
 font-family: 'Special Elite', cursive;
}

h1{
  font-size: 36px;
   }

.block{
  display:inline-block;
  margin-right: 10px;
  margin-left: 10px;
  }

.minus{
  color:inherit;
  font-size:30px;
  float:left;
}

.minus:hover{
  cursor:pointer;
  color:#fff;
  text-decoration: none;}
.minus:focus{text-decoration: none;}


.plus{
  color:inherit;
  font-size:30px;
  float:right;
}

.plus:hover{
  cursor:pointer;
  color:#fff;
  text-decoration: none;}
.plus:focus{text-decoration: none;}

#main{
  width:300px;
  height: 300px;
  border:2px solid #77a;
  border-radius:7px;
  margin-left:auto;
  margin-right:auto;
  margin-bottom:10px;
  cursor:pointer;
}

#current{
  margin-top: 42px;
  text-transform: uppercase;
}

#time{
  font-size:80px;
  }

#loading{
  width: 296px;
  height: 70px;
  }

.lbox{ 
display:inline-block;
margin-left:2px;
margin-right:2px;  
width:30px;
height:30px;
}

.a1{background-color: #fff;}
.b2{background-color: #ccd;}
.c3{background-color: #99b;}
.d4{background-color: #779;}
.e5{background-color: #557;}
.f6{background-color: #224;}
.g7{background-color: #112;}

#reset{
font-size:30px;
color:inherit;
margin-top:20px;
cursor:pointer;  
}
#reset:hover{text-decoration: none;}
