var btnGerenciarComputadores = document.querySelector("#btnGerenciarComputadores");
var sectionComputadores = document.querySelector("#sectionComputadores");

var btnGerenciarJogos = document.querySelector("#btnGerenciarJogos");
var sectionJogos = document.querySelector("#sectionJogos");

var btnGerenciarEmpregados = document.querySelector("#btnGerenciarEmpregados");
var sectionEmpregados = document.querySelector("#sectionEmpregados");

var landing = document.querySelector("#landing");

btnGerenciarComputadores.addEventListener("click", function(){
landing.style.display = "none";
sectionJogos.style.display = "none";
sectionEmpregados.style.display = "none";
sectionComputadores.style.display = "block";

})

btnGerenciarEmpregados.addEventListener("click", function(){
landing.style.display = "none";
sectionComputadores.style.display = "none";
sectionJogos.style.display = "none";
sectionEmpregados.style.display = "block";

})

btnGerenciarJogos.addEventListener("click", function(){
landing.style.display = "none";
sectionComputadores.style.display = "none";
sectionEmpregados.style.display = "none";
sectionJogos.style.display = "block";

})