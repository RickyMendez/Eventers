$(document).ready(function () {
    // Populate the cards on the home page
    function init(done) {
        // ajax call to server for initial data
        $.get("/events/get/all", function (data) {
            // string variables
            var newEvent = '<h2>New Events</h2><ul class="cs-card-item">';
            var popEvent = '<h2>Popular</h2><ul class="cs-card-item">';
            var catList = '<h2>Categories</h2><ul class="cs-card-item">';

            // categories array to check for duplicate categories
            var categories = new Array();

            // store the events from the initial json ajax call to access locally and redirect
            var eventsList = new Array();

            // loop through the data returned from the json file
            $.each(data, function (key, value) {
                // because the data return is a nested array of objects we need to loop through the events array
                // populate the new events card
                if (value.event.new === 1) {
                    newEvent += '<li><a href="/events/event/' + value._id + '">' +
                        '<h4>' + value.event.title + '&nbsp;<small>' + value.event.date + '</small></h4></a><p>'
                        + value.event.description + '</p></li>';
                }

                // populate the popular card
                if (value.event.rating > 3) {
                    popEvent += '<li><a href="/events/event/' + value._id + '">' +
                        '<h4>' + value.event.title + '&nbsp;<small>' + value.event.date + '</small></h4></a><p>'
                        + value.event.description + '</p></li>';
                }

                // populate the categories card
                if ($.inArray(value.event.category, categories) < 0) {
                    categories.push(value.event.category);
                    catList += '<li><a href="/events/category"><h4>' + value.event.category + '</h4></a></li>';
                }

                eventsList.push(value.event);
            });// end json data loop
            // close the strings for each card
            newEvent += '</ul>';
            popEvent += '</ul>';
            catList += '</ul>';

            // replace the inner html in each card
            $('#new-ev').html(newEvent);
            $('#pop-ev').html(popEvent);
            $('#ev-cat-list').html(catList);

            // important: must call the function passed in after everything is loaded so that the elements are available
            done();
        });// end json data ajax call
    }// end populate main page function

    // startup function call
    init(function () {
        // assign click handlers to all of the links on the main page
        $('main a').each(function (index) {
            // anchor tag click handler
            $(this).click(function (e) {
                // check the user login status
                if (localStorage.user == undefined){
                    // if user isn't logged in then we will not redirect to event details page
                    e.preventDefault();
                    // instead popup a notification telling the user to login
                    snackbarNotification('Login is required to view events');
                }
            });// end anchor tag click handler
        });// end click handler assignment
    });// end startup function call
});