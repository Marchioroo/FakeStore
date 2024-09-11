const menu = document.getElementById('menu');

menu.onmouseover = function () {
    menu.style.width = '250px';
};

menu.onmouseout = function () {
    menu.style.width = '62px';
};

////////////////////////////////////////////////////////////////////////////

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
console.log(usuarios.length);

let userValue = document.getElementById('userValue');
userValue.innerHTML = usuarios.length;

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const urlApi = 'https://fakestoreapi.com/products';
fetch(urlApi)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json(); // Converte a resposta em JSON
    })
    .then(processarDados)
    .catch(tratarErro);

function tratarErro(error) {
    console.error('Erro ao consumir a API:', error);
}



// Função para tratar os dados recebidos da API
function processarDados(data) {
    console.log(data.length);
    let productsValue = document.getElementById('productsValue');
    productsValue.innerHTML = data.length;

}

///////////////////////////////////////////////
const box = document.querySelectorAll('.box');

box.forEach(element =>{
    element.addEventListener('click', () =>{
        console.log(element.id);
    })
    
})