// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let timeSlot = [
    {id: "#hour-9", hour: 9},
    {id: "#hour-10", hour: 10},
    {id: "#hour-11", hour: 11},
    {id: "#hour-12", hour: 12},
    {id: "#hour-13", hour: 13},
    {id: "#hour-14", hour: 14},
    {id: "#hour-15", hour: 15},
    {id: "#hour-16", hour: 16},
    {id: "#hour-17", hour: 17},
  ];

  let retrieveUserEntry = [];

  let currentYear = dayjs().$y;
  let currentMonth = dayjs().format('MMMM');
  let currentDayOfMonth = dayjs().$D;
  let currentDay = dayjs().format('dddd');
  let currentHour = dayjs().format('HH');
  let todaysDate = dayjs().format('dddd, MMMM D, YYYY');

  if (localStorage.getItem('day-planner-events') !== null){
    retrieveUserEntry = JSON.parse(localStorage.getItem('day-planner-events'));
    localStorage.setItem('day-planner-events', JSON.stringify(retrieveUserEntry));

    $.each(retrieveUserEntry, function (key, value){
      if (value.day === todaysDate){
        let entryHourId = `#${value.hour}`;
        $(entryHourId).find('textarea').text(value.event);
      }
    });
  }

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
  })
    // TODO: Add code to display the current date in the header of the page.
    var dateTime = function() { 
      $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
      console.log('test')
    }
    setInterval(dateTime, 1000);
