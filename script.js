document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = loadTasks();

    renderTasks();

    function loadTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        todoList.innerHTML = "";
        let fragment = document.createDocumentFragment();
        tasks.forEach(task => {
            fragment.appendChild(renderEachElement(task));
        });
        todoList.appendChild(fragment);
    }

    function renderEachElement(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.className = task.isCompleted? 'completed':'';
        li.innerHTML = `
            <span>${task.text}</span>  
            <button>Delete</button>  
        `;
        return li;
    }


    function addTask(text) {
        task = {
            id: Date.now(),
            text,
            isCompleted: false
        };
        tasks.push(task);
        saveTask();
        todoList.appendChild(renderEachElement(task));
    }

    //Add Task
    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if(!taskText) {
            return;
        }
        addTask(taskText);
        todoInput.value = "";
    });

    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if(!li) {
            return;
        }
        const taskId = Number (li.dataset.id);

        if(e.target.tagName === 'BUTTON') {
            //e.stopPropagation();
            tasks = tasks.filter((task) => task.id != taskId)
            li.remove();
        }
        else if(e.target.tagName === 'SPAN') {
            const task = tasks.find((task) => task.id == taskId); 
            if(task) {
                task.isCompleted = !task.isCompleted;
                li.classList.toggle('completed');
            }
        }
        saveTask();
    });
})