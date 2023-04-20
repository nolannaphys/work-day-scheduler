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

  $('#currentDay').text(`${todaysDate}`);

  $.each(timeSlot, function (key, value){
    let idHour = value.id;
    if (value.hour < currentHour){
    $(idHour).removeClass('future');
    $(idHour).removeClass('present');
    $(idHour).addClass('past');
  } else if (value.hour == currentHour){
    $(idHour).removeClass('future');
    $(idHour).removeClass('past');
    $(idHour).addClass('present');
  } else {
    $(idHour).removeClass('present');
    $(idHour).removeClass('past');
    $(idHour).addClass('future');
  }
});

$('.saveBtn').click(function () {
  let parentEl = $(this).parent().attr('id');
  let parentElId = `#${parentEl}`;
  let textField = $(parentElId).find('textarea').val();
  let userEntry = {
    day: todaysDate, hour: parentEl, event: textField,
  };
  
  let entryHourId;

  if (localStorage.getItem('day-planner-events') !== null){
    retrieveUserEntry = JSON.parse(localStorage.getItem('day-planner-events'));
    retrieveUserEntry.push(userEntry);
    localStorage.setItem('day-planner-events', JSON.stringify(retrieveUserEntry));

    $.each(retrieveUserEntry, function (key, value){
      if (value.day === todaysDate){
        entryHourId = `#${value.hour}`;
        $(entryHourId).find('textarea').text(value.event);
      }
    });
  }

  else {
      retrieveUserEntry.push(userEntry);
      localStorage.setItem('day-planner-events', JSON.stringify(retrieveUserEntry));
  }

  let confirmationMessage = $('#confirmationMessage');
  let storageMessage = $('.storage-message');

  confirmationMessage.css('color', 'black');
  storageMessage.css('color', 'red');

  setTimeout(function (){
    confirmationMessage.css('color', 'transparent');
    storageMessage.css('color', 'transparent');
  }, 2000);
});
});

    // TODO: Add code to display the current date in the header of the page.
    // var dateTime = function() { 
    //   $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
    //   console.log('test')
    // }
    // setInterval(dateTime, 1000);
