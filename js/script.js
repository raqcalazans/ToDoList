// Selecionando os elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes 
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'line-through';

// Variáveis
let LIST = [],
    id = 0;

// Mostrar a data
const options = {weekday:'long', month:'short', day:'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en", options);

function addToDo(toDo, id, done, trash) {

    if(trash) {
        return; 
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    list.innerHTML += `
    <li class="item">
        <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
    </li>
    `
}

document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        const toDo = input.value;
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            id++;
        }
        input.value = "";
    }
});


function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Botão check
list.addEventListener('click', function(event){
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;

    if(elementJOB == "complete") {
        completeToDo(element);
    } else if(elementJOB == "delete") {
        removeToDo(element);
    }
});

// Excluir uma tarefa
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Excluir todas as tarefas
clear.addEventListener('click', function(){
    list.innerHTML = '';
}); 