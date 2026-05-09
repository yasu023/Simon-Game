// Store the user's clicked button sequence
var userClickedPattern = [];

// Available button colors in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Store the generated game sequence
var gamePattern = [];

// Current game level
var level = 0;

// Check if the game has started
var started = false;


// Start the game when any key is pressed
$(document).keypress(function () {

  if (!started) {

    $("#level-title").text("Level " + level);

    nextSequence();

    started = true;
  }

});


// Handle button clicks
$(".btn").click(function () {

  // Get the ID of the clicked button
  var userChosenColour = $(this).attr("id");

  // Add the clicked color to the user's sequence
  userClickedPattern.push(userChosenColour);

  // Check if the user's answer is correct
  checkAnswer(userClickedPattern.length - 1);

  // Play sound and animate the pressed button
  playSound(userChosenColour);

  animatePress(userChosenColour);

});


// Generate the next sequence
function nextSequence() {

  // Reset user clicks for the new level
  userClickedPattern = [];

  // Increase level number
  level++;

  // Update level title
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Select a random color
  var randomChosenColour = buttonColours[randomNumber];

  // Add the new color to the game sequence
  gamePattern.push(randomChosenColour);

  // Animate the selected button
  $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

  // Play the corresponding sound
  playSound(randomChosenColour);

}


// Play button sounds
function playSound(name) {

  var audio = new Audio("./sounds/" + name + ".mp3");

  audio.play();

}


// Add button press animation
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {

    $("#" + currentColour).removeClass("pressed");

  }, 100);

}


// Check if the user's answer is correct
function checkAnswer(currentLevel) {

  // Compare the current user input with the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // If the user completed the full sequence correctly
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {

        nextSequence();

      }, 1000);

    }

  } else {

    // Play wrong sound
    playSound("wrong");

    // Add game over effect
    $("body").addClass("game-over");

    setTimeout(function () {

      $("body").removeClass("game-over");

    }, 200);

    // Update title text
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Restart the game
    startOver();

  }

}


// Reset the game variables
function startOver() {

  level = 0;

  gamePattern = [];

  started = false;

}