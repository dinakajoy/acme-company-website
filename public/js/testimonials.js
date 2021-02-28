$(document).ready(function () {
  $('.client-single').on('click', function (event) {
    event.preventDefault();

    let active = $(this).hasClass('active');
    let parent = $(this).parents('.testi-wrap');

    if (!active) {
      let activeBlock = parent.find('.client-single.active');
      let currentPos = $(this).attr('data-position');
      let newPos = activeBlock.attr('data-position');

      activeBlock.removeClass('active').removeClass(newPos).addClass('inactive').addClass(currentPos);
      activeBlock.attr('data-position', currentPos);

      $(this).addClass('active').removeClass('inactive').removeClass(currentPos).addClass(newPos);
      $(this).attr('data-position', newPos);
    }
  });
}(jQuery));
