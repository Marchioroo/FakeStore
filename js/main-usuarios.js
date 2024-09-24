const urlApi = 'https://fakestoreapi.com/products';

fetch(urlApi)
    .then(response =>{

        if(!response.ok){
            throw new Error('Algo deu errado na busca dos dados da API!', response.status)
        }
        
        return response.json(); 
        

    })
    .then(processarDados)
    .catch(tratarErro);

    function tratarErro(error) {
        console.error('Erro ao consumir a API:', error);
    }

    function processarDados(data){
       let botoesClick = () => {

        const botaoVoltar = document.querySelector('.titleVoltar');
        const boxes = document.getElementsByClassName('boxes');
        const tables = document.querySelector('.tables');


        let botoes = document.querySelectorAll('.box');
        botoes.forEach(element => {
            element.addEventListener('click', e =>{
                const row = e.target.closest('.box'); 
                const rowClicado = row.querySelector('.box-name')
                const btnSelecionado = rowClicado.textContent;

                if(btnSelecionado.trim() === 'Visualizar'){
                    botaoVoltar.classList.add('active');
                    boxes[0].classList.add('disabled');

                    console.log('Visualizar')
                }

                if(btnSelecionado.trim() === 'Cadastrar'){
                    console.log('Cadastrar')
                }
               


            })

            
           
            
            
            
            
        });
        

       }

       botoesClick();


    }
    
