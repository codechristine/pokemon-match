$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
// var audio = new Audio("SFX_TURN_ON_PC.wav");
var currentRound = 0;
var rounds = [
  {
    background: "../images/pokemonimages/viridian-forest-1.jpg",
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
    background: "../images/pokemonimages/mtMoon.png",
    pokemon: [
      { pokemonType: 'cubone', front: 'cubone' },
      { pokemonType: 'cubone', front: 'marowak' },
      { pokemonType: 'slowpoke', front: 'slowpoke' },
      { pokemonType: 'slowpoke', front: 'slowbrow' },
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
      { pokemonType: 'abra', front: 'Alakazam' },
      // { pokemonType: 'clefairy', front: 'clefairy' },
      // { pokemonType: 'clefairy', front: 'clefable' },
    ]
  },
]

function initializeApp() {
  // audio.play();
  loadCurrentRound();
  shuffleDeck();
  $('.pokeball').on('click', handleCardClick);
  $('.modalClose').click(function() {
      $('#modalShadow').toggleClass('hidden');
    $('.pokeball').toggleClass('hidden');
      resetStats();
      displayStats();
  });
}

function loadCurrentRound() {
  var background = rounds[currentRound].background;
  var cards = rounds[currentRound].pokemon;
  $('#pokemonArena').empty();
    for( var pokeI = 0; pokeI < cards.length; pokeI++){
    var currentCard = cards[pokeI];
    addCardToGameArea( currentCard.front, currentCard.pokemonType);
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
  // $('.modal-footer').on('click', function(){
  // $('.modal-footer'.addClass('hidden'))
  // })


function clickedCard() {
  if (firstCardClicked == null) {
    firstCardClicked = $(event.currentTarget);
    return;
  }
  secondCardClicked = $(event.currentTarget);

  var urlFirstCard = firstCardClicked.attr('data-pokemon');
// var urlFirstCard = firstCardClicked.siblings().css('background-image');
  console.log(urlFirstCard);
  var urlSecondCard = secondCardClicked.attr('data-pokemon');
// var urlSecondCard = secondCardClicked.siblings().css('background-image');
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
    shuffleDeck();
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

// function shuffleDeck(pokemon) {
//   var randomNumber;
//   var arrayLength = pokemon.length - 1
//   var spotHolder;
//   for (var i = 0; i < arrayLength; i++) {
//     randomNumber = Math.floor(Math.random() * (pokemon.length));
//     spotHolder = pokemon[i];
//     pokemon[i] = pokemon[randomNumber];
//     pokemon[randomNumber] = spotHolder;
//   }
//   return pokemon;
// }

function shuffleDeck() {
  for (var i = 0, i < rounds.pokemon[pokemonType], i++) {
    randomNumber = Math.floor(Math.random() * rounds.pokemon[pokemonType]);
  }
  return rounds.pokemon[pokemonType];
}

  // $('.modalClose').on('click', loadCurrentRound());
