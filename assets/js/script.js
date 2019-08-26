$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var currentRound = -1;
var rounds = [
  {
    background: '../images/pokemonimages/viridian-forest-1.jpg',
    pokemon: [
      { pokemonType: 'caterpie', front: 'caterpie' },
      { pokemonType: 'caterpie', front: 'caterpie' },
      { pokemonType: 'Lickitung', front: 'Lickitung' },
      { pokemonType: 'Lickitung', front: 'Lickitung' },
      { pokemonType: 'oddish', front: 'oddish' },
      { pokemonType: 'oddish', front: 'oddish' },
      { pokemonType: 'jigglypuff', front: 'jigglypuff' },
      { pokemonType: 'jigglypuff', front: 'jigglypuff' },
      { pokemonType: 'farfetch', front: 'farfetch' },
      { pokemonType: 'farfetch', front: 'farfetch' },
      { pokemonType: 'exeggcutor', front: 'exeggcutor' },
      { pokemonType: 'exeggcutor', front: 'exeggcutor' },
      { pokemonType: 'snorlax', front: 'snorlax' },
      { pokemonType: 'snorlax', front: 'snorlax' },
      { pokemonType: 'tangela', front: 'tangela' },
      { pokemonType: 'tangela', front: 'tangela' },
      { pokemonType: 'scyther', front: 'scyther' },
      { pokemonType: 'scyther', front: 'scyther' },
    ]
  },
  {
    background: '../images/pokemonimages/mtMoon.png',
    pokemon: [
      { pokemonType: 'cubone', front: 'cubone' },
      { pokemonType: 'cubone', front: 'marowak' },
      { pokemonType: 'slowpoke', front: 'slowpoke' },
      { pokemonType: 'slowpoke', front: 'slowbro', },
      { pokemonType: 'clefairy', front: 'clefairy' },
      { pokemonType: 'clefairy', front: 'clefable' },
      { pokemonType: 'meowth', front: 'meowth' },
      { pokemonType: 'meowth', front: 'persian' },
      { pokemonType: 'kabuto', front: 'kabuto' },
      { pokemonType: 'kabuto', front: 'kabutops' },
      { pokemonType: 'gastly', front: 'gastly' },
      { pokemonType: 'gastly', front: 'gengar' },
      { pokemonType: 'omanyte', front: 'omanyte' },
      { pokemonType: 'omanyte', front: 'omastar' },
      { pokemonType: 'abra', front: 'abra' },
      { pokemonType: 'abra', front: 'alakazam' },
      { pokemonType: 'nidorina', front: 'nidorina' },
      { pokemonType: 'nidorina', front: 'nidoqueen' },
    ]
  },
]

function initializeApp() {
 resetAndLoadRound();
//  openingScene();
  $('.modalClose').click(resetGame);
}

// function openingScene() {
//   var gameTitleContainer = $('<div>').addClass('gameTitleContainer');
//   var gameTitle = $('<h1>').addClass('gameTitle').text("CATCH 'EM ALL!");
//   var playGameButton = $('<button>').addClass('playGame').text('PLAY');
//   var audio = new Audio("SFX_TURN_ON_PC.wav");
//   var img = $('<img id="dynamic">');
//   $(gameTitleContainer).append(gameTitle, playGameButton, audio, img);
//   $('body').append(gameTitleContainer);
//   audio.play();

//   playGameButton.on('click', beginGame);
//     function beginGame() {
//       $('body').empty();
//     }
// }


function resetAndLoadRound() {
  currentRound++;
  $('#pokemonArena').empty();
  loadCurrentRound();
  $('.pokeball').on('click', handleCardClick);
}

function resetGame() {
  $('#modalShadow').toggleClass('hidden');
  $('.pokeball').toggleClass('hidden');
  resetStats();
  displayStats();
  resetAndLoadRound();
}

function loadCurrentRound() {
  var background = rounds[currentRound].background;
  var cards = rounds[currentRound].pokemon;
  $('#pokemonArena').empty();
  // $('body').css('background-image', "");
    for( var pokeI = 0; pokeI < cards.length; pokeI++){
    var currentCard = cards[pokeI];
    var currentBackground = background[pokeI];
      addCardToGameArea(currentCard.front, currentCard.pokemonType, currentBackground.background);
    }
}

function addCardToGameArea( pokemonClass, pokemonType ){
  var card = $("<div>").addClass('card');
  var pokeball = $("<div>").addClass('pokeball').attr('data-pokemon', pokemonType);
  var pokemon = $("<div>").addClass( pokemonClass);

  card.append( pokeball, pokemon);
  $("#pokemonArena").append(card);
}

function handleCardClick(event) {
  console.log(event);
  $(this).addClass('hidden');
  clickedCard();
}

function allCardsAreMatched() {
  if (matches == max_matches)
    $('#modalShadow').removeClass();
}


function clickedCard() {
  if (firstCardClicked == null) {
    firstCardClicked = $(event.currentTarget);
    return;
  }
  secondCardClicked = $(event.currentTarget);

  var urlFirstCard = firstCardClicked.attr('data-pokemon');
  console.log(urlFirstCard);
  var urlSecondCard = secondCardClicked.attr('data-pokemon');
  console.log(urlSecondCard);

    if (urlFirstCard === urlSecondCard) {
      console.log("Cards Match")
      $('.pokeball').addClass('avoid-clicks')
      matches++;
      attempts++;
      allCardsAreMatched()
      displayStats()
      firstCardClicked = null;
      secondCardClicked = null;
      setTimeout(function () {
        $('.pokeball').removeClass('avoid-clicks')
        $(firstCardClicked).removeClass('hidden');
        $(secondCardClicked).removeClass('hidden');
      }, 500);
    } else if (urlFirstCard !== urlSecondCard) {
      console.log('Cards Dont Match')
      $('.pokeball').addClass('avoid-clicks');
      attempts++;
      displayStats()
      setTimeout(function () {
        $(firstCardClicked).removeClass('hidden');
        firstCardClicked = null;
        $(secondCardClicked).removeClass('hidden');
        secondCardClicked = null;
        $('.pokeball').removeClass('avoid-clicks');
      }, 500);
  }
  if (matches === max_matches) {
    games_played++;
    displayStats();
    resetStats();
    $('.dialogue').text('Round #2 > Match the Pokemon and Their Evolution');
    $('body').css('background-image', 'url("../images/pokemonimages/mtMoon.png")');
  }
}

function displayStats() {
    $('.playedNum').text(games_played);
    $('.attemptNum').text(attempts);
    $('.accuracyNum').text(calculateAccuracy);
}

function calculateAccuracy() {
  var calculatedAccuracyResult = Math.round(matches / max_matches * 100, 0) + '%'
  return calculatedAccuracyResult;
}

function resetStats() {
  matches = null;
  attempts = 0;
}

// function shuffleDeck(rounds) {
//   var randomNumber = null;
//   var arrayLength = pokemon.length - 1
//   var j = 0;
//   for (var i = 0; i = arrayLength; i > 0 ; i -=1) {
//     j = Math.floor(Math.random() * (i +1));
//     randomNumber = pokemon[j];
//     array[j] = randomNumber;
//   }
// }
