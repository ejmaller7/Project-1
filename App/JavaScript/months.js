document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const selectMonthYear = document.getElementById('selectMonthYear');
    const calendarBody = document.getElementById('calendarBody');
    const aside = document.getElementsByTagName("aside")[0];


    const toggleAside = () => {
        if(aside.style.display === "none" || aside.style.display === "") {
            aside.style.display = "block";
        } else {
            aside.style.display = "none";
        }
    };


    const toggleTd = function (event) {
        const td = event.target;    
        
        if (td.classList.contains("tdSelected")) {
            td.classList.remove("tdSelected");
        } else {
            td.classList.add("tdSelected");
        }
    }


    const tdListener = function () {
        const tdElements = calendarBody.getElementsByTagName('td');
        for (let i = 0; i < tdElements.length; i++) {
            tdElements[i].addEventListener("click", function(event) {
                toggleAside();
                toggleTd(event)
            });
        }
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

   
    displayMonth(9, 2023);

    monthSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });

    yearSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });
})

