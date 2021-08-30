import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import moment from 'moment';

document.addEventListener('turbolinks:load', function() {
  $('#calendar').each(function(){
    var calendarEl = $(this)[0];
    let calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
      
      customButtons: {
        myCustomButton: {
          text: 'Create',
          click: function() {
            $.getScript('/events/new', function(){})
          }
        }
      },

      headerToolbar: {
        left: 'today, prev, next, myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },

      themeSystem: 'bootstrap',
      aspectRatio: 1.8,
      editable: true,
      droppable: true,
      selectable: true,
      unselectAuto: false,
      selectMirror: true,

      eventSources: [
        '/events.json',
      ],

      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false
      },

      select: function(info) {
        let start, end
        if(info.allDay){
          start = moment(info.start).startOf('date').format('YYYY-MM-DDTHH:mm')
          end = moment(info.end).subtract(1, 'days').endOf('date').format('YYYY-MM-DDTHH:mm')
        }else{
          start = moment(info.start).format('YYYY-MM-DDTHH:mm')
          end = moment(info.end).format('YYYY-MM-DDTHH:mm')
        }

        if(info.jsEvent){
            $.getScript('/events/new', function(){
              $('.event_start').val(start);
              $('.event_end').val(end);
            }).fail(function( jqxhr, settings, exception) {
              if(exception== "Unauthorized"){
                window.location.href = '/users/sign_in';
              }else{
                console.log(exception);
              }
           })
        }else{
          console.log("open")
        }
      },

      // eventDidMount: function(info){
      //   var start = moment(info.event.start).format('MMMM Do YYYY, h:mm:ss a');
      //   var end = moment(info.event.end).format('MMMM Do YYYY, h:mm:ss a');
      //   var tooltip = new bootstrap.Popover(info.el, {
      //     title: info.event.title,
      //     content: start+ ' - ' + end,
      //     template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header justify-content-center"></h3><div class="popover-body"></div></div>',
      //     placement: 'top',
      //     trigger: 'hover',
      //     container: 'body',
      //     html: true,
      //   });
      // },
  
      eventClick: function(info) {
        window.event_position ='left+' + info.jsEvent.pageX+ ' top+' + info.jsEvent.pageY
        $.getScript(info.event.extendedProps.show_url, function(){
          info.el.style.borderColor = 'black';
        })
      },

      eventDrop: function(info){
        let new_data = { 
          event: {
            id: info.event.id,
            start: moment(info.event.start).format('YYYY-MM-DDTHH:mm'),
            end: moment(info.event.end).format('YYYY-MM-DDTHH:mm'),
          }
        }
        $.ajax({
          url: info.event.extendedProps.update_url,
          data: new_data,
          type: 'PATCH',
          dataType: 'script',
        });
      },

      eventResize: function(info){
        let new_data = { 
          event: {
            id: info.event.id,
            start: moment(info.event.start).format('YYYY-MM-DDTHH:mm'),
            end: moment(info.event.end).format('YYYY-MM-DDTHH:mm'),
          }
        }
        $.ajax({
          url: info.event.extendedProps.update_url,
          data: new_data,
          type: 'PATCH',
          dataType: 'script',
        });
      }
      
    });
    calendar.render();
    window.calendar = calendar
  })
});