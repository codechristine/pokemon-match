$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 1;
var attempts = 0;
var gamesPlayed = 0;
var currentRound = -1;
var playAgainButton = $('<button>').addClass('playAgainButton').text('PLAY AGAIN');
var rounds = [
  {
    background: 'assets/images/main-images/bg-viridianForest.jpg',
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
    background: 'assets/images/main-images/bg-mtMoon.png',
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
    background: 'assets/images/main-images/bg-seafoamIsland.png',
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
    background: 'assets/images/main-images/bg-unownDungeon.png',
    pokemon: [
      { pokemonType: 'a', front: 'a' },
      { pokemonType: 'b', front: 'b' },
      { pokemonType: 'c', front: 'c' },
      { pokemonType: 'd', front: 'd' },
      { pokemonType: 'e', front: 'e' },
      { pokemonType: 'f', front: 'f' },
      { pokemonType: 'g', front: 'g' },
      { pokemonType: 'h', front: 'h' },
      { pokemonType: 'i', front: 'i' },
      { pokemonType: 'j', front: 'j' },
      { pokemonType: 'k', front: 'k' },
      { pokemonType: 'l', front: 'l' },
      { pokemonType: 'm', front: 'm' },
      { pokemonType: 'n', front: 'n' },
      { pokemonType: 'o', front: 'o' },
      { pokemonType: 'p', front: 'p' },
      { pokemonType: 'q', front: 'q' },
      { pokemonType: 'r', front: 'r' },
      { pokemonType: 's', front: 's' },
      { pokemonType: 't', front: 't' },
      { pokemonType: 'u', front: 'u' },
      { pokemonType: 'v', front: 'v' },
      { pokemonType: 'w', front: 'w' },
      { pokemonType: 'x', front: 'x' },
      { pokemonType: 'z', front: 'z' },
      { pokemonType: 'dash', front: 'dash' },
      { pokemonType: 'exclam', front: 'exclam' },
    ]
  },
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
  resetHealthBar();
  displayStats();
  resetAndLoadRound();
  animateUnown('.a');
  animateUnown('.b');
  animateUnown('.c');
  animateUnown('.d');
  animateUnown('.e');
  animateUnown('.f');
  animateUnown('.g');
  animateUnown('.h');
  animateUnown('.i');
  animateUnown('.j');
  animateUnown('.k');
  animateUnown('.l');
  animateUnown('.m');
  animateUnown('.n');
  animateUnown('.o');
  animateUnown('.p');
  animateUnown('.q');
  animateUnown('.r');
  animateUnown('.s');
  animateUnown('.t');
  animateUnown('.u');
  animateUnown('.v');
  animateUnown('.w');
  animateUnown('.x');
  animateUnown('.y');
  animateUnown('.z');
  animateUnown('.dash');
  animateUnown('.exclam');
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
  if (matches == maxMatches)
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
    var healthBar = document.getElementById("healthBar");
    healthBar.value -= 10;
    if (healthBar.value === 0) {
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
  if (matches === maxMatches) {
    gamesPlayed++;
    displayStats();
    resetStats();
    updateText();
  }
}

function updateText() {
  $('.dialogue').text('Catch the Pokemon by Matching them & their Evolution');
}

function displayStats() {
  $('.playedNum').text(gamesPlayed);
  $('.attemptNum').text(attempts);
  $('.accuracyNum').text(calculateAccuracy);
}

function calculateAccuracy() {
  var calculatedAccuracyResult = Math.round(matches / maxMatches * 100, 0) + '%'
  return calculatedAccuracyResult;
}

function resetStats() {
  matches = null;
  attempts = 0;
}

function resetHealthBar() {
  var healthBar = document.getElementById("healthBar");
  healthBar.value = 100;
}

function makeNewPosition() {
  var h = $('#pokemonArena').height() - 50;
  var w = $('#pokemonArena').width() - 50;
  console.log(h);
  console.log(w);

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];
}

// function animateRound2(){
//   if(gamesPlayed === 2){

//   }
// }

function animateUnown(myclass) {
  if (gamesPlayed === 3) {
    var newPosition = makeNewPosition();
    $(myclass).animate({ top: newPosition[0], left: newPosition[1] }, 2500, function () {
      animateUnown(myclass);
    })
  }
  return;
}
