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

const thirtyOne = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const thirty = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const twentyEight = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

const months = [
  { name: "January", days: thirtyOne},
  { name: "February", days: twentyEight},
  { name: "March", days: thirtyOne},
  { name: "April", days: thirty},
  { name: "May", days: thirtyOne},
  { name: "June", days: thirty},
  { name: "July", days: thirtyOne},
  { name: "August", days: thirtyOne},
  { name: "September", days: thirty},
  { name: "October", days: thirtyOne},
  { name: "November", days: thirty},
  { name: "December", days: thirtyOne}
];

const selectMonth = document.getElementById('selectMonth');
const monthSelect = document.getElementById('monthSelect');

function displayMonth(monthName) {
    const month = months.find(m => m.name === monthName);
    if (month) {
        let tableHTML = `<table><thead><tr><th></th></tr></thead><tbody>`;
        
        month.days.forEach(day => {
            tableHTML += `<tr><td>${day}</td></tr>`;
        });
        
        tableHTML += `</tbody></table>`;
        
        selectMonth.innerHTML = `<h2>${month.name}</h2>${tableHTML}`;
    } else {
        selectMonth.innerHTML = `<p>Month not found.</p>`;
    }
}

displayMonth();

monthSelect.addEventListener('change', function() {
    displayMonth(monthSelect.value);
});