// Variables for match game
var width = 800, height = 600, cardWidth = 200, cardHeight = 200, pi = Math.PI;
var canvas, context;
var cover, circleGreen, circleOrange, circlePurple, 
    squareGreen, squareOrange, squarePurple;
var boardCoords = [
    [0, 0], [200, 0], [400, 0], [600, 0],
    [0, 200], [200, 200], [400, 200], [600, 200],
    [0, 400], [200, 400], [400, 400], [600, 400]
];
var cardArray, coverArray, circleGreenA, circleGreenB, circleOrangeA, circleOrangeB, 
    circlePurpleA, circlePurpleB, squareGreenA, squareGreenB, 
    squareOrangeA, squareOrangeB, squarePurpleA, squarePurpleB;
var mousePosition = {x:0, y:0};
var lastPosition = mousePosition;
var positionOne = mousePosition, positionTwo = mousePosition;
var clicks = 0, matchCount, moveCount;
var cardOne, cardTwo;
var gameWon = 6;
const playerBase = { name: null, score: null, date: null };
var scoreboard = [ playerBase, playerBase, playerBase, playerBase, playerBase, playerBase ];
var playerSave = null, saveState = null;

// Set green circle shape
circleGreen = {
  x: null,
  y: null,
  width: cardWidth,
  height: cardHeight,
  match: false,
  flipped: false,
  id: 'circleGreen',

  draw: function() {
    // Draw card background
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    // Draw card outline
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    // Draw card shape
    context.beginPath();
    context.fillStyle = 'green';
    context.arc(this.x + cardWidth/2, this.y + cardHeight/2, cardWidth/3, 2 * pi, false);
    context.fill();
  },

  flip: function() {
    if (this.flipped == false) {
      // Draw cover background
      context.fillStyle = 'black';
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    } else {
      // Make card visible
      context.fillRect(this.x + 1, this.y + 1, 0, 0);
    }
  }
};

// Set orange circle shape
circleOrange = {
  x: null,
  y: null,
  width: cardWidth,
  height: cardHeight,
  match: false,
  flipped: false,
  id: 'circleOrange',

  draw: function() {
    // Draw card background
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    // Draw card outline
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    // Draw card shape
    context.beginPath();
    context.fillStyle = 'orange';
    context.arc(this.x + cardWidth/2, this.y + cardHeight/2, cardWidth/3, 2 * pi, false);
    context.fill();
  },

  flip: function() {
    if (this.flipped == false) {
      // Draw cover background
      context.fillStyle = 'black';
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    } else {
      // Make card visible
      context.fillRect(this.x + 1, this.y + 1, 0, 0);
    }
  }
};

// Set purple circle shape
circlePurple = {
  x: null,
  y: null,
  width: cardWidth,
  height: cardHeight,
  match: false,
  flipped: false,
  id: 'circlePurple',

  draw: function() {
    // Draw card background
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    // Draw card outline
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    // Draw card shape
    context.beginPath();
    context.fillStyle = 'purple';
    context.arc(this.x + cardWidth/2, this.y + cardHeight/2, cardWidth/3, 2 * pi, false);
    context.fill();
  },

  flip: function() {
    if (this.flipped == false) {
      // Draw cover background
      context.fillStyle = 'black';
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    } else {
      // Make card visible
      context.fillRect(this.x + 1, this.y + 1, 0, 0);
    }
  }
};

// Set green square shape
squareGreen = {
  x: null,
  y: null,
  width: cardWidth,
  height: cardHeight,
  match: false,
  flipped: false,
  id: 'squareGreen',

  draw: function() {
    // Draw card background
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    // Draw card outline
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    // Draw card shape
    context.beginPath();
    context.fillStyle = 'green';
    context.fillRect(this.x + cardWidth/6, this.y + cardHeight/6, this.width/1.5, this.height/1.5);
  },

  flip: function() {
    if (this.flipped == false) {
      // Draw cover background
      context.fillStyle = 'black';
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    } else {
      // Make card visible
      context.fillRect(this.x + 1, this.y + 1, 0, 0);
    }
  }
};

// Set orange square shape
squareOrange = {
  x: null,
  y: null,
  width: cardWidth,
  height: cardHeight,
  match: false,
  flipped: false,
  id: 'squareOrange',

  draw: function() {
    // Draw card background
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    // Draw card outline
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    // Draw card shape
    context.beginPath();
    context.fillStyle = 'Orange';
    context.fillRect(this.x + cardWidth/6, this.y + cardHeight/6, this.width/1.5, this.height/1.5);
  },

  flip: function() {
    if (this.flipped == false) {
      // Draw cover background
      context.fillStyle = 'black';
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    } else {
      // Make card visible
      context.fillRect(this.x + 1, this.y + 1, 0, 0);
    }
  }
};

// Set purple square shape
squarePurple = {
  x: null,
  y: null,
  width: cardWidth,
  height: cardHeight,
  match: false,
  flipped: false,
  id: 'squarePurple',

  draw: function() {
    // Draw card background
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    // Draw card outline
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    // Draw card shape
    context.beginPath();
    context.fillStyle = 'Purple';
    context.fillRect(this.x + cardWidth/6, this.y + cardHeight/6, this.width/1.5, this.height/1.5);
  },

  flip: function() {
    if (this.flipped == false) {
      // Draw cover background
      context.fillStyle = 'black';
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    } else {
      // Make card visible
      context.fillRect(this.x + 1, this.y + 1, 0, 0);
    }
  }
};

// Copy Objects to separate objects
circleGreenA = Object.assign({}, circleGreen), circleGreenB = Object.assign({}, circleGreen);
circleOrangeA = Object.assign({}, circleOrange), circleOrangeB = Object.assign({}, circleOrange);
circlePurpleA = Object.assign({}, circlePurple), circlePurpleB = Object.assign({}, circlePurple);
squareGreenA = Object.assign({}, squareGreen), squareGreenB = Object.assign({}, squareGreen);
squareOrangeA = Object.assign({}, squareOrange), squareOrangeB = Object.assign({}, squareOrange);
squarePurpleA = Object.assign({}, squarePurple), squarePurpleB = Object.assign({}, squarePurple);

// Function to shuffle game cards
function shuffle(array) {
  var currentIndex, temporaryObj, randomIndex;

  currentIndex = array.length;

  // Check if there are any remaining elements to shuffle
  while (currentIndex !== 0) {
      // Pick random element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap with current element
      temporaryObj = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryObj;
  }

  return array;
};

// Populate game board
function initialize() {
  // Reset match counter
  matchCount = 0;
  getMatchCount();
 
  //Reset move counter
  moveCount = 0;
  getMoveCount();
 
 // Remove winning message
 var win = document.getElementById('winGame');
		win.innerHTML = '';
    
  // Array to store game cards
  cardArray = [circleGreenA, circleGreenB, circleOrangeA, circleOrangeB,
    circlePurpleA, circlePurpleB, squareGreenA, squareGreenB,
    squareOrangeA, squareOrangeB, squarePurpleA, squarePurpleB];
  
  // Cover any card that was flipped and set to unmatched
  for (var i = 0; i < cardArray.length; i++) {
      cardArray[i].flipped = false;
      cardArray[i].match = false;
  }

  // Shuffle cardArray
  cardArray = shuffle(cardArray);
   // Initialize Scoreboard if one does not exist yet
  if (JSON.parse(localStorage.getItem('scoreboard')) == null) {
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
  }

  // Populate Scoreboard
  updateScoreboard();
};

// Function to draw game board
function draw() {
  // Draw cards
  for (var i = 0; i < cardArray.length; i++) {
    let xCoord = boardCoords[i][0];
    let yCoord = boardCoords[i][1];

    // Set cards to appropriate part on board
    cardArray[i].x = xCoord;
    cardArray[i].y = yCoord;

    cardArray[i].draw();
    cardArray[i].flip();    // Initially sets cards to be covered
  }

  context.restore();
};

// Function to determine mouse position
function getMousePosition(canvas, mouseEvent) {
  var card = canvas.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - card.left,
    y: mouseEvent.clientY - card.top
  }
};

// Function to find which card is in a given clicked position
function cardFind(x, y) {
  for (var i = 0; i < cardArray.length; i++) {
    if (x >= boardCoords[i][0] && x <= boardCoords[i][0] + 200 &&
        y >= boardCoords[i][1] && y <= boardCoords[i][1] + 200) {
      cardArray[i].flipped = true;
      return cardArray[i];
    }
  }
};

// Function to check if cards match
function cardMatch(firstCard, secondCard) {
  // Only continue if both cards have no been matched already
  if (firstCard.match == false && secondCard.match == false) {
    if (firstCard.id == secondCard.id) {
      // If match, keep cards face up and set objects to matched
      firstCard.match = true;
      secondCard.match = true;

      // Increment match counter
      matchCount++;
      getMatchCount();
      
    }
    else {
      // If no match, flip cards back after 1 second
      setTimeout(function() {
        firstCard.flipped = false;
        secondCard.flipped = false;
      }, 450);
    }
    // Increment moves counter
      moveCount++;
      getMoveCount();
      if(matchCount === gameWon){
        gameOver();
    }
  }
};

// Function to display and return amount of currrent matches
function getMatchCount() {
  var matches = document.getElementById('matchCounter');
		matches.innerHTML = 'Matches: ' + matchCount;
};

// Function to display and return number of moves
function getMoveCount(){
  var moves = document.getElementById('moveCounter');
		moves.innerHTML = 'Moves: ' + moveCount;
};

//Function to check if game is over and display results
function gameOver(){
  // Clear match and moves counters
  var matches = document.getElementById('matchCounter');
	matches.innerHTML = '';
  var moves = document.getElementById('moveCounter');
	moves.innerHTML = '' ;
  //Display winning score
  var win = document.getElementById('winGame');
	win.innerHTML = 'Congrats! You won the game with ' + moveCount + ' moves!<br />Click the Start New Game button to play again.';
  //save winning to local storage
  var myDate = new Date();
  const player = { name: name, score: moveCount, date: myDate };

  if (JSON.parse(localStorage.getItem('scoreboard')) === null) {
    scoreboard[0] = player;
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
  } else {
    scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    scoreboard[5] = player;
    scoreboard.sort(function (playerA, playerB) {
      return (playerA.score === null) - (playerB.score === null) || playerA.score - playerB.score;
    });
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
  }
	
  // Update scoreboard
  updateScoreboard();

};

// Function to popoulate scoreboard
function updateScoreboard() {
  var first = document.getElementById('1st');
  var firstMove = document.getElementById('score1st');
  var firstDate = document.getElementById('dateOne');
  var second = document.getElementById('2nd');
  var secondMove = document.getElementById('score2nd');
  var secondDate = document.getElementById('dateTwo');
  var third = document.getElementById('3rd');
  var thirdMove = document.getElementById('score3rd');
  var thirdDate = document.getElementById('dateThree');
  var fourth = document.getElementById('4th');
  var fourthMove = document.getElementById('score4th');
  var fourthDate = document.getElementById('dateFour');
  var fifth = document.getElementById('5th');
  var fifthMove = document.getElementById('score5th');
  var fifthDate = document.getElementById('dateFive');

  
  if (JSON.parse(localStorage.getItem('scoreboard'))[0].name != null) {
    first.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[0].name;
    firstMove.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[0].score;
    firstDate.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[0].date;
  }
  
  if (JSON.parse(localStorage.getItem('scoreboard'))[1].name != null) {
    second.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[1].name;
    secondMove.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[1].score;
    secondDate.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[1].date;
  }

  if (JSON.parse(localStorage.getItem('scoreboard'))[2].name != null) {
    third.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[2].name;
    thirdMove.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[2].score;
    thirdDate.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[2].date;
  }

  if (JSON.parse(localStorage.getItem('scoreboard'))[3].name != null) {
    fourth.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[3].name;
    fourthMove.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[3].score;
    fourthDate.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[3].date;
  }

  if (JSON.parse(localStorage.getItem('scoreboard'))[4].name != null) {
    fifth.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[4].name;
    fifthMove.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[4].score;
    fifthDate.innerHTML = JSON.parse(localStorage.getItem('scoreboard'))[4].date;
  }
}

// Function to start new game
function newGame(){
  var newName = prompt('Enter a new player name or cancel to keep playing.');
  
  if (newName != null){
    name = newName;    
  };

	alert('Welcome ' + name + '! Click ok to start the game.');
	var greeting = document.getElementById('greet');
	greeting.innerHTML = 'Player: ' + name;    
    
  // Reset player save
  localStorage.setItem('save', null);

  // Initialize new game board
  initialize();
};
  
// Function to save current game state
function saveGame() {
  var saveIds = [], saveMatched = [], saveFlipped = [];

  for (var i in cardArray) {
    saveIds.push(cardArray[i].id);
    saveMatched.push(cardArray[i].match);
    saveFlipped.push(cardArray[i].flipped);
  }

  // Store player name, matches, moves, and card data
  playerSave = { name: name, matches: matchCount, moves: moveCount, 
      ids: saveIds, matched: saveMatched, flipped: saveFlipped};

  // Save player save into local storage
  localStorage.setItem('save', JSON.stringify(playerSave));
  console.log(JSON.parse(localStorage.getItem('save')));
};

// Function to restore previous game state
function restoreGame() {
  if (JSON.parse(localStorage.getItem('save')) != null) {
    var arrayIndex = cardArray.length;
    var tempArray = [];
    var tempObj;

    // Store saved state
    saveState = JSON.parse(localStorage.getItem('save'));

    name = saveState.name;
    matchCount = saveState.matches;
    moveCount = saveState.moves;

    // Restore match, move, and player name
    getMatchCount();
    getMoveCount();
    document.getElementById('greet').innerHTML = 'Player: ' + name;

    // Restore cards in saved order
    while (arrayIndex !== 0) {
      for (var i = 0; i < saveState.ids.length; i++) {
        for (var j in cardArray) {
          if (saveState.ids[i] == cardArray[j].id) {
            tempObj = cardArray.splice(j,1);
            tempArray.push(tempObj[0]);
            break;
          }
        }
      }
      arrayIndex--;
    }
    cardArray = tempArray.splice(0, tempArray.length);

    // Restore flipped and matched states
    for (var i in cardArray) {
      cardArray[i].match = saveState.matched[i];
      cardArray[i].flipped = saveState.flipped[i];
    }
  }
};

function main() {
  // Create and attach play field to body
  canvas = document.getElementById('gameboard');
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext('2d');

  initialize();

  // Drive game
  canvas.addEventListener('click', function(event) {
    if (clicks == 0) {
      positionTwo = null;
      lastPosition = getMousePosition(canvas, event);
      positionOne = lastPosition;
      cardOne = cardFind(positionOne.x, positionOne.y);
      clicks++;
    } else if (clicks == 1) {
      lastPosition = getMousePosition(canvas, event);
      positionTwo = lastPosition;
      if (cardFind(positionTwo.x, positionTwo.y) !== cardOne) {
        cardTwo = cardFind(positionTwo.x, positionTwo.y);
        cardMatch(cardOne, cardTwo);
        clicks--;
      }
    };
  }, false);

  var loop = function() {
    draw();

    window.requestAnimationFrame(loop, canvas);
  };
  window.requestAnimationFrame(loop, canvas);
};

// Start game
main();
