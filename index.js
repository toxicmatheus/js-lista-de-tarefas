let tarefas = [];

function buscarTarefas(){
    try {

        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        
        if(!usuario){
            window.location.href = "index.html";
        }

        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${usuario.id}`)
        .then(resposta => resposta.json())
        .then(json => {
            if(json.tipo == "error"){
                throw json.mensagem;
            }

            tarefas = json;
            carregarTarefas(tarefas);
        })
        
    } catch (error) {
        console.log("Error: ", error.message);   
    }
}

buscarTarefas();

function carregarTarefas(listaTarefas){
    let grid = document.querySelector("#tarefas");
    grid.innerHTML = "";
    if(listaTarefas.length == 0){
        grid.innerHTML = "<p>Crie sua primeira tarefa</p>";
    }else{
        listaTarefas.map(tarefa => {
            grid.innerHTML += `
                <div class="bg-white p-4 rounded-lg">
                    <h3 class="font-bold mb-4">${tarefa.titulo}</h3>
                    <p>${tarefa.descricao}</p>
                    <div class="flex justify-end gap-3">
                        <box-icon onclick="abrirFormEditar(${tarefa.id})" class="cursor-pointer hover:fill-indigo-500" name="pencil"></box-icon>
                        <box-icon onclick="deletarTarefa(${tarefa.id})" class="cursor-pointer hover:fill-indigo-500" name="trash"></box-icon>
                    </div>
                </div>
            `;
        })
    }
}

function criarTarefa(){
    event.preventDefault();
    try {
        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        let titulo = document.querySelector("#titulo");
        let descricao = document.querySelector("#descricao");
        let dados = {
            titulo: titulo.value,
            descricao: descricao.value,
            usuario_id: usuario.id
        }

        fetch("https://js-lista-de-tarefas-api.onrender.com/tarefas",{
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(resposta => resposta.json())
        .then(json => {
            alert(json.mensagem);
            fecharFormCriar();
            buscarTarefas();
        })
    } catch (error) {
        alert("Error: ", error.message);
    }
}

function editarTarefa(){
        event.preventDefault();
    try {
        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        let id = document.querySelector("#idEdicao")
        let titulo = document.querySelector("#tituloEdicao");
        let descricao = document.querySelector("#descricaoEdicao");
        let dados = {
            titulo: titulo.value,
            descricao: descricao.value,
            usuario_id: usuario.id
        }

        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${id.value}`,{
            method: "put",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(resposta => resposta.json())
        .then(json => {
            alert(json.mensagem);
            fecharFormEditar();
            buscarTarefas();
        })
    } catch (error) {
        alert("Error: ", error.message);
    }
}

function deletarTarefa(id){
    if(confirm("Deseja realmente apagar?")){
        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${id.value}`, {
            method: "delete",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(resposta => resposta.json())
        .then(json => {
            alert(json.mensagem);
            buscarTarefas();
        })
    }
}

function abrirFormCriar(){
    let overlay = document.querySelector("#overlay");
    let formCriar = document.querySelector("#form-criar");
    overlay.classList.remove("opacity-0","invisible");
    formCriar.classList.remove("opacity-0","invisible");
}

function fecharFormCriar(){
    let overlay = document.querySelector("#overlay");
    let formCriar = document.querySelector("#form-criar");
    overlay.classList.add("opacity-0","invisible");
    formCriar.classList.add("opacity-0","invisible");
}

function abrirFormEditar(id){
    let overlay = document.querySelector("#overlay");
    let formEditar = document.querySelector("#form-editar");
    let idEdicao = document.querySelector("#idEdicao");
    let tituloEdicao = document.querySelector("#tituloEdicao");
    let descricaoEdicao = document.querySelector("#descricaoEdicao");
    let tarefa = tarefas.find(tarefa => tarefa.id == id);
    idEdicao.value = tarefa.id;
    tituloEdicao.value = tarefa.titulo;
    descricaoEdicao.value = tarefa.descricao;

    overlay.classList.remove("opacity-0","invisible");
    formEditar.classList.remove("opacity-0","invisible");
}

function fecharFormEditar(){
    let overlay = document.querySelector("#overlay");
    let formEditar = document.querySelector("#form-editar");
    overlay.classList.add("opacity-0","invisible");
    formEditar.classList.add("opacity-0","invisible");
}

function pesquisarTarefa(palavra){
    if(palavra.length == 0){
        carregarTarefas(tarefas);
        return; 
    }

    if(palavra.length >= 3){
        let tarefasFiltradas = tarefas.filter(tarefa => tarefa.titulo.toLowerCase().includes(palavra.toLowerCase()))
        carregarTarefas(tarefasFiltradas);
    }
}