$(document).ready(function () {
    $.post(window.location.href, function (data) {
        let eventString = '<h2 class="event-title">'+ data.event.title +
            '&nbsp;<small class="date">'+ data.event.date +'</small>&nbsp;' +
            '<small class="contact">'+ data.event.contact +'</small></h2>' +
            '<p class="description">'+ data.event.description +'</p>' +
            '<p class="rating">rating&nbsp;';

        if (data.event.new === 1) {
            eventString += 'NEW Event</p>';
        } else {
            for (let i = 0; i < 5; i++){
                if (i < data.event.rating){
                    eventString += '<span class="glyphicon glyphicon-star"></span>';
                } else {
                    eventString += '<span class="glyphicon glyphicon-star-empty"></span>';
                }
            }
            eventString += '</p>';
        }

        $('#event-card').html(eventString).fadeIn();
    });
});