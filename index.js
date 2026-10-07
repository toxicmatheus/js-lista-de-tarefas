let tarefas = [];

function buscarTarefas(){
try {
    let = usuario = JSON.parse(sessionStorage.getItem("usuario"))
    
    if (!usuario){
        window.location.href = "index.html";
    }
    fetch("https://js-lista-de-tarefas-api.onrender.com/tarefas/${usuario.id}")
    .then(resposta => resposta.json())
    .then(json => {
        if(json.tipo == "error"){ 
            throw json.mensagem;
        } 
        tarefas = json;
        carregarTarefas(tarefas);
    })
    }catch (error) {
      console.log("Error: ", error.menssage);
        
    }
}

buscarTarefas();

function carregarTarefas(listaTarefas){
    let grid = document.querySelector("tarefas");
    if (listaTarefas.length == 0){
        grid.innerHTML = "<p>Crie sua primeira tarefa</p>";
    }
}