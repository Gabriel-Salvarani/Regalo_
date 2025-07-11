new Swiper('.card-wrapper', {
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

});new Swiper('.card-wrapper', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.swiper').forEach((swiperElement) => {
      new Swiper(swiperElement, {
          loop: true, // Hace que el carrusel sea infinito
          navigation: { 
              nextEl: swiperElement.querySelector('.swiper-button-next'), 
              prevEl: swiperElement.querySelector('.swiper-button-prev') 
          },
          pagination: {
              el: swiperElement.querySelector('.swiper-pagination'),
              clickable: true
          }
      });
  });
});

