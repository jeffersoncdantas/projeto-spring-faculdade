const tabelaJogos = document.querySelector('#tabelaJogos');
const tabelaFormularioJogos = document.querySelector('#tabelaFormularioJogos');
const corpoTabelaJogos = document.querySelector('#corpoTabelaJogos');
const paragrafoMensagemJogos = document.querySelector('#paragrafoMensagemJogos');
const txtCampeonato = document.querySelector('#txtCampeonato');
const txtTimeA = document.querySelector('#txtTimeA');
const txtTimeB = document.querySelector('#txtTimeB');
const txtIdJogo = document.querySelector('#txtIdJogo');
const txtGolsTimeA = document.querySelector('#txtGolsTimeA');
const txtGolsTimeB = document.querySelector('#txtGolsTimeB');
const selectEmpregado = document.querySelector('#selectEmpregado');
const selectComputador = document.querySelector('#selectComputador');

const btnNovoJogo = document.querySelector('#btnNovoJogo');
const btnSalvarJogo = document.querySelector('#btnSalvarJogo');
const btnApagarJogo = document.querySelector('#btnApagarJogo');
const btnCancelarJogo = document.querySelector('#btnCancelarJogo');
var criandoNovoJogo = false;

inicializarJogo();

function voltarPagInicial(){
    landing.style.display = "block";
    sectionJogos.style.display = "none";
    sectionEmpregados.style.display = "none";
    sectionComputadores.style.display = "none";
}

function inicializarJogo() {
    criandoNovoJogo = false;
    paragrafoMensagemJogos.textContent = 'Pressione o botão Novo ou selecione um Jogo da lista:'
    txtIdJogo.value = '';
    txtCampeonato.value = '';
    txtTimeA.value = '';
    txtTimeB.value = '';
    
    txtIdJogo.disabled = true;
    txtCampeonato.disabled = true;
    txtTimeA.disabled = true;
    txtTimeB.disabled = true;
    txtGolsTimeA.disabled = true;
    txtGolsTimeB.disabled = true;
    
    carregarEmpregados();
    selectEmpregado.disabled = true;
    
    carregarComputadores();
    selectComputador.disabled = true;
    
    btnNovoJogo.disabled = false;
    btnSalvarJogo.disabled = true;
    btnApagarJogo.disabled = true;
    btnCancelarJogo.disabled = true;

    tabelaFormularioJogos.style.display = 'none';
    tabelaJogos.style.display = 'inline';

    listarTodosJogos();
}

function listarTodosJogos() {
    const errorHandler = function (error) {
        paragrafoMensagemJogos.textContent = "Erro ao listar Jogos (código " + error.message + ")";
    }
    asyncLerJogos(preencherTabelaJogo, errorHandler);
}

function preencherTabelaJogo(Jogos) {
    corpoTabelaJogos.innerHTML = "";
    var n = Jogos.length;
    for (var i = 0; i < n; i++) {
        let p = Jogos[i];
        let linha = corpoTabelaJogos.insertRow();
        let celulaId = linha.insertCell();
        let celulaCampeonato = linha.insertCell();
        let celulaTimeA = linha.insertCell();
        let celulaTimeB = linha.insertCell();
        let celulaGolsTimeA = linha.insertCell();
        let celulaGolsTimeB = linha.insertCell();
        let celulaEmpregado = linha.insertCell();
        let celulaComputador = linha.insertCell();

        let alink = document.createElement('a');
        alink.textContent = p.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () { selecionarJogo(p.id); };
        celulaId.appendChild(alink);
        celulaCampeonato.textContent = p.campeonato;
        celulaTimeA.textContent = p.timeA;
        celulaTimeB.textContent = p.timeB;
        celulaGolsTimeA.textContent = p.golsTimeA;
        celulaGolsTimeB.textContent = p.golsTimeB;
        celulaEmpregado.textContent = p.empregado.nome;
        celulaComputador.textContent = p.computador.marca;
    }
}

function selecionarJogo(id) {
    criandoNovoJogo = false;
    const errorHandler = function (error) {
        paragrafoMensagemJogos.textContent = "Erro ao selecionar Jogo (código " + error.message + ")";
    }
    asyncLerJogoById(id, preencherFormularioJogo, errorHandler);
}

function preencherFormularioJogo(Jogo) {
    paragrafoMensagemJogos.textContent = 'Altere e salve os dados do Jogo, ou então apague o registro do Jogo.'
    txtIdJogo.value = Jogo.id;
    txtCampeonato.value = Jogo.campeonato;
    txtTimeA.value = Jogo.timeA;
    txtTimeB.value = Jogo.timeB;
    txtGolsTimeA.value = Jogo.golsTimeA;
    txtGolsTimeB.value = Jogo.golsTimeB;
    selectEmpregado.value = Jogo.empregado.id;
    selectComputador.value = Jogo.computador.id;

    txtIdJogo.disabled = true;
    txtCampeonato.disabled = false;
    txtTimeA.disabled = false;
    txtTimeB.disabled = false;
    txtGolsTimeA.disabled = false;
    txtGolsTimeB.disabled = false;
    selectEmpregado.disabled = false;
    selectComputador.disabled = false;

    btnNovoJogo.disabled = true;
    btnSalvarJogo.disabled = false;
    btnApagarJogo.disabled = false;
    btnCancelarJogo.disabled = false;

    tabelaFormularioJogos.style.display = 'inline';
    tabelaJogos.style.display = 'none';
}

function novoJogo() {
    paragrafoMensagemJogos.textContent = 'Preencha os dados do novo Jogo...';
    criandoNovoJogo = true;
    carregarEmpregados();
    carregarComputadores();

    txtIdJogo.value = '';
    txtCampeonato.value = '';
    txtTimeA.value = '';
    txtTimeB.value = '';
    txtGolsTimeA.value = '';
    txtGolsTimeB.value = '';
    selectEmpregado.selectedIndex = -1;
    selectComputador.selectedIndex = -1;

    txtIdJogo.disabled = true;
    txtCampeonato.disabled = false;
    txtTimeA.disabled = false;
    txtTimeB.disabled = false;
    txtGolsTimeA.disabled = false;
    txtGolsTimeB.disabled = false;
    selectEmpregado.disabled = false;
    selectComputador.disabled = false;

    btnNovoJogo.disabled = true;
    btnSalvarJogo.disabled = false;
    btnApagarJogo.disabled = true;
    btnCancelarJogo.disabled = false;

    tabelaFormularioJogos.style.display = 'inline';
    tabelaJogos.style.display = 'none';
}

function salvarJogo() {
    if (criandoNovoJogo) {
        criarJogo();
    }
    else {
        alterarJogo();
    }
}

function criarJogo() {
    const dadosJogo = {
        'campeonato': txtCampeonato.value,
        'timeA': txtTimeA.value,
        'timeB': txtTimeB.value,
        'golsTimeA': txtGolsTimeA.value,
        'golsTimeB': txtGolsTimeB.value,
        'empregado': {'id': selectEmpregado.value},
        'computador': {'id': selectComputador.value}
    };
    const errorHandler = function (error) {
        paragrafoMensagemJogos.textContent = 'Erro ao criar novo Jogo (código ' + error.message + ')';
    }
    asyncCriarJogo(dadosJogo, inicializarJogo, errorHandler);
}

function alterarJogo() {
    const errorHandler = function (error) {
        paragrafoMensagemJogos.textContent = 'Erro ao alterar Jogo (código ' + error.message + ')';
    }
    const dadosJogo = {
        'id': txtIdJogo.value,
        'campeonato': txtCampeonato.value,
        'timeA': txtTimeA.value,
        'timeB': txtTimeB.value,
        'golsTimeA': txtGolsTimeA.value,
        'golsTimeB': txtGolsTimeB.value,
        'empregado': {'id': selectEmpregado.value},
        'computador' : {'id': selectComputador.value}
    };
    asyncAlterarJogo(dadosJogo, inicializarJogo, errorHandler);
}

function cancelarEdicaoJogo() {
    inicializarJogo();
}

function apagarJogo() {
    const id = txtIdJogo.value;
    const errorHandler = function (error) {
        paragrafoMensagemJogos.textContent = 'Erro ao apagar Jogo (código ' + error.message + ')';
    }
    asyncApagarJogo(id, inicializarJogo, errorHandler);
}

function carregarEmpregados(){
    const errorHandler = function(error){
        paragrafoMensagemJogos.textContent = "Erro ao carregar Empregados (código " + error.message + ")";
    }
    asyncLerEmpregados(preencherSelectEmpregados, errorHandler);
}

function preencherSelectEmpregados(empregados){
    var opcoes = '<option disable select value> Selecione um Empregado </option>'
    var n = empregados.length;
    for (var i = 0; i < n; i++){
        var e = empregados[i];
        opcoes += `<option value="${e.id}">${e.nome}</option>`;
    }
    selectEmpregado.innerHTML = opcoes;
}

function carregarComputadores(){
    const errorHandler = function(error){
        paragrafoMensagemJogos.textContent = "Erro ao carregar Computador (código " + error.message + ")";
    }
    asyncLerComputadores(preencherSelectComputadores, errorHandler);
}

function preencherSelectComputadores(computadores){
    var opcoes = '<option disable select value> Selecione um Computador </option>'
    var n = computadores.length;
    for (var i = 0; i < n; i++){
        var c = computadores[i];
        opcoes += `<option value="${c.id}">${c.marca}</option>`;
    }
    selectComputador.innerHTML = opcoes;
}


function buscarJogosCampeonato() {
    var campeonato = document.getElementById('campeonatoInput').value;
    criandoNovoJogo = false;
    const errorHandler = function
    (error) {
        paragrafoMensagemJogos.textContent = "Erro ao buscar jogo (código " + error.message + ")";
    }
    asyncLerJogoByCampeonato(campeonato, preencherTabelaJogo, errorHandler);
}

//Funcoes Rest
async function asyncLerJogoByCampeonato(campeonato, proxsucesso, proxerro) {
    const URL = `/api/jogos?campeonato=${campeonato}`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}



async function asyncCriarJogo(dadosjogos, proxsucesso, proxerro) {
    const URL = `/api/jogos`;
    const postRequest = {
        method: 'POST',
        body: JSON.stringify(dadosjogos),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, postRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);
}

async function asyncLerJogos(proxsucesso, proxerro) {
    const URL = `/api/jogos`;
    fetch(URL)
      .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta;}) 
      .then(resposta => resposta.json())
      .then(jsonresponse => proxsucesso(jsonresponse))
      .catch(proxerro);
}

async function asyncLerJogoById(id, proxsucesso, proxerro) {
    const URL = `/api/jogos/${id}`;
    fetch(URL)
      .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta;}) 
      .then(resposta => resposta.json())
      .then(jsonresponse => proxsucesso(jsonresponse))
      .catch(proxerro);
}

async function asyncAlterarJogo(dadosjogos, proxsucesso, proxerro) {
    const URL = `/api/jogos/${dadosjogos.id}`;
    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosjogos),
        headers: { 'Content-type': 'application/json' }
    };
    fetch(URL, putRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso())
        .catch(proxerro);	        	
}

async function asyncApagarJogo(id, proxsucesso, proxerro) {
    const URL = `/api/jogos/${id}`;
    const deleteRequest = {
        method: 'DELETE'
    };
    fetch(URL, deleteRequest)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; } )
        .then(resposta => proxsucesso())
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

async function asyncLerEmpregados(proxsucesso, proxerro) {
    const URL = `/api/empregados`;
    fetch(URL)
        .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta; }) 
        .then(resposta => resposta.json())
        .then(jsonResponse => proxsucesso(jsonResponse))
        .catch(proxerro);
}