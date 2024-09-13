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
                    <th scope="col" class="categoria" >Categoria</th>
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

        document.querySelectorAll('#produtoDelete').forEach(element => {
            element.addEventListener('click', (e) => {
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


function buscarClientes() {
    const urlApi = 'https://fakestoreapi.com/users';

    fetch(urlApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            return response.json(); // Converte a resposta em JSON

        })
        .then(processarDados) // Chama a função processarDados com os dados
        .catch(tratarErro);

    function processarDados(data) {
        console.log(data);
        const tables = document.querySelector('.tables');
        tables.classList.add('active');

        let tableContent = `
        <table class="table tableColapse table-hover table-danger col-md-12 col-12 ">
            <thead class="thead">
                <tr>
                    <th scope="col" class="idUser">#</th>
                    <th scope="col">Usuário</th>
                    <th scope="col" class="name">Nome</th>
                    <th scope="col" class="emailColapse">E-mail</th>
                    
                    <th scope="col" class="acoes d-flex justify-content-between">

                        <span class="phone"> Telefone </span> 
                        <span class="action"> Ação </span>

                    </th>
                    
                </tr>
            </thead>
            <tbody>`;

        // Loop através dos dados e criar linhas da tabela com funcionalidade de expansão
        data.forEach((data, index) => {
            tableContent += `
                <tr>
                    <th scope="row" class="idUser">${data.id}</th>
                    <td class="user">${data.username}</td>
                    <td class="name">${data.name.firstname} ${data.name.lastname}</td>
                    <td class="emailColapse">${data.email}</td>

                    <td class="phone d-flex justify-content-between">

                        <span class="phone">${data.phone} </span> 
                        <span  class="action"> <span class="action"><i class="ri-arrow-down-s-fill"></i></span> 

                    </td>
                </tr>
                <tr>
                    <td colspan="5">
                        <div class="collapse" col-md-12 col-12 id="collapse${index}">
                            <div class="p-3 bg-light">
                            <div class="titleTable d-flex flex-row justify-content-between">
                                <strong>Detalhes adicionais do cliente</strong> 
                                <div class="buttonDelete" id="buttonEdit"> Editar </div>
                            </div>
                                

                                <div class="box-table d-flex col-md-12 col-11 justify-content-around">

                                    <div class="first">
                                        <p><span  class="idCliente" id="idCliente"> ${data.id} </span></p>
                                        <p><strong>Nome:</strong> <span id="editName"> ${data.name.firstname} ${data.name.lastname}<span></p>
                                        <p><strong>E-mail:</strong><span id="editEmail">${data.email} <span></p>
                                        <p id="editPassword"><strong>Senha:</strong> ${data.password}/p>
                                    </div>

                                    <div class="second">
                                        <p id="editCidade"><strong>Cidade:</strong> ${data.address.city}</p>
                                        <p id="editRua"><strong>Rua: </strong>${data.address.street}  ${data.address.zipcode}</p>
                                        <p><strong>Número:</strong> <span id="editNumero">${data.address.number}<span></p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </td>
                </tr>
            `;
        });

        tableContent += `
            </tbody>
        </table>`;

        tables.innerHTML = tableContent;
        editarRua();

        const buttonEdit = document.querySelectorAll('#buttonEdit');
        buttonEdit.forEach(bnt => {
            bnt.addEventListener('click', (e) => {
                let row = e.target.closest('tr');
            
                let idCliente = row.querySelector('#idCliente');
                let id = idCliente.innerText;

                
            
                });
        });
       



        const rows = document.querySelectorAll('.table tbody tr:nth-child(odd)');
        rows.forEach((row, index) => {
            row.addEventListener('click', function () {
                const collapseElement = document.getElementById(`collapse${index}`);
                const bsCollapse = new bootstrap.Collapse(collapseElement, {
                    toggle: true
                });
            });
        });

    }



}

function editarRua() {

    const buttonEdit = document.querySelectorAll('#buttonEdit');
    buttonEdit.forEach(bnt => {
        bnt.addEventListener('click', (e) => {
            let row = e.target.closest('tr');
            console.log(row);

            let editNumero = row.querySelector('#editNumero');
            
            
            valorAtual = editNumero.innerText;
            console.log(valorAtual)
            editNumero.innerHTML = `<input type="text" class="inputEditNumero" id="inputEditNumero" value="${valorAtual}" />`;

            const inputEditNumero = row.querySelector('#inputEditNumero');
            console.log(inputEditNumero)

            // Quando o usuário pressiona a tecla "Enter" ou sai do campo de entrada
            inputEditNumero.addEventListener('blur', () => {
                let newValue = inputEditNumero.value;
                console.log(newValue)

                editNumero.innerHTML = newValue;

            });

            inputEditNumero.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    inputEditNumero.blur();  // Simula a perda de foco para salvar o valor
                }
            });

        })
    })

}


box.forEach(element => {
    element.addEventListener('click', () => {

        const boxes = document.getElementsByClassName('boxes');
        const botaoCadastrar = document.getElementsByClassName('titleCadastrar');
        const tables = document.querySelector('.tables');
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

            buscarClientes();


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


