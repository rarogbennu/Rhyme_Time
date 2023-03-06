"use strict";

window.addEventListener("load", ready);

let points = 0;
let lives = 0;

function ready() {
  // console.log("ready");
  document.querySelector("#start_button").addEventListener("click", start);
  document.querySelector("#complete_button").addEventListener("click", start);
  document.querySelector("#gameover_button").addEventListener("click", showStartScreen);
}

function timeStart() {
  //   console.log("timeStart");
  document.querySelector("#time_sprite").classList.add("shrink_watch");
  document.querySelector("#time_sprite").addEventListener("animationend", timeDone);
}

function timeDone() {
  //   console.log("timeDone");
  if (points >= 100) {
    levelComplete();
  } else {
    gameOver();
  }
}

function resetLife() {
  lives = 6;
  document.querySelector("#life1").classList.remove("life_gone");
  document.querySelector("#life2").classList.remove("life_gone");
  document.querySelector("#life3").classList.remove("life_gone");
  document.querySelector("#life4").classList.remove("life_gone");
  document.querySelector("#life5").classList.remove("life_gone");
  document.querySelector("#life6").classList.remove("life_gone");
  document.querySelector("#life1").classList.remove("life_there");
  document.querySelector("#life2").classList.remove("life_there");
  document.querySelector("#life3").classList.remove("life_there");
  document.querySelector("#life4").classList.remove("life_there");
  document.querySelector("#life5").classList.remove("life_there");
  document.querySelector("#life6").classList.remove("life_there");
}

function resetPoints() {
  points = 0;
  showPoints();
}

function showStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showGameScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function start() {
  // console.log("start");
  // points = 0;
  // lives = 6;
  // time = 30;

  resetLife();
  resetPoints();
  showGameScreen();

  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#good_sound").currentTime = 0;
  document.querySelector("#background_sound").play();

  timeStart();
  startAnimations();
//   startPositions();
  registerClicks();
  randomRestart();
  nonClickRestart();
}



function nonClickRestart() {
  console.log("non click")
  document.querySelector("#lime_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#mime_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#chime_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#lemon_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#clown_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#xylo_container").addEventListener("animationiteration", randomRestart);
}
function randomRestart() {
  console.log("random restart");
  restartGood.call(document.querySelector("#lime_container")); // vigtigt her at kalde container havde kaldt det her før -   document .querySelector("#mime_container") .addEventListener("click", restartGood);
  restartGood.call(document.querySelector("#mime_container"));
  restartGood.call(document.querySelector("#chime_container"));
  restartBad.call(document.querySelector("#lemon_container"));
  restartBad.call(document.querySelector("#clown_container"));
  restartBad.call(document.querySelector("#xylo_container"));
}
function registerClicks() {
  document.querySelector("#lime_container").addEventListener("click", clickGood);
  document.querySelector("#mime_container").addEventListener("click", clickGood);
  document.querySelector("#chime_container").addEventListener("click", clickGood);
  document.querySelector("#lemon_container").addEventListener("click", clickBad);
  document.querySelector("#clown_container").addEventListener("click", clickBad);
  document.querySelector("#xylo_container").addEventListener("click", clickBad);
}
function startAnimations() {
  document.querySelector("#lime_container").classList.add("fade_inout");
  document.querySelector("#mime_container").classList.add("fade_inout");
  document.querySelector("#chime_container").classList.add("fade_inout");
  document.querySelector("#lemon_container").classList.add("fade_inout");
  document.querySelector("#clown_container").classList.add("fade_inout");
  document.querySelector("#xylo_container").classList.add("fade_inout");
}



function clickGood() {
  console.log("clickGood");
  let good = this;

  good.removeEventListener("click", clickGood);

  good.classList.add("paused");

  good.querySelector("img").classList.add("rotation_left");

  document.querySelector("#good_sound").currentTime = 0;
  document.querySelector("#good_sound").play();

  good.addEventListener("animationend", goneGood);

  // getLife(); // <- skal ikke bruges her
  getPoints();
}

function goneGood() {
  console.log("goneGood");
  let good = this;

  good.removeEventListener("animationend", goneGood);

  good.querySelector("img").classList.remove("rotation_left");

  good.classList.remove("paused");

  restartGood.call(this);

  good.addEventListener("click", clickGood);
}

function restartGood() {
  console.log("restartGood");
  let good = this;

  good.classList.remove("fade_inout");
  good.offsetWidth;
  good.classList.add("fade_inout");

  let pos = Math.floor(Math.random() * 20) + 1;

  good.classList.remove( "position1", "position2", "position3", "position4", "position5", "position6", "position7", "position8", "position9", "position10", "position11", "position12", "position13", "position14", "position15", "position16", "position17", "position18", "position19", "position20" );
  good.classList.add("position" + pos);
}

function clickBad() {
  console.log("clickBad");
  let bad = this;

  bad.removeEventListener("click", clickBad);

  bad.classList.add("paused");

  bad.querySelector("img").classList.add("rotation_right");

  document.querySelector("#bad_sound").currentTime = 0;
  document.querySelector("#bad_sound").play();

  bad.addEventListener("animationend", goneBad);

  loseLife();
  losePoints();
}

function goneBad() {
  console.log("goneBad");
  let bad = this;

  bad.removeEventListener("animationend", goneBad);

  bad.querySelector("img").classList.remove("rotation_right");

  bad.classList.remove("paused");

  restartBad.call(this);

  bad.addEventListener("click", clickBad);
}

function restartBad() {
  // console.log("restartBad");
  let bad = this;

  bad.classList.remove("fade_inout");
  bad.offsetWidth;
  bad.classList.add("fade_inout");

  let pos = Math.floor(Math.random() * 20) + 1;
  bad.classList.remove( "position1", "position2", "position3", "position4", "position5", "position6", "position7", "position8", "position9", "position10", "position11", "position12", "position13", "position14", "position15", "position16", "position17", "position18", "position19", "position20" );
  bad.classList.add("position" + pos);
}

function getPoints() {
  // console.log("getPoints");
  // console.log(points);
  points += 10;
  showPoints();

  if (points >= 50) {
    levelComplete();
  }
}

function losePoints() {
  // console.log("losePoints");
  // console.log(points);
  points -= 10;
  showPoints();
}

function showPoints() {
  // console.log("showPoints");
  document.querySelector("#point_count").textContent = points;
}

function loseLife() {
  // console.log("loseLife");
  // console.log(lives);
  if (lives < 1) {
    gameOver();
    return;
  }

  showLostLife();
  lives--;
  // console.log(lives);
}

function showLostLife() {
  // console.log("showLostLife");
  document.querySelector("#life" + lives).classList.remove("life_there");
  document.querySelector("#life" + lives).classList.add("life_gone");
}

function gameOver() {
  // console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");
  stop();
  document.querySelector("#background_sound").pause();
  document.querySelector("#gameover_sound").play();
}

function levelComplete() {
  // console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");
  stop();

  document.querySelector("#levelcomplete_sound").play();
}

function stop() {
  // console.log("Stop");

  document.querySelector("#lime_container").classList.remove("fade_inout");
  document.querySelector("#mime_container").classList.remove("fade_inout");
  document.querySelector("#chime_container").classList.remove("fade_inout");
  document.querySelector("#lemon_container").classList.remove("fade_inout");
  document.querySelector("#clown_container").classList.remove("fade_inout");
  document.querySelector("#xylo_container").classList.remove("fade_inout");

  document .querySelector("#lime_container") .removeEventListener("click", clickGood);
  document .querySelector("#mime_container") .removeEventListener("click", clickGood);
  document .querySelector("#chime_container") .removeEventListener("click", clickGood);
  document .querySelector("#lemon_container") .removeEventListener("click", clickBad);
  document .querySelector("#clown_container") .removeEventListener("click", clickBad);
  document .querySelector("#xylo_container") .removeEventListener("click", clickBad);

  document.querySelector("#background_sound").pause();
  document.querySelector("#background_sound").currentTime = 0;
  resetPoints();
  resetLife();
  document.querySelector("#time_sprite").classList.remove("shrink_watch");

  // startPositions();
}




// function startPositions() {
//   document.querySelector("#lime_container").classList.add("position7");
//   document.querySelector("#mime_container").classList.add("position8");
//   document.querySelector("#chime_container").classList.add("position12");
//   document.querySelector("#lemon_container").classList.add("position13");
//   document.querySelector("#clown_container").classList.add("position14");
//   document.querySelector("#xylo_container").classList.add("position9");
// }

// function getLife() {
//     console.log(lives);
//     console.log("getLife");

//     if (lives == 6) {
//        return;
//     }

//     lives++;
//     console.log(lives);
//     showGottenLife();
// }

// function showGottenLife() {
//     console.log("showGottenLife");
//     document.querySelector("#life" + lives).classList.add("life_there");
//     document.querySelector("#life" + lives).classList.remove("life_gone");
// }
