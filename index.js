function consultarCEP() {
    var cep = document.getElementById('cepInput').value;
    var url = 'https://viacep.com.br/ws/' + cep + '/json/';

    document.querySelector('button').setAttribute('disabled', 'disabled');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar o CEP');
            }
            return response.json();
        })
        .then(data => {
            exibirResultado(data);
            localStorage.setItem(cep, JSON.stringify(data));
        })
        .catch(error => {
            console.error('Erro:', error);
        })
        .finally(() => {
            document.querySelector('button').removeAttribute('disabled');
        });
}

function exibirResultado(data) {
    var resultadoDiv = document.getElementById('resultadoCEP');
    if (resultadoDiv) {
        resultadoDiv.innerHTML = `
        <p><strong>CEP:</strong> ${data.cep}</p>
        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Localidade:</strong> ${data.localidade}</p>
        <p><strong>UF:</strong> ${data.uf}</p>
        <p><strong>DDD:</strong> ${data.ddd}</p>
      `;
    }
}