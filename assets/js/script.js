$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;


function initializeApp() {

  $('.pokemon-card').on('click', handleCardClick);
  $('.modalClose').click(function() {
      $('#modalShadow').toggleClass('hidden');
    $('.pokemon-card').toggleClass('hidden');
      resetStats();
      displayStats();
  });
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
  $('.modal-footer').on('click', function(){
      $('.modal-footer'.addClass('hidden'))
  })


function clickedCard() {
  if (firstCardClicked == null) {
    firstCardClicked = $(event.currentTarget);
    return;
  }
  secondCardClicked = $(event.currentTarget);

  var urlFirstCard = firstCardClicked.siblings().css('background-image');
  console.log(urlFirstCard);
  var urlSecondCard = secondCardClicked.siblings().css('background-image');
  console.log(urlSecondCard);

    if (urlFirstCard === urlSecondCard) {
      console.log("Cards Match")
      $('.pokemon-card').addClass('avoid-clicks')
      matches++;
      attempts++;
      allCardsAreMatched()
      displayStats()
      firstCardClicked = null;
      secondCardClicked = null;
      setTimeout(function () {
        $('.pokemon-card').removeClass('avoid-clicks')
        $(firstCardClicked).removeClass('hidden');
        $(secondCardClicked).removeClass('hidden');
      }, 800);
    } else if (urlFirstCard !== urlSecondCard) {
      console.log('Cards Dont Match')
      $('.pokemon-card').addClass('avoid-clicks');
      attempts++;
      displayStats()
      setTimeout(function () {
        $(firstCardClicked).removeClass('hidden');
        firstCardClicked = null;
        $(secondCardClicked).removeClass('hidden');
        secondCardClicked = null;
        $('.pokemon-card').removeClass('avoid-clicks');
      }, 800);
  }
  if (matches === max_matches) {
    games_played++;
    displayStats();
    resetStats();
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
