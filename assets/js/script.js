$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var attempts = null;
var games_played = null;


function initializeApp() {

  $('.lfz-card').on('click', handleCardClick);
  $('.modalClose').click(function() {
      $('#modalShadow').addClass('hidden')
  });
}

function handleCardClick(event) {
  console.log(event);
  $(this).addClass('hidden');
  clickedCard();
  attempts++;
  games_played++;
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
      $('.lfz-card').addClass('avoid-clicks')
      matches++;
      allCardsAreMatched()
      firstCardClicked = null;
      secondCardClicked = null;
      setTimeout(function () {
        $('.lfz-card').removeClass('avoid-clicks')
        $(firstCardClicked).removeClass('hidden');
        $(secondCardClicked).removeClass('hidden');
      }, 1500);
    } else if (urlFirstCard !== urlSecondCard) {
      console.log('Cards Dont Match')
      $('.lfz-card').addClass('avoid-clicks');
      setTimeout(function () {
        $(firstCardClicked).removeClass('hidden');
        firstCardClicked = null;
        $(secondCardClicked).removeClass('hidden');
        secondCardClicked = null;
        $('.lfz-card').removeClass('avoid-clicks');
      }, 1500);
  }
}

function calculateAccuracy () {

}
