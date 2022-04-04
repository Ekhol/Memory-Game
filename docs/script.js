const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let first = null;
let second = null;
let clickCount = 0;
let stopClick = false;

// TODO: Implement this function!
function handleCardClick(event) {
  if (stopClick) return;
  if (event.target.classList.contains('clicked')) return;

  let activeClick = event.target;
  activeClick.style.backgroundColor = activeClick.classList[0];

  if (!first || !second) {
    activeClick.classList.add('clicked');
    first = first || activeClick;
    second = activeClick === first ? null : activeClick;
  }

  if (first && second) {
    stopClick = true;

    let alpha = first.className;
    let beta = second.className;

    if (alpha === beta) {
      clickCount += 2;
      first.removeEventListener('click', handleCardClick);
      second.removeEventListener('click', handleCardClick);
      first = null;
      second = null;
      stopClick = false;
    }

    else {
      setTimeout (function() {
        first.style.backgroundColor = '';
        second.style.backgroundColor = '';
        first.classList.remove('clicked');
        second.classList.remove('clicked');
        first = null;
        second = null;
        stopClick = false;
      }, 500)
    }
  }
  if (clickCount === COLORS.length) {
    alert ('You Matched Them All!');
  }
}
function reset() {
  window.location.reload();
}

// when the DOM loads
createDivsForColors(shuffledColors);
