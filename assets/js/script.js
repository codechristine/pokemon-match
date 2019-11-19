$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 1;
var attempts = 0;
var games_played = 0;
var currentRound = -1;
var playAgainButton = $('<button>').addClass('playAgainButton').text('PLAY AGAIN');
var rounds = [
  {
    background: 'assets/images/main-images/bg-viridianForest.jpg',
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
    background: 'assets/images/main-images/bg-mtMoon.png',
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
  {
    background: 'assets/images/main-images/seafoamIsland.png',
    pokemon: [
      { pokemonType: 'psyduck', front: 'psyduck' },
      { pokemonType: 'psyduck', front: 'golduck' },
      { pokemonType: 'poliwag', front: 'poliwag' },
      { pokemonType: 'poliwag', front: 'poliwhirl', },
      { pokemonType: 'tentacool', front: 'tentacool' },
      { pokemonType: 'tentacool', front: 'tentacruel' },
      { pokemonType: 'seel', front: 'seel' },
      { pokemonType: 'seel', front: 'dewgong' },
      { pokemonType: 'shellder', front: 'shellder' },
      { pokemonType: 'shellder', front: 'cloyster' },
      { pokemonType: 'krabby', front: 'krabby' },
      { pokemonType: 'krabby', front: 'kingler' },
      { pokemonType: 'horsea', front: 'horsea' },
      { pokemonType: 'horsea', front: 'seadra' },
      { pokemonType: 'staryu', front: 'staryu' },
      { pokemonType: 'staryu', front: 'starmie' },
      { pokemonType: 'magikarp', front: 'magikarp' },
      { pokemonType: 'magikarp', front: 'gyarados' },
    ]
  },
  // {
  //   background: 'assets/images/main-images/pikaIntro.gif',
  // },
]

function initializeApp() {
  // loadIntro();
  resetAndLoadRound();
  shuffle();
  $('#modalNext').click(resetGame);
}

// function loadIntro() {
//   $('body').css({ 'background-image': 'url("assets/images/main-images/pikaIntro.gif")', 'opacity': '0' })

//   var startButton = $('<button>').addClass('startButton').text('start game');
//   $('body').append(startButton);
//   $(startButton).click(loadFirstRound);
// }

// function loadFirstRound() {
//   resetAndLoadRound();
//   loadCurrentRound();
//   shuffle();
//   $('#modalNext').click(resetGame);
// }

function resetAndLoadRound() {
  currentRound++;
  $('#pokemonArena').empty();
  shuffle();
  loadCurrentRound();
  $('.pokeball').on('click', handleCardClick);
  $('#rocket').addClass('hidden')
}

function resetGame() {
  $('#modalShadow').toggleClass('hidden');
  $('.pokeball').toggleClass('hidden');
  resetStats();
  displayStats();
  resetAndLoadRound();
  shuffle();
}

function shuffle() {
  for (var i = rounds[currentRound].pokemon.length - 1; i > 0; i--) {
    var randomPosition = Math.floor(Math.random() * i);
    var temp = rounds[currentRound].pokemon[i];
    rounds[currentRound].pokemon[i] = rounds[currentRound].pokemon[randomPosition];
    rounds[currentRound].pokemon[randomPosition] = temp;
  }
}

function loadCurrentRound() {
  var background = rounds[currentRound].background;
  var cards = rounds[currentRound].pokemon;
  $('#pokemonArena').empty();
  $('body').css({ 'background-image': `url(${background})` });
  for (var pokeI = 0; pokeI < cards.length; pokeI++) {
    var currentCard = cards[pokeI];
    var currentBackground = background[pokeI];
    addCardToGameArea(currentCard.front, currentCard.pokemonType, currentBackground.background);
  }
}

function addCardToGameArea(pokemonClass, pokemonType) {
  var card = $('<div>').addClass('card');
  var pokeball = $('<div>').addClass('pokeball').attr('dataPokemon', pokemonType);
  var pokemon = $('<div>').addClass(pokemonClass);

  card.append(pokeball, pokemon);
  $('#pokemonArena').append(card);
}

function handleCardClick(event) {
  $(this).addClass('hidden');
  clickedCard();
}

function allCardsAreMatched() {
  if (matches == max_matches)
    $('#modalShadow').removeClass('hidden');
}

function clickedCard() {
  if (firstCardClicked == null) {
    firstCardClicked = $(event.currentTarget);
    return;
  }
  secondCardClicked = $(event.currentTarget);

  var urlFirstCard = firstCardClicked.attr('dataPokemon');
  var urlSecondCard = secondCardClicked.attr('dataPokemon');

  if (urlFirstCard === urlSecondCard) {
    $('.pokeball').addClass('avoidClicks')
    matches++;
    attempts++;
    allCardsAreMatched()
    displayStats()
    firstCardClicked = null;
    secondCardClicked = null;
    setTimeout(function () {
      $('.pokeball').removeClass('avoidClicks')
      $(firstCardClicked).removeClass('hidden');
      $(secondCardClicked).removeClass('hidden');
    }, 500);
  } else if (urlFirstCard !== urlSecondCard) {
    $('.pokeball').addClass('avoidClicks');
    attempts++;
    displayStats()
    let healthBar = document.getElementById("healthBar")
    healthBar.value -= 10;
      if(healthBar.value === 0) {
        $('#modalShadow').removeClass('hidden');
        $('#modalContent').text('No Pokemon Caught');
        $('#modalContent').append(playAgainButton);
        $(playAgainButton).on("click", function () {
          window.location.reload();
        });
      }
    setTimeout(function () {
      $(firstCardClicked).removeClass('hidden');
      firstCardClicked = null;
      $(secondCardClicked).removeClass('hidden');
      secondCardClicked = null;
      $('.pokeball').removeClass('avoidClicks');
    }, 500);
  }
  if (matches === max_matches) {
    games_played++;
    displayStats();
    resetStats();
    updateText();
  }
}

function updateText() {
  $('.dialogue').text('Catch the Pokemon by Matching them & their Evolution');
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

// function winCondition() {
//   if (healthBar.value === 0) {
//     $('#modalShadow').removeClass('hidden').css({}).text("Sorry");
//     $('#modalNext').on("click", function () {
//       window.location.reload();
//     });
//   }
// }
