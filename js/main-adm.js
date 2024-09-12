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
    let dados = data.length;
    console.log(dados);
    let productsValue = document.getElementById('productsValue');
    productsValue.innerHTML = dados;

}

///////////////////////////////////////////////
const box = document.querySelectorAll('.box');
const botaoVoltar = document.querySelector('.titleVoltar');
const rowInformations = document.querySelector('.row-informations');

function buscarProdutos() {
    const urlApi = 'https://fakestoreapi.com/products';

    fetch(urlApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            return response.json(); // Converte a resposta em JSON

        })
        .then(processarDados) // Chama a função processarDados com os dados
        .catch(tratarErro);

    function tratarErro(error) {
        console.error('Erro ao consumir a API:', error);
    }


    function processarDados(data) {
        console.log(data);
        const tables = document.querySelector('.tables');
        tables.classList.add('active');

        let tableContent = `
        <table class="table table-hover table-danger col-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col" class="email">Valor</th>
                    <th scope="col">Categoria</th>
                    <th scope="col" class="acoes">Ações</th>
                </tr>
            </thead>
            <tbody>`;

        data.forEach((data) => {
            tableContent += `
                <tr class="tr">
                    <th scope="row" class="idProduto">${data.id}</th>
                    <td class="user">${data.title}</td>
                    <td class="email"> R$ ${data.price}</td>
                    <td class="email">${data.category}</td>
                 <td class="buttonDelete" id="produtoDelete">Deletar</td>
                </tr>
            `;


        });

        tableContent += `
            </tbody>
        </table>`;


        tables.innerHTML = tableContent;
        
        document.querySelectorAll('#produtoDelete').forEach(element =>{
            element.addEventListener('click', (e)=>{
                let row = e.target.closest('tr');
                
                let id = row.querySelector('.idProduto');
                let idProduto = id.textContent;
                

                removerProduto(idProduto);
                row.remove();
                
                
            })
        })
        

    }

  

}


function removerProduto(productId) {
    fetch(`${urlApi}/${productId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao remover o produto: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Produto removido:', data);
            
        })
        .catch(error => {
            console.error('Erro:', error);
        });

       

}


box.forEach(element => {
    element.addEventListener('click', () => {

        const boxes = document.getElementsByClassName('boxes');
        const botaoCadastrar = document.getElementsByClassName('titleCadastrar');
        const tables = document.querySelector('.tables');
        console.log(botaoCadastrar)
        console.log(element.id);

        //////////////////////// usuarios /////////////////////////////////
        //////////////////////// usuarios /////////////////////////////////
        //////////////////////// usuarios /////////////////////////////////

        if (element.id === 'idUser') {

            boxes[0].classList.add('disabled');
            botaoVoltar.classList.add('active');
            tables.classList.add('active');
            botaoCadastrar[0].classList.remove('active');
            rowInformations.classList.add('active')
            const users = JSON.parse(localStorage.getItem('usuarios')) || [];



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
        //////////////////////// produtos /////////////////////////////////
        //////////////////////// produtos /////////////////////////////////
        //////////////////////// produtos /////////////////////////////////
        if (element.id === 'idProducts') {
            boxes[0].classList.add('disabled');
            botaoVoltar.classList.add('active');
            botaoCadastrar[0].classList.add('active');
            rowInformations.classList.add('active');

            buscarProdutos();

        }

        if (element.id === 'idCostumers') {
            boxes[0].classList.add('disabled');
            botaoVoltar.classList.add('active');
            botaoCadastrar[0].classList.add('active');
            rowInformations.classList.add('active');

            

        }



    });
});


botaoVoltar.addEventListener('click', () => {
    const boxes = document.getElementsByClassName('boxes');
    const botaoCadastrar = document.getElementsByClassName('titleCadastrar');
    const tables = document.querySelector('.tables');

    boxes[0].classList.remove('disabled');
    botaoCadastrar[0].classList.remove('active');
    botaoVoltar.classList.remove('active');
    tables.classList.remove('active');
    rowInformations.classList.remove('active');


})


