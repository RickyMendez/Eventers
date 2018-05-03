$(document).ready(function () {
    if (localStorage.user == undefined){
        $('#login-modal').show();
        $("main").hide();
    } else {
        // continue with page responsive handlers
        (function () {
            $.get('/events/get/all/full', function (events) {
                let tableBody = '';
                $.each(events, function (index) {

                    tableBody += '<tr class="cs-table-row" id="'+ events[index]._id +'">' +
                        '<td>'+ events[index].event.title + '</td>' +
                        '<td>'+ events[index].event.description + '</td>' +
                        '<td>'+ events[index].event.date + '</td>' +
                        '<td>'+ events[index].event.category + '</td>' +
                        '</tr>'
                });

                $('#event-list-body').html(tableBody).fadeIn();

                addClickEvent();
            });

            function addClickEvent() {
                $('.cs-table-row').on('click', function (e) {
                    window.location = '/events/event/'+ this.id;
                });
            }
        }());// end page responsive handler
    }
});
