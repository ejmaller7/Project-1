const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Light Mode';
    } else {
        toggleButton.textContent = 'Dark Mode';
    }
});

const toDoList = document.getElementById("listStyle");
const addTaskNav = document.getElementById("addTask");
const addTaskToDo = document.getElementById("toDoTask");

addTaskNav.addEventListener("click", () => {
    const task = prompt("Add new task: ").trim();
    const taskElement = document.createElement("p");
    const checkbox = document.createElement("input");

    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            taskElement.style.textDecoration = 'line-through';
        } else {
            taskElement.style.textDecoration = 'none';
        }
    });

    taskElement.textContent = task;

    taskElement.prepend(checkbox);
    toDoList.appendChild(taskElement);
})

addTaskToDo.addEventListener("click", () => {
    const task = prompt("Add new task: ").trim();
    const taskElement = document.createElement("p");
    const checkbox = document.createElement("input");

    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            taskElement.style.textDecoration = 'line-through';
        } else {
            taskElement.style.textDecoration = 'none';
        }
    });

    taskElement.textContent = task;

    taskElement.prepend(checkbox);
    toDoList.appendChild(taskElement);
    
})