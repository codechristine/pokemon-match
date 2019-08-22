$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp() {

  $('.lfz-card').on('click', handleCardClick);
}

function handleCardClick(event) {
  console.log(event);
  $(this).addClass('hidden');
  clickedCard();
}

function clickedCard() {
  if (firstCardClicked == null) {
    firstCardClicked = $(event.currentTarget);
  }
  else if (firstCardClicked) {
    secondCardClicked = $(event.currentTarget);
  }

  var urlFirstCard = firstCardClicked.siblings().css('background-image');
  console.log(urlFirstCard);
  var urlSecondCard = secondCardClicked.siblings().css('background-image');
  console.log(urlSecondCard);

  if (urlFirstCard === urlSecondCard) {
    console.log("Cards Match")
    $('.lfz-card').addClass('avoid-clicks')
    matches++;
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
