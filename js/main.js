document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 40,
    slidesPerGroup: 3,
    centerSlide: 'true',
    fade: 'true',
    loop: false,
    gragCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
      520: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      950: {
        slidesPerView: 3,
      }
    }
  });
});

const urlApi = 'https://fakestoreapi.com/products';

// Função para tratar os dados recebidos da API
function processarDados(data) {
  // console.log('Dados recebidos da API:', data);


  data.forEach(element => {
    let card = document.getElementsByClassName('card-wrapper');
    let cardAtual = card[0];
    cardAtual.innerHTML +=
      `<div class="card1 swiper-slide">
                                <div class="image-content">
                                    <span class="overlay"> </span>
                                    <div id="${element.id}">${element.id}</div>
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
                                    <button class="button"> Detalhes </button>
                                </div>
                            </div>`
  });
  let categorias = document.querySelectorAll('.categoria-item');

  categorias.forEach(categoria => {
    categoria.addEventListener('click', (e) => {
      let card = document.getElementsByClassName('card-wrapper');
      let cardAtual = card[0];
    //limpa o bloco antes de apresentar um novo
      cardAtual.innerHTML = '';
        // Encontra o contêiner mais próximo com a classe 'categoria-item'
        let container = e.currentTarget;
        console.log(container);

        // Encontra o span dentro do contêiner
        let span = container.querySelector('span');

        if (span) {
            let spanClicado = span.textContent.trim(); // isso faz com que a variavel seja limpaqaa
            if (typeof data !== 'undefined') {
              data.forEach(elemento => {
                  if (elemento.category === spanClicado) {
                      console.log('Categoria clicada:', elemento.category);

                      //insere por categoria
                      cardAtual.innerHTML +=
                          `<div class="card1 swiper-slide">
                              <div class="image-content">
                                  <span class="overlay"></span>
                                  <div class="card-image">
                                      <img src="${elemento.image}" class="card-img" alt="">
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
                                  <h2 class="name">${elemento.title}</h2>
                                  <p class="description">R$${elemento.price}</p>
                                  <button class="button"> Detalhes </button>
                              </div>
                          </div>`
                      
                  }
              });
          } else {
              console.error('A variável "data" não está definida.');
          }
            
            
            // Adicione sua lógica aqui para usar o texto do span
        } else {
            console.error('Nenhum span encontrado dentro do contêiner clicado.');
        }
    });
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



