var buttonCities = ["soledar", "luhansk", "bakhmut", "donetsk"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenCity = $(this).attr("id");
  userClickedPattern.push(userChosenCity);

  playSound(userChosenCity);
  animatePress(userChosenCity);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Get more weapons and keep going! 🇺🇦");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenCity = buttonCities[randomNumber];
  gamePattern.push(randomChosenCity);

  $("#" + randomChosenCity).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenCity);
}

function animatePress(currentCity) {
  $("#" + currentCity).addClass("pressed");
  setTimeout(function() {
    $("#" + currentCity).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
