document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => renderTask(task));

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if(task.isCompleted) {
            li.classList.add("completed");
        }
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') {
                return;
            }
            task.isCompleted = !task.isCompleted;
            li.classList.toggle("completed");
            saveTask();
        })
        todoList.appendChild(li);
    }


    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if(taskText === "") {
            return;
        }
        const newTask = {
            id: Date.now(),
            text: taskText,
            isCompleted: false
        };

        tasks.push(newTask);
        saveTask();
        todoInput.value = ""; //To clear the input
        console.log(tasks);
    })
})
