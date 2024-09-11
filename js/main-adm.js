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
const botaoVoltar = document.querySelector('.titleVoltar');
const rowInformations = document.querySelector('.row-informations');



box.forEach(element => {
    element.addEventListener('click', () => {
        const boxes = document.getElementsByClassName('boxes');
        console.log(element.id);

        if (element.id === 'idUser') {
            boxes[0].classList.add('disabled');
            rowInformations.classList.add('active');

            const users = JSON.parse(localStorage.getItem('usuarios')) || [];

            const tables = document.querySelector('.tables');

            let tableContent = `
            <table class="table table-hover table-danger col-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col" class="email">E-mail</th>
                        <th scope="col">Situação</th>
                    </tr>
                </thead>
                <tbody>`;

            // Loop para popular as linhas da tabela dinamicamente
            users.forEach((user, index) => {
                tableContent += `
                    <tr class="tr">
                        <th scope="row">${index + 1}</th>
                        <td class="user">${user.user}</td>
                        <td class="email">${user.email}</td>
                        <td class="buttonDelete" id="buttonDelete">Deletar</td>
                        
                    </tr>
                `;


            });

            tableContent += `
                </tbody>
            </table>`;


            tables.innerHTML = tableContent;

            let buttonDelete = document.querySelectorAll('.buttonDelete');

            if (buttonDelete) {
                buttonDelete.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const row = e.target.closest('tr'); // 'tr' onde o botão foi clicado
                        console.log(row)

                        const userCell = row.querySelector('.user');
                        console.log(userCell)

                        const userName = userCell.textContent;

                        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                        const novoArray = usuarios.filter(user => user.user !== userName);

                        localStorage.setItem('usuarios', JSON.stringify(novoArray));
                        row.remove();
                    });
                });

            }

        }
    });
});


botaoVoltar.addEventListener('click', () => {
    const boxes = document.getElementsByClassName('boxes');

    boxes[0].classList.remove('disabled');
    rowInformations.classList.remove('active');

})


