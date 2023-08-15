const tabelaComputadores = document.querySelector('#tabelaComputadores');
const tabelaFormularioComputadores = document.querySelector('#tabelaFormularioComputadores');
const corpoTabelaComputadores = document.querySelector('#corpoTabelaComputadores');
const paragrafoMensagemComputadores = document.querySelector('#paragrafoMensagemComputadores');
const txtMarcaComputador = document.querySelector('#txtMarcaComputador');
const txtProcessadorComputador = document.querySelector('#txtProcessadorComputador');
const txtQtdRAMComputador = document.querySelector('#txtQtdRAMComputador');
const txtTamDiscoComputador = document.querySelector('#txtTamDiscoComputador');
const txtIdComputador = document.querySelector('#txtIdComputador');
const inputMarca = document.getElementById('inputMarca');

const btnNovoComputador = document.querySelector('#btnNovoComputador');
const btnSalvarComputador = document.querySelector('#btnSalvarComputador');
const btnApagarComputador = document.querySelector('#btnApagarComputador');
const btnCancelarComputador = document.querySelector('#btnCancelarComputador');
var criandoNovoComputador = false;

inicializarComputador();

function voltarPagInicial(){
    landing.style.display = "block";
    sectionJogos.style.display = "none";
    sectionEmpregados.style.display = "none";
    sectionComputadores.style.display = "none";
}

function inicializarComputador() {
    criandoNovoComputador = false;
    paragrafoMensagemComputadores.textContent = 'Pressione o botão Novo ou selecione um Computador da lista:';
    txtIdComputador.value = '';
    txtMarcaComputador.value = '';
    txtProcessadorComputador.value = '';
    txtQtdRAMComputador.value = '';
    txtTamDiscoComputador.value = '';

    txtIdComputador.disabled = true;
    txtMarcaComputador.disabled = true;
    txtProcessadorComputador.disabled = true;
    txtQtdRAMComputador.disabled = true;
    txtTamDiscoComputador.disabled = true;

    btnNovoComputador.disabled = false;
    btnSalvarComputador.disabled = true;
    btnApagarComputador.disabled = true;
    btnCancelarComputador.disabled = true;

    tabelaFormularioComputadores.style.display = 'none';
    tabelaComputadores.style.display = 'inline';

    listarTodosComputadores();
}

function listarTodosComputadores() {
    const errorHandler = function (error) {
        paragrafoMensagemComputadores.textContent = "Erro ao listar Computadores (código " + error.message + ")";
    }
    asyncLerComputadores(preencherTabelaComputador, errorHandler);
}

function preencherTabelaComputador(Computadores) {
    corpoTabelaComputadores.innerHTML = "";
    var n = Computadores.length;
    for (var i = 0; i < n; i++) {
        let c = Computadores[i];
        let linha = corpoTabelaComputadores.insertRow();
        let celulaId = linha.insertCell();
        let celulaMarca = linha.insertCell();
        let celulaProcessador = linha.insertCell();
        let celulaQtdRAM = linha.insertCell();
        let celulaTamDisco = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = c.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarComputador(c.id); };
        celulaId.appendChild(alink);
        celulaMarca.textContent = c.marca;
        celulaProcessador.textContent = c.processador;
        celulaQtdRAM.textContent = c.qtdRAM;
        celulaTamDisco.textContent = c.tamDisco;
    }
}

function selecionarComputador(id) {
    criandoNovoComputador = false;
    const errorHandler = function (error) {
        paragrafoMensagemComputadores.textContent = "Erro ao selecionar Computador (código " + error.message + ")";
    }
    asyncLerComputadorById(id, preencherFormularioComputador, errorHandler);
}

function preencherFormularioComputador(Computador) {
    paragrafoMensagemComputadores.textContent = 'Altere e salve os dados do Computador, ou então apague o registro do Computador.'
    txtIdComputador.value = Computador.id;
    txtMarcaComputador.value = Computador.marca;
    txtProcessadorComputador.value = Computador.processador;
    txtQtdRAMComputador.value = Computador.qtdRAM;
    txtTamDiscoComputador.value = Computador.tamDisco;

    txtIdComputador.disabled = true;
    txtMarcaComputador.disabled = false;
    txtProcessadorComputador.disabled = false;
    txtQtdRAMComputador.disabled = false;
    txtTamDiscoComputador.disabled = false;

    btnNovoComputador.disabled = true;
    btnSalvarComputador.disabled = false;
    btnApagarComputador.disabled = false;
    btnCancelarComputador.disabled = false;

    tabelaFormularioComputadores.style.display = 'inline';
    tabelaComputadores.style.display = 'none';
}

function novoComputador() {
    paragrafoMensagemComputadores.textContent = 'Preencha os dados do novo Computador...';
    criandoNovoComputador = true;

    txtIdComputador.value = '';
    txtMarcaComputador.value = '';
    txtProcessadorComputador.value = '';
    txtQtdRAMComputador.value = '';
    txtTamDiscoComputador.value = '';

    txtIdComputador.disabled = true;
    txtMarcaComputador.disabled = false;
    txtProcessadorComputador.disabled = false;
    txtQtdRAMComputador.disabled = false;
    txtTamDiscoComputador.disabled = false;

    btnNovoComputador.disabled = true;
    btnSalvarComputador.disabled = false;
    btnApagarComputador.disabled = true;
    btnCancelarComputador.disabled = false;

    tabelaFormularioComputadores.style.display = 'inline';
    tabelaComputadores.style.display = 'none';
}

function salvarComputador() {
    if (criandoNovoComputador) {
        criarComputador();
    } else {
        alterarComputador();
    }
}

function criarComputador() {
    const dadosComputador = {
        'marca': txtMarcaComputador.value,
        'processador': txtProcessadorComputador.value,
        'qtdRAM': txtQtdRAMComputador.value,
        'tamDisco': txtTamDiscoComputador.value
    };
    const errorHandler = function (error) {
        paragrafoMensagemComputadores.textContent = 'Erro ao criar novo Computador (código ' + error.message + ')';
    }
    asyncCriarComputador(dadosComputador, inicializarComputador, errorHandler);
}

function alterarComputador() {
    const errorHandler = function (error) {
        paragrafoMensagemComputadores.textContent = 'Erro ao alterar Computador (código ' + error.message + ')';
    }
    const dadosComputador = {
        'id': txtIdComputador.value,
        'marca': txtMarcaComputador.value,
        'processador': txtProcessadorComputador.value,
        'qtdRAM': txtQtdRAMComputador.value,
        'tamDisco': txtTamDiscoComputador.value
    };
    asyncAlterarComputador(dadosComputador, inicializarComputador, errorHandler);
}

function cancelarEdicaoComputador() {
    inicializarComputador();
}

function apagarComputador() {
    const id = txtIdComputador.value;
    const errorHandler = function (error) {
        paragrafoMensagemComputadores.textContent = 'Erro ao apagar Computador (código ' + error.message + ')';
    }
    asyncApagarComputador(id, inicializarComputador, errorHandler);
}

function buscarComputadorMarca() {
    var marca = document.getElementById('marcaInput').value;
    criandoNovoComputador = false;
    const errorHandler = function
    (error) {
        paragrafoMensagemComputadores.textContent = "Erro ao buscar computador (código " + error.message + ")";
    }
    asyncLerComputadorByMarca(marca, preencherTabelaComputador, errorHandler);
}

//Funcoes Rest
async function asyncLerComputadorByMarca(marca, proxsucesso, proxerro) {
    const URL = `/api/computadores?marca=${marca}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}
    
async function asyncCriarComputador(dadosComputador, proxsucesso, proxerro) {
    const URL = `/api/computadores`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosComputador),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerComputadores(proxsucesso, proxerro) {
    const URL = `/api/computadores`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncLerComputadorById(id, proxsucesso, proxerro) {
    const URL = `/api/computadores/${id}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}

async function asyncAlterarComputador(dadosComputador, proxsucesso, proxerro) {
    const URL = `/api/computadores/${dadosComputador.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosComputador),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);	        	
}

async function asyncApagarComputador(id, proxsucesso, proxerro) {
    const URL = `/api/computadores/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => proxsucesso())
        .catch(proxerro);	        		
}