const addTaskButton = document.getElementById("add-task-btn");
const todoInput = document.getElementById("todo-input");

let tasks = [];


addTaskButton.addEventListener('click', () => {

    const taskText = todoInput.value.trim();
    if(taskText === "") {
        return;
    }
    
})