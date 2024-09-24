

  // ====================AQUI COMEÇA O LOADING AO CLICAR NO BOTÃO SingUp ====================
  let singUp = document.getElementById('singUp');
  if (singUp) {
    singUp.addEventListener('click', () => {
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 600); // Tempo
      loadLoadingScreen();
    });
  }

  // ====================AQUI TERMINA O LOADING AO CLICAR NO BOTÃO SingUp ====================

    // ====================AQUI COMEÇA O LOADING AO CLICAR NO BOTÃO HOME ====================

  let home = document.getElementById('home');
  if (home) {
    home.addEventListener('click', () => {
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 600); // Tempo
      loadLoadingScreen();
      processarDados();
    });
  }

  // ====================AQUI TERMINA O LOADING AO CLICAR NO BOTÃO HOME ====================


   // ====================AQUI COMEÇA O LOADING AO CLICAR NO BOTÃO dashboard ====================

   let dashboard = document.getElementById('botaoDashboard');
   if (dashboard) {
    dashboard.addEventListener('click', () => {
       setTimeout(() => {
         window.location.href = "./adm.html";
       }, 600); // Tempo
       loadLoadingScreen();
       processarDados();
     });
   }
   // ====================AQUI TERMINA O LOADING AO CLICAR NO BOTÃO dashboard ====================
 
    // ====================AQUI COMEÇA O LOADING AO CLICAR NO BOTÃO botaoUsuarios ====================

    let btnUsuarios = document.getElementById('botaoUsuarios');
    if (btnUsuarios) {
      btnUsuarios.addEventListener('click', () => {
        setTimeout(() => {
          window.location.href = "./usuarios.html";
        }, 600); // Tempo
        loadLoadingScreen();
        processarDados();
      });
    }
    // ====================AQUI TERMINA O LOADING AO CLICAR NO BOTÃO botaoUsuarios ====================
  


  // ====================FUNÇÃO PRINCIPAL PARA CHAMAR O ARQUIVO HTML DE LOADING ====================
  function loadLoadingScreen() {
    fetch('loading.html')
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
        showContentAfterDelay();
      })
      .catch(error => console.error('Erro ao carregar a tela de carregamento:', error));
  }



  function showContentAfterDelay() {
    setTimeout(function () {
      var loadingScreen = document.getElementById("loading-screen");
      var content = document.getElementById("content-loading");
      console.log('oi')
      if (loadingScreen) {
        loadingScreen.style.display = "none";
      }

      if (content) {
        content.style.display = "block";
      }
    }, 1000); // 1 segundo de atraso
  }
  
  // ====================AQUI TERMINA A FUNÇÃO PRINCIPAL PARA CHAMAR O ARQUIVO HTML DE LOADING ====================






