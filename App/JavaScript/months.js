// const january = [
//     {}
// ]
// const february = [
//     {}
// ]
// const march = [
//     {}
// ] 
// const april = [
//     {}
// ]
// const may = [
//     {}
// ]
// const june = [
//     {}
// ]
// const july = [
//     {}
// ]
// const august = [
//     {}
// ]
// const september = [
//     {}
// ]
// const october = [
//     {dayOfMonth:1,dayOfWeek:"Tuesday"},
//     {dayOfMonth:2,dayOfWeek:"Wednesday"},
//     {dayOfMonth:3,dayOfWeek:"Thursday"},
//     {dayOfMonth:4,dayOfWeek:"Friday"},
//     {dayOfMonth:5,dayOfWeek:"Saturday"},
//     {dayOfMonth:6,dayOfWeek:"Sunday"},
//     {dayOfMonth:7,dayOfWeek:"Monday"},
//     {dayOfMonth:8,dayOfWeek:"Tuesday"},
//     {dayOfMonth:9,dayOfWeek:"Wednesday"},
//     {dayOfMonth:10,dayOfWeek:"Thursday"},
//     {dayOfMonth:11,dayOfWeek:"Friday"},
//     {dayOfMonth:12,dayOfWeek:"Saturday"},
//     {dayOfMonth:13,dayOfWeek:"Sunday"},
//     {dayOfMonth:14,dayOfWeek:"Monday"},
//     {dayOfMonth:15,dayOfWeek:"Tuesday"},
//     {dayOfMonth:16,dayOfWeek:"Wednesday"},
//     {dayOfMonth:17,dayOfWeek:"Thursday"},
//     {dayOfMonth:18,dayOfWeek:"Friday"},
//     {dayOfMonth:19,dayOfWeek:"Saturday"},
//     {dayOfMonth:20,dayOfWeek:"Sunday"},
//     {dayOfMonth:21,dayOfWeek:"Monday"},
//     {dayOfMonth:22,dayOfWeek:"Tuesday"},
//     {dayOfMonth:23,dayOfWeek:"Wednesday"},
//     {dayOfMonth:24,dayOfWeek:"Thursday"},
//     {dayOfMonth:25,dayOfWeek:"Friday"},
//     {dayOfMonth:26,dayOfWeek:"Saturday"},
//     {dayOfMonth:27,dayOfWeek:"Sunday"},
//     {dayOfMonth:28,dayOfWeek:"Monday"},
//     {dayOfMonth:29,dayOfWeek:"Tuesday"},
//     {dayOfMonth:30,dayOfWeek:"Wednesday"},
//     {dayOfMonth:31,dayOfWeek:"Thursday"},

// ]
// const november = [
//     {}
// ]
// const december = [
//     {}
// ]

// const year = [january,february,march,april,may,june,july,august,september,october,november,december];
// const week = [sunday,monday,tuesday,wednesday,thursday,friday,saturday];

document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const selectMonthYear = document.getElementById('selectMonthYear');
    const calendarBody = document.getElementById('calendarBody');

   
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
    }

   
    displayMonth(9, 2023);

    monthSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });

    yearSelect.addEventListener('change', function () {
        displayMonth(parseInt(monthSelect.value), parseInt(yearSelect.value));
    });
});
