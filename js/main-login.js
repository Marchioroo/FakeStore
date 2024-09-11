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

form.addEventListener('submit', (event) => {
    // Verificar se todos os campos estão preenchidos
    if (loginInput.value && passInput.value) {
        event.preventDefault();
        console.log(loginInput.value,passInput.value);

            // aqui ou ele cria ukma lista vazia ou recupera uma ja existente
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        let novoUsuario = {
            user: loginInput.value,
            senha: passInput.value
        };

        usuarios.push(novoUsuario);
        setTimeout(()=>{
            modalSuccess.classList.add('active');
            buttonNo.addEventListener('click', () =>{
            modalSuccess.classList.remove('active');

            loginInput.value = '';
            passInput.value = '';
            emailInput.value = '';
            })
        }, 200) 

        

        localStorage.setItem('usuarios', JSON.stringify(usuarios));        
    } else {
        // Impede o envio do formulário
        event.preventDefault();
        console.log("Preencha todos os campos!");
    }
});