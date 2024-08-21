const urlApi = 'https://fakestoreapi.com/products/categories';


fetch(urlApi) 
 .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json(); 
    
    // Converte a resposta em JSON
  }) .then(data => {
    console.log('Dados recebidos da API:', data);
    data.forEach(element => {
        console.log(element.image)
    
   });
  })
  .catch(error => {
    console.error('Erro ao consumir a API:', error);
  });