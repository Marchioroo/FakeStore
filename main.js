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

const urlApi = 'https://fakestoreapi.com/products';

// Função para tratar os dados recebidos da API
function processarDados(data) {
    console.log('Dados recebidos da API:', data);
    let card = document.getElementsByClassName('card-wrapper');
    let cardAtual = card[0];
    

    data.forEach(element => {
      cardAtual.innerHTML += 
      `<div class="card1 swiper-slide">
                                <div class="image-content">
                                    <span class="overlay"> </span>
                                    <div class="card-image">
                                        <img src="${element.image}" class="card-img" alt="">
                                    </div>

                                </div>
                                <div class="card-content">
                                    <div class="rating">
                                        <input type="radio" name="star" id="star5"><label for="star5">★</label>
                                        <input type="radio" name="star" id="star4"><label for="star4">★</label>
                                        <input type="radio" name="star" id="star3"><label for="star3">★</label>
                                        <input type="radio" name="star" id="star2"><label for="star2">★</label>
                                        <input type="radio" name="star" id="star1"><label for="star1">★</label>
                                    </div>
                                    <h2 class="name">${element.title}</h2>
                                    <p class="description">R$${element.price}</p>
                                    <button class="button"> Comprar </button>
                                </div>
                            </div>`
    });
}


function tratarErro(error) {
    console.error('Erro ao consumir a API:', error);
}

fetch(urlApi)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json(); // Converte a resposta em JSON
  })
  .then(processarDados)  
  .catch(tratarErro);     


  let categoria = () => {
    
  

}

  categoria();

 