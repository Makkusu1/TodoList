const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

todoButton.addEventListener('click',addToDo)
todoList.addEventListener('click',deleteCheck)
document.addEventListener('DOMContentLoaded',getTodos)
function addToDo(event){
    event.preventDefault()
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const completedButton = document.createElement('button')
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // add todo localstorage
    saveLocalTodos(todoInput.value)
    // 
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    todoList.appendChild(todoDiv)
    todoInput.value = ""
}
function deleteCheck(event){
    const item = event.target
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement
        removeLocalTodos(todo)
        todo.remove();
    }
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement
        todo.classList.toggle('completed')
        if(todo.classList.contains("completed")){
            todo.children[0].innerHTML = '<i class="fas fa-check"></i>'
        }
        else{
            todo.children[0].innerHTML = ''
        }
    }
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        const completedButton = document.createElement('button')
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}