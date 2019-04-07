$(function() {
  $("#datetimepickerStart").datetimepicker({
    icons: {
      time: "far fa-clock",
      date: "fa fa-calendar",
      up: "fa fa-arrow-up",
      down: "fa fa-arrow-down"
    }
  });
  $("#datetimepickerEnd").datetimepicker({
    useCurrent: false,
    icons: {
      time: "far fa-clock",
      date: "fa fa-calendar",
      up: "fa fa-arrow-up",
      down: "fa fa-arrow-down"
    }
  });
  $("#datetimepickerStart").on("change.datetimepicker", function(e) {
    $("#datetimepickerEnd").datetimepicker("minDate", e.date);
  });
  $("#datetimepickerEnd").on("change.datetimepicker", function(e) {
    $("#datetimepickerStart").datetimepicker("maxDate", e.date);
  });

  $("#calendar").fullCalendar({
    themeSystem: "bootstrap4",
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    defaultDate: "2019-04-12",
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectMirror: true,
    select: function(arg) {
      $("#scheduler").modal("show");
    },
    // select: function(arg) {
    //   var title = prompt("Event Title:");
    //   if (title) {
    //     calendar.addEvent({
    //       title: title,
    //       start: arg.start,
    //       end: arg.end,
    //       allDay: arg.allDay
    //     });
    //   }
    //   calendar.unselect();
    // },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: "All Day Event",
        start: "2019-04-01"
      },
      {
        title: "Long Event",
        start: "2019-04-07",
        end: "2019-04-10"
      },
      {
        groupId: 999,
        title: "Repeating Event",
        start: "2019-04-09T16:00:00"
      },
      {
        groupId: 999,
        title: "Repeating Event",
        start: "2019-04-16T16:00:00"
      },
      {
        title: "Conference",
        start: "2019-04-11",
        end: "2019-04-13"
      },
      {
        title: "Meeting",
        start: "2019-04-12T10:30:00",
        end: "2019-04-12T12:30:00"
      },
      {
        title: "Lunch",
        start: "2019-04-12T12:00:00"
      },
      {
        title: "Meeting",
        start: "2019-04-12T14:30:00"
      },
      {
        title: "Happy Hour",
        start: "2019-04-12T17:30:00"
      },
      {
        title: "Dinner",
        start: "2019-04-12T20:00:00"
      },
      {
        title: "Birthday Party",
        start: "2019-04-13T07:00:00"
      },
      {
        title: "Click for Google",
        url: "http://google.com/",
        start: "2019-04-28"
      }
    ]
  });
});
