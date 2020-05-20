$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    let length = $(this).val().length;
    length = 140 - length;
    let updatedCount = $(this).siblings('div').find('.chCounter').html(length);
    if (length < 0) {
      updatedCount.addClass('turn-red');
    } else {
      updatedCount.removeClass('turn-red');
    }
  });
});