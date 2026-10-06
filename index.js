function repetirCards(quantidade) {
    let tarefas = document.querySelector("#tarefas");
    tarefas.innerHTML = "";

    for (let i = 1; i < quantidade; i++) {
        tarefas.innerHTML += `       
        <div id="tarefas" class="grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
                <h3 class="font-bold mb-4">Titulo do card</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus temporibus neque fuga cumque nisi, magni aliquid minus. Placeat error impedit distinctio earum ipsum perspiciatis. Qui dicta a alias optio in.</p>
            </div>
        </div>`
    }
}

repetirCards(10);
