const tabelaEmpregados = document.querySelector('#tabelaEmpregados');
const tabelaFormularioEmpregados = document.querySelector('#tabelaFormularioEmpregados');
const corpoTabelaEmpregados = document.querySelector('#corpoTabelaEmpregados');
const paragrafoMensagemEmpregados = document.querySelector('#paragrafoMensagemEmpregados');
const txtIdEmpregado = document.querySelector('#txtIdEmpregado');
const txtNomeEmpregado = document.querySelector('#txtNomeEmpregado');
const txtCargoEmpregado = document.querySelector('#txtCargoEmpregado');
const txtSalarioEmpregado = document.querySelector('#txtSalarioEmpregado');

const btnNovoEmpregado = document.querySelector('#btnNovoEmpregado');
const btnSalvarEmpregado = document.querySelector('#btnSalvarEmpregado');
const btnApagarEmpregado = document.querySelector('#btnApagarEmpregado');
const btnCancelarEmpregado = document.querySelector('#btnCancelarEmpregado');
var criandoNovoEmpregado = false;

inicializarEmpregado();

function voltarPagInicial(){
    landing.style.display = "block";
    sectionJogos.style.display = "none";
    sectionEmpregados.style.display = "none";
    sectionComputadores.style.display = "none";
}

function inicializarEmpregado() {
    criandoNovoEmpregado = false;
    paragrafoMensagemEmpregados.textContent = 'Pressione o botão Novo ou selecione um Empregado da lista:';
    txtIdEmpregado.value = '';
    txtNomeEmpregado.value = '';
    txtCargoEmpregado.value = '';
    txtSalarioEmpregado.value = '';

    txtIdEmpregado.disabled = true;
    txtNomeEmpregado.disabled = true;
    txtCargoEmpregado.disabled = true;
    txtSalarioEmpregado.disabled = true;

    btnNovoEmpregado.disabled = false;
    btnSalvarEmpregado.disabled = true;
    btnApagarEmpregado.disabled = true;
    btnCancelarEmpregado.disabled = true;

    tabelaFormularioEmpregados.style.display = 'none';
    tabelaEmpregados.style.display = 'inline';

    listarTodosEmpregados();
}

function listarTodosEmpregados() {
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent = "Erro ao listar Empregados (código " + error.message + ")";
    }
    asyncLerEmpregados(preencherTabelaEmpregado, errorHandler);
}

function preencherTabelaEmpregado(empregados) {
    corpoTabelaEmpregados.innerHTML = "";
    var n = empregados.length;
    for (var i = 0; i < n; i++) {
        let empregado = empregados[i];
        let linha = corpoTabelaEmpregados.insertRow();
        let celulaId = linha.insertCell();
        let celulaNome = linha.insertCell();
        let celulaCargo = linha.insertCell();
        let celulaSalario = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = empregado.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarEmpregado(empregado.id); };
        celulaId.appendChild(alink);
        celulaNome.textContent = empregado.nome;
        celulaCargo.textContent = empregado.cargo;
        celulaSalario.textContent = empregado.salario;
    }
}

function selecionarEmpregado(id) {
    criandoNovoEmpregado = false;
    const errorHandler = function
    (error) {
        paragrafoMensagemEmpregados.textContent = "Erro ao selecionar Empregado (código " + error.message + ")";
    }
    asyncLerEmpregadoById(id, preencherFormularioEmpregado, errorHandler);
}

function preencherFormularioEmpregado(empregado) {
    paragrafoMensagemEmpregados.textContent = 'Altere e salve os dados do Empregado, ou então apague o registro do Empregado.'
    txtIdEmpregado.value = empregado.id;
    txtNomeEmpregado.value = empregado.nome;
    txtCargoEmpregado.value = empregado.cargo;
    txtSalarioEmpregado.value = empregado.salario;

    txtIdEmpregado.disabled = true;
    txtNomeEmpregado.disabled = false;
    txtCargoEmpregado.disabled = false;
    txtSalarioEmpregado.disabled = false;

    btnNovoEmpregado.disabled = true;
    btnSalvarEmpregado.disabled = false;
    btnApagarEmpregado.disabled = false;
    btnCancelarEmpregado.disabled = false;

    tabelaFormularioEmpregados.style.display = 'inline';
    tabelaEmpregados.style.display = 'none';
}

function novoEmpregado() {
    paragrafoMensagemEmpregados.textContent = 'Preencha os dados do novo Empregado...';
    criandoNovoEmpregado = true;

    txtIdEmpregado.value = '';
    txtNomeEmpregado.value = '';
    txtCargoEmpregado.value = '';
    txtSalarioEmpregado.value = '';

    txtIdEmpregado.disabled = true;
    txtNomeEmpregado.disabled = false;
    txtCargoEmpregado.disabled = false;
    txtSalarioEmpregado.disabled = false;

    btnNovoEmpregado.disabled = true;
    btnSalvarEmpregado.disabled = false;
    btnApagarEmpregado.disabled = true;
    btnCancelarEmpregado.disabled = false;

    tabelaFormularioEmpregados.style.display = 'inline';
    tabelaEmpregados.style.display = 'none';
}

function salvarEmpregado() {
    if (criandoNovoEmpregado) {
        criarEmpregado();
    } else {
        alterarEmpregado();
    }
}

function criarEmpregado() {
    const dadosEmpregado = {
        'nome': txtNomeEmpregado.value,
        'cargo': txtCargoEmpregado.value,
        'salario': txtSalarioEmpregado.value
    };
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent = 'Erro ao criar novo Empregado (código ' + error.message + ')';
    }
    asyncCriarEmpregado(dadosEmpregado, inicializarEmpregado, errorHandler);
}

function alterarEmpregado() {
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent = 'Erro ao alterar Empregado (código ' + error.message + ')';
    }
    const dadosEmpregado = {
        'id': txtIdEmpregado.value,
        'nome': txtNomeEmpregado.value,
        'cargo': txtCargoEmpregado.value,
        'salario': txtSalarioEmpregado.value
    };
    asyncAlterarEmpregado(dadosEmpregado, inicializarEmpregado, errorHandler);
}

function cancelarEdicaoEmpregado() {
    inicializarEmpregado();
}

function apagarEmpregado() {
    const id = txtIdEmp
    Empregado.value;
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent = 'Erro ao apagar Empregado (código ' + error.message + ')';
    }
    asyncApagarEmpregado(id, inicializarEmpregado, errorHandler);
}

function buscarEmpregadosCargo() {
    var cargo = document.getElementById('cargoInput').value;
    criandoNovoEmpregado = false;
    const errorHandler = function
    (error) {
        paragrafoMensagemEmpregados.textContent = "Erro ao buscar empregado (código " + error.message + ")";
    }
    asyncLerEmpregadoByCargo(cargo, preencherTabelaEmpregado, errorHandler);
}

//Funcoes Rest
async function asyncLerEmpregadoByCargo(cargo, proxsucesso, proxerro) {
    const URL = `/api/empregados?cargo=${cargo}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncCriarEmpregado(dadosEmpregado, proxsucesso, proxerro) {
    const URL = `/api/empregados`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosEmpregado),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerEmpregados(proxsucesso, proxerro) {
    const URL = `/api/empregados`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerEmpregadoById(id, proxsucesso, proxerro) {
    const URL = `/api/empregados/${id}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerEmpregadoByCargo(cargo, proxsucesso, proxerro) {
    const URL = `/api/empregados?cargo=${cargo}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncAlterarEmpregado(dadosEmpregado, proxsucesso, proxerro) {
    const URL = `/api/empregados/${dadosEmpregado.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosEmpregado),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);	        	
}

async function asyncApagarEmpregado(id, proxsucesso, proxerro) {
    const URL = `/api/empregados/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => proxsucesso())
        .catch(proxerro);	        		
}