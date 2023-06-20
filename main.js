
function atualizarEndereco(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('endereco').value = '';
                document.getElementById('bairro').value = '';
                document.getElementById('cidade').value = '';
                document.getElementById('estado').value = '';
                document.getElementById('cep-erro').style.display = 'block';
            } else {
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                document.getElementById('cep-erro').style.display = 'none';
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById('endereco').value = '';
            document.getElementById('bairro').value = '';
            document.getElementById('cidade').value = '';
            document.getElementById('estado').value = '';
            document.getElementById('cep-erro').style.display = 'block';
        });
}

function gerarLogin(nome, sobrenome) {
    const login = `${nome.toLowerCase()}.${sobrenome.toLowerCase()}`.replace(/\s/g, '');
    document.getElementById('login').value = login;
}

function limparFormulario() {
    document.getElementById('formulario').reset();
    document.getElementById('login').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('termos-checkbox').checked = false;
}

function adicionarDadosTabela(nome, sobrenome, cep, endereco, bairro, cidade, estado, login, termos) {
    const tabela = document.querySelector('#tabela-dados table');
    const row = tabela.insertRow(-1);
    const nomeCell = row.insertCell(0);
    const sobrenomeCell = row.insertCell(1);
    const cepCell = row.insertCell(2);
    const enderecoCell = row.insertCell(3);
    const bairroCell = row.insertCell(4);
    const cidadeCell = row.insertCell(5);
    const estadoCell = row.insertCell(6);
    const loginCell = row.insertCell(7);
    const termosCell = row.insertCell(8);
    nomeCell.innerHTML = nome;
    sobrenomeCell.innerHTML = sobrenome;
    cepCell.innerHTML = cep;
    enderecoCell.innerHTML = endereco;
    bairroCell.innerHTML = bairro;
    cidadeCell.innerHTML = cidade;
    estadoCell.innerHTML = estado;
    loginCell.innerHTML = login;
    termosCell.innerHTML = termos;
}

function exibirAlertaSalvo() {
    alert('As informações foram salvas.');
}

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const login = document.getElementById('login').value;
    const termos = document.getElementById('termos-checkbox').checked ? 'Sim' : 'Não';

    adicionarDadosTabela(nome, sobrenome, cep, endereco, bairro, cidade, estado, login, termos);
    exibirAlertaSalvo();
    limparFormulario();
});

document.getElementById('nome').addEventListener('input', function() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    gerarLogin(nome, sobrenome);
});

document.getElementById('sobrenome').addEventListener('input', function() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    gerarLogin(nome, sobrenome);
});

document.getElementById('cep').addEventListener('input', function() {
    const cep = document.getElementById('cep').value;
    atualizarEndereco(cep);
});

document.getElementById('termos').addEventListener('scroll', function(event) {
    const textarea = event.target;
    if (textarea.scrollHeight - textarea.scrollTop === textarea.clientHeight) {
        document.getElementById('termos-checkbox').disabled = false;
    }
});
