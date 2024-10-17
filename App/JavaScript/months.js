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
    let tasksByDate = JSON.parse(localStorage.getItem("tasksByDate")) || {};

    function saveTasksToLocalStorage(date, tasks) {
        tasksByDate[date] = tasks;
        localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
    }

    function loadTasksFromLocalStorage(date) {
        return tasksByDate[date] || [];
    }

    function renderTasks(tasks) {
        const taskElements = toDoList.querySelectorAll('p');
        taskElements.forEach(task => task.remove());

        tasks.forEach(task => {
            const taskElement = document.createElement("p");
            const checkbox = document.createElement("input");
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            if (task.completed) {
                taskElement.style.textDecoration = 'line-through';
            }

            checkbox.addEventListener('change', function () {
                task.completed = checkbox.checked;
                taskElement.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
                saveTasksToLocalStorage(currentlySelectedDate, tasks);
            });

            taskElement.textContent = `${task.text}`;
            taskElement.prepend(checkbox);
            toDoList.appendChild(taskElement);
        });
    }

    const toggleTd = function (event) {
        const td = event.target;

        if (!td.classList.contains("tdSelected")) {
            const previousSelected = document.querySelector(".tdSelected");
            if (previousSelected) {
                previousSelected.classList.remove("tdSelected");
                if (body.classList === "dark-mode") {
                    previousSelected.style.backgroundColor = "#6b6b6b"
                } else if (body.classList === "light-mode") {
                    previousSelected.style.backgroundColor = "#f5f4f4";
                };
            }
            
            td.classList.add("tdSelected");
        }

        const selectedDate = `${selectMonthYear.textContent}-${td.textContent.trim()}`;
        currentlySelectedDate = selectedDate;

        const tasks = loadTasksFromLocalStorage(selectedDate);
        renderTasks(tasks);

        aside.style.display = "block";
    };

    function addTask() {
        const taskText = prompt("Add new task: ").trim();
        if (taskText === '') return;

        if (!currentlySelectedDate) {
            alert("Please select a date first!");
            return;
        }

        const tasks = loadTasksFromLocalStorage(currentlySelectedDate);
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);

        saveTasksToLocalStorage(currentlySelectedDate, tasks);
        renderTasks(tasks);
    }

    addTaskToDo.removeEventListener('click', addTask);
    addTaskToDo.addEventListener("click", addTask);

    const tdListener = function () {
        const tdElements = calendarBody.getElementsByTagName('td');
        for (let i = 0; i < tdElements.length; i++) {
            tdElements[i].addEventListener("click", toggleTd);
        }
    };

    function displayMonth(monthIndex, year) {
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const firstDay = new Date(year, monthIndex, 1).getDay();

        selectMonthYear.innerHTML = `${monthSelect.options[monthIndex].text} ${year}`;

        let tableHTML = '<tr>';
        for (let i = 0; i < firstDay; i++) {
            tableHTML += `<td></td>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = `${monthSelect.options[monthIndex].text} ${year}-${day}`;
            const tasksForCurrentDate = loadTasksFromLocalStorage(currentDate);
    
            const allTasksCompleted = tasksForCurrentDate.length > 0 && tasksForCurrentDate.every(task => task.completed);

            if (tasksForCurrentDate.length > 0 && !allTasksCompleted) {
                tableHTML += `<td style="background-color: #def1be;">${day}</td>`;
            } else if (allTasksCompleted) {
                tableHTML += `<td>${day}</td>`;
            } else {
                tableHTML += `<td>${day}</td>`;
            }
    
            if ((firstDay + day) % 7 === 0) {
                tableHTML += '</tr><tr>';
            }
        }

        tableHTML += '</tr>';
        calendarBody.innerHTML = tableHTML;

        tdListener();
    }

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


    displayMonth(9, 2024);

    monthSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));

        var img = document.getElementById("BackgroundImg");
        if (monthSelect.value == 0) {
            img.style.backgroundImage = `url('https://img.freepik.com/premium-vector/vector-pattern-with-snowflakes-white-background-christmas-decorations_596424-38.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center'; 
         } else if(monthSelect.value == 1) {
            img.style.backgroundImage = `url('https://img.freepik.com/premium-vector/vector-illustration-small-red-pink-hearts-pattern-white-background_1220-2188.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center';  
         } else if(monthSelect.value == 2) {
            img.style.backgroundImage = `url('https://t4.ftcdn.net/jpg/03/20/97/63/360_F_320976376_vLghJE59lPz0i9LIwqAOE6tCw1oCwGMi.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center';   
         } else if(monthSelect.value == 3) {
            img.style.backgroundImage = `url('https://media.istockphoto.com/id/1277561237/vector/cartoon-raining-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=LRLddc_LhV0r8jIfn5DGu2yy_ii8cN-K9vH_aa0PHW4=')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center'; 
         } else if(monthSelect.value == 4) {
            img.style.backgroundImage = `url('https://img.freepik.com/premium-photo/there-are-many-different-flowers-white-background-generative-ai_958124-68312.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center';  
         } else if(monthSelect.value == 5) {
            img.style.backgroundImage = `url('https://static.vecteezy.com/system/resources/previews/029/219/378/non_2x/beach-ball-seamless-pattern-on-a-white-background-summer-holiday-theme-illustration-vector.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center'; 
         } else if(monthSelect.value == 6) {
            img.style.backgroundImage = `url('https://cdn.vectorstock.com/i/500p/11/18/colorful-fireworks-background-vector-4681118.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center';  
         } else if(monthSelect.value == 7) {
            img.style.backgroundImage = `url('https://png.pngtree.com/png-clipart/20230924/original/pngtree-school-supplies-pattern-on-white-background-with-rulers-pencils-and-markers-png-image_12845126.png')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center';  
         } else if(monthSelect.value == 8) {
            img.style.backgroundImage = `url('https://i.pinimg.com/736x/60/5a/b7/605ab77d69c61a8b498325a9b2054c0f.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center'; 
         } else if(monthSelect.value == 9) {
            img.style.backgroundImage = `url('https://img.freepik.com/premium-photo/seamless-pattern-halloween-pumpkins-white-background_212417-720.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center'; 
         } else if(monthSelect.value == 10) {
            img.style.backgroundImage = `url('https://media.istockphoto.com/id/818710928/vector/watercolor-autumn-set-of-leaves-branches-flowers-and-pumpkins-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=nw5V7jVDU5eN0ShZ56c3liR2Ic3uZNpYVGOPDH1jaWE=')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center';
         } else if(monthSelect.value == 11) {
            img.style.backgroundImage = `url('https://wallpapercave.com/wp/wp10333807.jpg')`; 
            img.style.backgroundRepeat = 'repeat';
            img.style.backgroundSize = 'auto';
            img.style.backgroundPosition = 'center'; 
         }
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
            alert('Invalid City');
            console.error('Error fetching weather data:', error);
        });
});