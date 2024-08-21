document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 40,
    slidesPerGroup: 3,
    centerSlide:'true',
    fade:'true',
    loop: false,
    gragCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets:true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
    0:{
      slidesPerView:1,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },
    520:{
      slidesPerView:2,
      spaceBetween: 30,
    },
    950:{
      slidesPerView:3,
    }
  }
  });
});

const urlApi = 'https://fakestoreapi.com/products/categories';


fetch(urlApi) 
 .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json(); 
    
    // Converte a resposta em JSON
  }) .then(data => {
    console.log('Dados recebidos da API:', data);
    data.forEach(element => {
        console.log(element)
    
   });
  })
  .catch(error => {
    console.error('Erro ao consumir a API:', error);
  });