"use strict";

window.addEventListener("load", ready);

let points = 0;
let lives = 0;

function ready() {
  // styrer klik på knapper og hvor de fører hen
  document.querySelector("#start_button").addEventListener("click", start);
  document.querySelector("#complete_button").addEventListener("click", showStartScreen);
  document.querySelector("#gameover_button").addEventListener("click", start);
}

function timeStart() {
  // animation af timer og hvad der sker når tiden er færdig
  document.querySelector("#time_sprite").classList.add("shrink_watch");
  document.querySelector("#time_sprite").addEventListener("animationend", gameOver);
}

function resetLife() {
  // liv ved start og efter level complete/game over
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
  // resetter point
  points = 0;
  showPoints();
}

function showStartScreen() {
  // viser startskærm
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showGameScreen() {
  // viser spilskærm/baggrund
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function start() {
// starter baggrundsmusik
  resetLife();
  resetPoints();
  showGameScreen();

  document.querySelector("#background_sound").currentTime = 0;
  document.querySelector("#background_sound").play();

  timeStart();
  startAnimations();
  registerClicks();
  randomRestart();
  nonClickRestart();
}

function nonClickRestart() {
// for hver fade-in/out animation skiftes position
  document.querySelector("#lime_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#mime_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#chime_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#lemon_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#clown_container").addEventListener("animationiteration", randomRestart);
  document.querySelector("#xylo_container").addEventListener("animationiteration", randomRestart);
}
function randomRestart() {
// 
  restartGood.call(document.querySelector("#lime_container"));
  restartGood.call(document.querySelector("#mime_container"));
  restartGood.call(document.querySelector("#chime_container"));
  restartBad.call(document.querySelector("#lemon_container"));
  restartBad.call(document.querySelector("#clown_container"));
  restartBad.call(document.querySelector("#xylo_container"));
}
function registerClicks() {
  // registrer click på containerne og sender dem videre til gode/dårlige klik
  document.querySelector("#lime_container").addEventListener("click", clickGood);
  document.querySelector("#mime_container").addEventListener("click", clickGood);
  document.querySelector("#chime_container").addEventListener("click", clickGood);
  document.querySelector("#lemon_container").addEventListener("click", clickBad);
  document.querySelector("#clown_container").addEventListener("click", clickBad);
  document.querySelector("#xylo_container").addEventListener("click", clickBad);
}

function startAnimations() {
  // starter animationer på containerne
  document.querySelector("#lime_container").classList.add("fade_inout");
  document.querySelector("#mime_container").classList.add("fade_inout");
  document.querySelector("#chime_container").classList.add("fade_inout");
  document.querySelector("#lemon_container").classList.add("fade_inout");
  document.querySelector("#clown_container").classList.add("fade_inout");
  document.querySelector("#xylo_container").classList.add("fade_inout");
}



function clickGood() {
// registrerer klik ; pauser container ; roter animation ; spiller lyd ; når rotation færdig gå til gone
  let good = this;

  good.removeEventListener("click", clickGood);

  good.classList.add("paused");

  good.querySelector("img").classList.add("rotation_left");

  document.querySelector("#good_sound").currentTime = 0;
  document.querySelector("#good_sound").play();

  good.addEventListener("animationend", goneGood);

  getPoints();
}

function goneGood() {
// roter animation fjernes ; pause fjernes ; sender this videre til genstart
  let good = this;

  good.removeEventListener("animationend", goneGood);

  good.querySelector("img").classList.remove("rotation_left");

  good.classList.remove("paused");

  restartGood.call(this);

  good.addEventListener("click", clickGood);
}

function restartGood() {
// starter figurerne i en af 20 positioner
  let good = this;

  good.classList.remove("fade_inout");
  good.offsetWidth;
  good.classList.add("fade_inout");

  let pos = Math.floor(Math.random() * 20) + 1;

  good.classList.remove( "position1", "position2", "position3", "position4", "position5", "position6", "position7", "position8", "position9", "position10", "position11", "position12", "position13", "position14", "position15", "position16", "position17", "position18", "position19", "position20" );
  good.classList.add("position" + pos);
}

function clickBad() {
// registrerer klik ; pauser container ; roter animation ; spiller lyd ; når rotation færdig gå til gone
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
// roter animation fjernes ; pause fjernes ; sender this videre til genstart
  let bad = this;

  bad.removeEventListener("animationend", goneBad);

  bad.querySelector("img").classList.remove("rotation_right");

  bad.classList.remove("paused");

  restartBad.call(this);

  bad.addEventListener("click", clickBad);
}

function restartBad() {
// starter figurerne i en af 20 positioner
  let bad = this;

  bad.classList.remove("fade_inout");
  bad.offsetWidth;
  bad.classList.add("fade_inout");

  let pos = Math.floor(Math.random() * 20) + 1;
  bad.classList.remove( "position1", "position2", "position3", "position4", "position5", "position6", "position7", "position8", "position9", "position10", "position11", "position12", "position13", "position14", "position15", "position16", "position17", "position18", "position19", "position20" );
  bad.classList.add("position" + pos);
}

function getPoints() {
// få 10 point per godt klik; vinder hvis du får 100 point
  points += 10;
  showPoints();
  if (points >= 100) {
    levelComplete();
  }
}

function losePoints() {
// mister 10 point per dårligt klik
  points -= 10;
  showPoints();
}

function showPoints() {
// viser point
  document.querySelector("#point_count").textContent = points;
}

function loseLife() {
  // hvornår der er game over og fjern liv
  if (lives < 1) {
    gameOver();
    return;
  }
  showLostLife();
  lives--;
}

function showLostLife() {
// visuel representation af mistet liv
  document.querySelector("#life" + lives).classList.remove("life_there");
  document.querySelector("#life" + lives).classList.add("life_gone");
}

function gameOver() {
// viser game over skærm og spiller musik
  document.querySelector("#game_over").classList.remove("hidden");
  stop();
  document.querySelector("#gameover_sound").play();
}

function levelComplete() {
// viser level complete skærm og spiller musik
  document.querySelector("#level_complete").classList.remove("hidden");
  stop();
  document.querySelector("#levelcomplete_sound").play();
}

function stop() {
// stopper animationer og klik registrering pauser baggrundsmusik og resetter point, liv og ur
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
}