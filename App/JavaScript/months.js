const monthImages = [
    './App/Images/january.webp',
    './App/Images/february.jpg',
    './App/Images/march.jpg',
    './App/Images/april.jpg',
    './App/Images/may.jpg',
    './App/Images/june.jpg',
    './App/Images/july.jpg',
    './App/Images/august.jpg',
    './App/Images/september.jpg',
    './App/Images/october.avif',
    './App/Images/november.jpg',
    './App/Images/december.png'
]

document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const selectMonthYear = document.getElementById('selectMonthYear');
    const calendarBody = document.getElementById('calendarBody');
    const aside = document.getElementById('tasks');
    const toDoList = document.getElementById("listStyle");
    const addTaskToDo = document.getElementById("toDoTask");

    let currentlySelectedDate = null;

    // const toggleAside = (id) => {
    //     if (aside.style.display === "none" || aside.style.display === "") {
    //         aside.style.display = "block";
    //     } else {
    //         aside.style.display = "none";
    //     }
        //logic (pass in id)

    // };

    const toggleTd = function (event) {
        const td = event.target;

        if (!td.classList.contains("tdSelected")) {
            if (currentlySelectedDate) {
                currentlySelectedDate.classList.remove("tdSelected");
                currentlySelectedDate.setAttribute("style", "background-color: #f5f4f4");
            }
            td.classList.add("tdSelected");
            currentlySelectedDate = td;
            td.setAttribute("style", "background-color: #FFFF00;");
        } else {
            td.classList.remove("tdSelected");
            td.setAttribute("style", "background-color: #f5f4f4");
        }

        const selectedDate = `${selectMonthYear.textContent}-${td.textContent}`;
        loadTasksFromLocalStorage(selectedDate);
    };

    function saveTasksToLocalStorage(date, tasks) {
        localStorage.setItem(date, JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage(date) {
        const savedTasks = localStorage.getItem(date);
        const tasks = savedTasks ? JSON.parse(savedTasks) : [];
        renderTasks(tasks);
    }

    function renderTasks(tasks) {
        const taskContainer = document.querySelector("#listStyle p");
        if (taskContainer) taskContainer.remove();
        const newTaskContainer = document.createElement("p");

        tasks.forEach(task => {
            const taskElement = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            if (task.completed) {
                taskElement.style.textDecoration = 'line-through';
            }

            checkbox.addEventListener('change', function () {
                task.completed = checkbox.checked;
                taskElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
                const selectedDate = `${selectMonthYear.textContent}-${currentlySelectedDate.textContent}`;
                saveTasksToLocalStorage(selectedDate, tasks); // Update tasks in localStorage
            });

            taskElement.textContent = `${task.text} (Added: ${new Date(task.timestamp).toLocaleString()})`;
            taskElement.prepend(checkbox);
            newTaskContainer.appendChild(taskElement);
        });
        toDoList.appendChild(newTaskContainer);
    }

    // function loadTasksFromLocalStorage(date) {
    //     const savedTasks = localStorage.getItem(date);
    //     const tasks = savedTasks ? JSON.parse(savedTasks) : [];

    //     if (!Array.isArray(tasks)) {
    //         console.error("Expected tasks to be an array but got:", tasks);
    //         return [];
    //     }

    //     renderTasks(tasks);
    //     return tasks;
    // }

    // function renderTasks(tasks) {
    //     const taskContainer = document.querySelector("#listStyle p");
    //     if (taskContainer) taskContainer.remove();
    //     const newTaskContainer = document.createElement("p");

    //     tasks.forEach(task => {
    //         const taskElement = document.createElement("div");
    //         const checkbox = document.createElement("input");
    //         checkbox.type = 'checkbox';
    //         checkbox.checked = task.completed;

    //         if (task.completed) {
    //             taskElement.style.textDecoration = 'line-through';
    //         }

    //         checkbox.addEventListener('change', function () {
    //             task.completed = checkbox.checked;
    //             if (checkbox.checked) {
    //                 taskElement.style.textDecoration = 'line-through';
    //             } else {
    //                 taskElement.style.textDecoration = 'none';
    //             }
    //             const selectedDate = `${selectMonthYear.textContent}-${currentlySelectedDate.textContent}`;
    //             saveTasksToLocalStorage(selectedDate, tasks); 
    //         });

    //         taskElement.textContent = task.text;
    //         taskElement.prepend(checkbox);
    //         newTaskContainer.appendChild(taskElement);
    //     });
    //     toDoList.appendChild(newTaskContainer);
    // }

    function addTask() {
        const taskText = document.getElementById("task-p").value;
        if (taskText === '') return;

        // const selectedDate = `${selectMonthYear.textContent}-${currentlySelectedDate.textContent}`;
        // const tasks = loadTasksFromLocalStorage(selectedDate); 
        // const newTask = { text: taskText, completed: false };

        // tasks.push(newTask); 

        // saveTasksToLocalStorage(selectedDate, tasks); 
        // renderTasks(tasks); 
    }

    addTaskToDo.addEventListener("click", addTask);

    const tdListener = function () {
        const tdElements = calendarBody.getElementsByTagName('td');
        for (let i = 0; i < tdElements.length; i++) {
            tdElements[i].addEventListener("click", function (event) {
                tdElements[i].id = `td${[i]}-${monthSelect.value}-${yearSelect.value}`;
                const toggleAside = (id) => {
                    const asideElement = document.getElementById(id)
                    if (asideElement) {
                        if (aside.style.display === "none" || aside.style.display === "") {
                            aside.style.display = "block";
                        } else {
                            aside.style.display = "none";
                        }
                    }
                // toggle p-tag
                // variable = document.getElementById("task-p").value
                // if(asideElement) {}
                };               
                toggleAside(`td${[i]}-${monthSelect.value}-${yearSelect.value}`);
                toggleTd(event);
            });
        }
    };

    if (!monthSelect || !yearSelect || !selectMonthYear || !calendarBody) {
        console.error('One or more calendar elements are missing in the DOM.');
        return;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function getDaysInMonth(month, year) {
        const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month];
    }

    function getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    function displayMonth(monthIndex, year) {
        const daysInMonth = getDaysInMonth(monthIndex, year);
        const firstDay = getFirstDayOfMonth(monthIndex, year);

        selectMonthYear.innerHTML = `${monthSelect.options[monthIndex].text} ${year}`;

        let tableHTML = '<tr>';
        for (let i = 0; i < firstDay; i++) {
            tableHTML += `<td></td>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            tableHTML += `<td>${day}</td>`;
            if ((firstDay + day) % 7 === 0) {
                tableHTML += '</tr><tr>';
            }
        }

        tableHTML += '</tr>';
        calendarBody.innerHTML = tableHTML;

        tdListener();
    }

    displayMonth(9, 2024);

    monthSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });

    yearSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });
});

document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    const apiKey = 'a72fd5b57b39a74eb1bd5d872c138b8f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

			const tempInF = (data.main.temp * 9 / 5) +32;
            const weatherInfo = `
                <p>${data.name} Weather</p>
                <p>Temperature: ${tempInF.toFixed(2)} °F</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Description: ${data.weather[0].description}</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});