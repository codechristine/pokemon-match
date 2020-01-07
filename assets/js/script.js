$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 9;
var round = 1;
var gamesPlayed = 0;
var pokemonCount = 0;
var currentRound = -1;
var button = $('<button>');
var rounds = [
  {
    background: 'assets/images/background-images/bg-viridianForest.jpg',
    pokemon: [
      { pokemonType: 'caterpie', front: 'caterpie' },
      { pokemonType: 'caterpie', front: 'caterpie' },
      { pokemonType: 'exeggcutor', front: 'exeggcutor' },
      { pokemonType: 'exeggcutor', front: 'exeggcutor' },
      { pokemonType: 'farfetch', front: 'farfetch' },
      { pokemonType: 'farfetch', front: 'farfetch' },
      { pokemonType: 'jigglypuff', front: 'jigglypuff' },
      { pokemonType: 'jigglypuff', front: 'jigglypuff' },
      { pokemonType: 'Lickitung', front: 'Lickitung' },
      { pokemonType: 'Lickitung', front: 'Lickitung' },
      { pokemonType: 'oddish', front: 'oddish' },
      { pokemonType: 'oddish', front: 'oddish' },
      { pokemonType: 'scyther', front: 'scyther' },
      { pokemonType: 'scyther', front: 'scyther' },
      { pokemonType: 'snorlax', front: 'snorlax' },
      { pokemonType: 'snorlax', front: 'snorlax' },
      { pokemonType: 'tangela', front: 'tangela' },
      { pokemonType: 'tangela', front: 'tangela' },
    ]
  },
  {
    background: 'assets/images/background-images/bg-mtMoon.png',
    pokemon: [
      { pokemonType: 'abra', front: 'abra' },
      { pokemonType: 'abra', front: 'alakazam' },
      { pokemonType: 'clefairy', front: 'clefairy' },
      { pokemonType: 'clefairy', front: 'clefable' },
      { pokemonType: 'cubone', front: 'cubone' },
      { pokemonType: 'cubone', front: 'marowak' },
      { pokemonType: 'gastly', front: 'gastly' },
      { pokemonType: 'gastly', front: 'gengar' },
      { pokemonType: 'kabuto', front: 'kabuto' },
      { pokemonType: 'kabuto', front: 'kabutops' },
      { pokemonType: 'meowth', front: 'meowth' },
      { pokemonType: 'meowth', front: 'persian' },
      { pokemonType: 'nidorina', front: 'nidorina' },
      { pokemonType: 'nidorina', front: 'nidoqueen' },
      { pokemonType: 'omanyte', front: 'omanyte' },
      { pokemonType: 'omanyte', front: 'omastar' },
      { pokemonType: 'slowpoke', front: 'slowpoke' },
      { pokemonType: 'slowpoke', front: 'slowbro', },
    ]
  },
  {
    background: 'assets/images/background-images/bg-seafoamIsland.png',
    pokemon: [
      { pokemonType: 'krabby', front: 'krabby' },
      { pokemonType: 'krabby', front: 'kingler' },
      { pokemonType: 'horsea', front: 'horsea' },
      { pokemonType: 'horsea', front: 'seadra' },
      { pokemonType: 'magikarp', front: 'magikarp' },
      { pokemonType: 'magikarp', front: 'gyarados' },
      { pokemonType: 'poliwag', front: 'poliwag' },
      { pokemonType: 'poliwag', front: 'poliwhirl', },
      { pokemonType: 'psyduck', front: 'psyduck' },
      { pokemonType: 'psyduck', front: 'golduck' },
      { pokemonType: 'seel', front: 'seel' },
      { pokemonType: 'seel', front: 'dewgong' },
      { pokemonType: 'shellder', front: 'shellder' },
      { pokemonType: 'shellder', front: 'cloyster' },
      { pokemonType: 'staryu', front: 'staryu' },
      { pokemonType: 'staryu', front: 'starmie' },
      { pokemonType: 'tentacool', front: 'tentacool' },
      { pokemonType: 'tentacool', front: 'tentacruel' },
    ]
  },
  {
    background: 'assets/images/background-images/bg-viridianForest.jpg',
    pokemon: [
      { pokemonType: 'end', front: 'end'}
    ]
  },
]

function initializeApp() {
  resetAndLoadRound();
  shuffle();
  $('.modalNext').click(nextRound);
}

function resetAndLoadRound() {
  currentRound++;
  $('#pokemonArena').empty();
  shuffle();
  loadCurrentRound();
  $('.pokeball').on('click', handleCardClick);
}

function nextRound() {
  $('#modalShadow').toggleClass('hidden');
  $('.pokeball').toggleClass('hidden');
  resetStats();
  resetHealthBar();
  displayStats();
  resetAndLoadRound();
  shuffle();
  endGame();

}
function resetGame() {
  $('#modalShadow').toggleClass('hidden');
  $('#modalBody').removeClass('restartBody');
  $('#modalContent').removeClass('restartContent');
  $(button).addClass('playAgainButton').text('PLAY AGAIN');
  $('.playedNum').text('1 of 3');
  currentRound = 0;
  round = 1;
  gamesPlayed = 0;
  displayStats();
  resetStats();
  resetHealthBar();
  shuffle();
  loadCurrentRound();
  $('.pokeball').on('click', handleCardClick);
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
  var pokemon = $('<div>').addClass(pokemonClass).addClass('pokemon');

  card.append(pokeball, pokemon);
  $('#pokemonArena').append(card);
}

function handleCardClick(event) {
  $(this).addClass('hidden');
  clickedCard();
}

function allCardsAreMatched() {
  if (matches == maxMatches)
    $('#modalShadow').removeClass('hidden');
    $('#modalBody').css({ 'background-image': 'url("assets/images/misc-images/pika-winner.gif")' });
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
    $('.pokeball').addClass('avoidClicks');
    pokemonCount++;
    $('#modalContent').text('Caught all ' + pokemonCount + ' Pokemon!');
    $(button).addClass('modalNext').text('NEXT >');
    $('#modalContent').append(button);
    $(button).click(nextRound);
    matches++;
    allCardsAreMatched()
    displayStats()
    var opponentHealthBar = document.getElementById('opponentHealthBar');
    opponentHealthBar.value -= 10;
    firstCardClicked = null;
    secondCardClicked = null;
    setTimeout(function () {
      $('.pokeball').removeClass('avoidClicks')
      $(firstCardClicked).removeClass('hidden');
      $(secondCardClicked).removeClass('hidden');
    }, 500);
  } else if (urlFirstCard !== urlSecondCard) {
    $('.pokeball').addClass('avoidClicks');
    displayStats()
    var healthBar = document.getElementById('healthBar');
    healthBar.value -= 10;
    if (healthBar.value === 0) {
      if (pokemonCount === 0) {
        $('#modalContent').text('No Pokemon Caught.');
      } else {
        pokemonCount++;
        $('#modalContent').text('Only ' + pokemonCount + ' Pokemon Caught.');
      }
      $('#modalShadow').removeClass('hidden');
      $('#modalBody').css({'background-image': 'url("assets/images/misc-images/pika-loser.png")'});
      $(button).addClass('playAgainButton').text('PLAY AGAIN');
      $('#modalContent').append(button);
      $(button).on('click', function () {
        resetGame();
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
  if (matches === maxMatches) {
    gamesPlayed++;
    round++;
    displayStats();
    resetStats();
    updateText();
  }
}

function updateText() {
  $('.dialogue').text('Catch the Pokemon by Matching them & their Evolution');
}

function displayStats() {
  $('.playedNum').text(round);
  $('.accuracyNum').text(calculateAccuracy);
}

function calculateAccuracy() {
  var calculatedAccuracyResult = Math.round(matches / maxMatches * 100, 0) + '%'
  return calculatedAccuracyResult;
}

function resetStats() {
  matches = null;
  pokemonCount = 0;
}

function resetHealthBar() {
  var healthBar = document.getElementById('healthBar');
  var opponentHealthBar = document.getElementById('opponentHealthBar');
  healthBar.value = 100;
  opponentHealthBar.value = 100;
}

function endGame(){
  if(gamesPlayed === 3) {
    $('#modalShadow').removeClass('hidden');
    $('#modalBody').addClass('restartBody').css({ 'background-image': 'url("assets/images/misc-images/pika-end-winner.gif")' });

    $('#modalContent').addClass('restartContent').text('You caught all the Pokemon!');
    $(button).addClass('playAgainButton').text('PLAY AGAIN');
    $('#modalContent').append(button);
    $(button).on('click', function () {
       // window.location.reload();
      resetGame();
    });
  }
}
