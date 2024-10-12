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
    taskElement.textContent = task;
    toDoList.appendChild(taskElement);
})

addTaskToDo.addEventListener("click", () => {
    const task = prompt("Add new task: ").trim();
    const taskElement = document.createElement("p");
    taskElement.textContent = task;
    toDoList.appendChild(taskElement);
})