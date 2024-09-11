const toggleCadastrar = document.getElementById('cadastrar');
const toggleVoltar = document.getElementById('voltar');
const box = document.querySelector('.box');
const boxCad = document.querySelector('.box-cadastro');


let toggle = () => {
    toggleCadastrar.addEventListener('click', () => {
        box.classList.add('disabled');
        setTimeout(() => {
            boxCad.classList.add('active'); // Aplica o efeito de fade-in no boxCadastro
        }, 100);
    });
};
toggle();

let toggleRemover = () => {
    toggleVoltar.addEventListener('click', () => {
        boxCad.classList.remove('active');
        setTimeout(() => {
            box.classList.remove('disabled'); // Aplica o fade-in no box original
        }, 100);
    })
};
toggleRemover();
//modal modal modal modal modal

const modalSuccess = document.querySelector('.container-success');
const buttonYes = document.getElementById('button-yes');
const buttonNo = document.getElementById('button-no');


// form form form form form form form form form form form form form form form
const form = document.getElementById('cadLoginForm');
const loginInput = document.getElementById('cadUser');
const emailInput = document.getElementById('cadEmail');
const passInput = document.getElementById('cadPass');

const loginForm = document.getElementById('loginForm');
const passForm = document.getElementById('passForm');

form.addEventListener('submit', (event) => {
    // Verificar se todos os campos estão preenchidos
    if (loginInput.value && passInput.value) {
        event.preventDefault();
        console.log(loginInput.value, passInput.value);

        // Recupera a lista de usuários ou cria uma lista vazia se não houver usuários
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // verifique se o usuário já existe na lista
        let usuarioExistente = usuarios.some(usuario => usuario.user === loginInput.value);

        if (!usuarioExistente) {
            let novoUsuario = {
                user: loginInput.value,
                email: emailInput.value,
                senha: passInput.value
                
            };


            usuarios.push(novoUsuario);


            setTimeout(() => {
                modalSuccess.classList.add('active');

                // Caso clique no "não"
                buttonNo.addEventListener('click', () => {
                    modalSuccess.classList.remove('active');
                    loginInput.value = '';
                    passInput.value = '';
                    emailInput.value = '';
                });

                // Caso clique no "sim"
                buttonYes.addEventListener('click', () => {
                    modalSuccess.classList.remove('active');
                    boxCad.classList.remove('active');
                    setTimeout(() => {
                        box.classList.remove('disabled'); // Aplica o fade-in no box original
                    }, 100);
                    loginForm.value = loginInput.value;
                    passForm.value = passInput.value;
                });
            }, 200);

            // Salva a lista atualizada no localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

        } else {

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

    } else {
        event.preventDefault();
        console.log("Preencha todos os campos!");
    }
});


//login login login login login login


// verifique se o usuário já existe na lista

const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', () => {
    event.preventDefault();
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    
    usuarios.forEach(usuario => {
       
        let userExistente = usuarios.some(usuarioLogin => usuarioLogin.user === loginForm.value);
        let senhaExistente = usuarios.some(senhaLogin => senhaLogin.senha === passForm.value);
        if(userExistente && senhaExistente){

            let buttonEntrar = document.getElementById('buttonEntrar');
            if (buttonEntrar) {
             
                setTimeout(() => {
                  window.location.href = "./adm.html";
                }, 200); // Tempo
                loadLoadingScreen();
                
              
            }
            
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
                message: 'Usuário ou senha incorretos. Verifique suas credenciais e tente novamente.'
            });

        }

    });

})


