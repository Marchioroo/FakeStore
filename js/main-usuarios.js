if (menu) {
    menu.onmouseover = function () {
        menu.style.width = '250px';
    };

    menu.onmouseout = function () {
        menu.style.width = '62px';
    };

}




const urlApi = 'https://fakestoreapi.com/products';



fetch(urlApi)
    .then(response => {

        if (!response.ok) {
            throw new Error('Algo deu errado na busca dos dados da API!', response.status)
        }

        return response.json();


    })
    .then(processarDados)
    .catch(tratarErro);

function tratarErro(error) {
    console.error('Erro ao consumir a API:', error);
}

function processarDados(data) {
    let botoesClick = () => {

        const botaoVoltar = document.querySelector('.titleVoltar');
        const form = document.querySelector('.box1-cadastro');
        const boxes = document.getElementsByClassName('boxes');
        const rowBoxes = document.querySelector('.row-boxes');
        const container = document.querySelector('.container');

        console.log(rowBoxes)
        const tables = document.querySelector('.tables');


        let botoes = document.querySelectorAll('.box');
        botoes.forEach(element => {
            element.addEventListener('click', e => {
                const row = e.target.closest('.box');
                const rowClicado = row.querySelector('.box-name')
                const btnSelecionado = rowClicado.textContent;

                if (btnSelecionado.trim() === 'Visualizar') {
            
                    botaoVoltar.classList.add('active');
                    boxes[0].classList.add('disabled');
                    tables.classList.add('active');
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


                    botaoVoltar.addEventListener('click', () => {
                        botaoVoltar.classList.remove('active');
                        rowBoxes.classList.remove('active');
                        boxes[0].classList.remove('disabled');
                        form.classList.remove('active');
                        tables.classList.remove('active');

                    })
                }

                if (btnSelecionado.trim() === 'Cadastrar') {
                    botaoVoltar.classList.add('active');
                    boxes[0].classList.add('disabled');
                    rowBoxes.classList.remove('active');

                    form.classList.add('active');

                    const formulario = document.getElementById('cadLoginForm');
                    const loginInput = document.getElementById('cadUser');
                    const emailInput = document.getElementById('cadEmail');
                    const passInput = document.getElementById('cadPass');

                    console.log(formulario)

                    formulario.addEventListener('submit', (event) => {
                        if (loginInput.value && passInput.value) {
                        event.preventDefault();
                        // Recupera a lista de usuários ou cria uma lista vazia se não houver usuários
                        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                        console.log(usuarios)

                        let usuarioExistente = usuarios.some(usuario => usuario.user === loginInput.value)
                        console.log(usuarioExistente)

                        if (!usuarioExistente) {
                            let novoUsuario = {
                                user: loginInput.value,
                                email: emailInput.value,
                                senha: passInput.value
                            }
                            usuarios.push(novoUsuario);

                            const notyf = new Notyf({
                                position: {
                                    x: 'right',  // Centralizado no eixo horizontal
                                    y: 'top'      // No topo do eixo vertical
                                },
                
                                types: [
                                    {
                                        type: 'success',
                                        background: 'green',
                                        icon: false
                                    }
                                ]
                            });
                
                            notyf.open({
                                type: 'success',
                                message: 'Cadastro realizado com sucesso!!'
                            });
                            
                            localStorage.setItem('usuarios', JSON.stringify(usuarios));
                            loginInput.value = '';
                            emailInput.value = '';
                            passInput.value = '';

                        }else{
                            const notyf = new Notyf({
                                position: {
                                    x: 'right',  // Centralizado no eixo horizontal
                                    y: 'top'      // No topo do eixo vertical
                                },
                
                                types: [
                                    {
                                        type: 'error',
                                        background: 'red',
                                        icon: false
                                    }
                                ]
                            });

                            notyf.open({
                                type: 'error',
                                
                                 message: 'Usuário já existente, por favor, insira outro!'
                            });
                            
                        }

                    }
                    })







                    botaoVoltar.addEventListener('click', () => {
                        botaoVoltar.classList.remove('active');
                        rowBoxes.classList.remove('active');
                        boxes[0].classList.remove('disabled');
                        form.classList.remove('active');



                    })

                }



            })







        });


    }

    botoesClick();


}

