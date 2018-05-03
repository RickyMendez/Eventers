// jquery code
$(document).ready(function () {
    // user object for client side session tracking
    let user = null;

    (function () {
        setUser();
        userNavToggle();
    }());

    // check and set user
    function setUser() {
        if (localStorage.user != undefined){
            try {
                user = JSON.parse(localStorage.user);
                $('.cs-username').html(user.username + '&nbsp;<span class="caret hidden-sm"></span>');
            } catch (err){
                localStorage.clear();
            }
        }
    }

    // logout helper function
    function logout(e) {
        e.preventDefault();
        $.post(window.origin + '/logout', function () {
            localStorage.removeItem('user');
            user = null;
            userNavToggle();
            window.location = window.origin + '/home';
        });
    }// end logout helper function

    /**
     * navbar responsive handler
     *
     * show and hide navigation elements based on login and permissions
     */
    function userNavToggle() {
        if ($(this).width() < 569){
            $('.nav-user').hide();
            $('.cs-user-toggle').hide();
            if (user != null){
                $('.cs-default').hide();
                $('.cs-user').show();
            } else {
                $('.cs-user').hide();
                $('.cs-default').show();
            }
        } else {
            if (!$('#side-menu')[0].width > 0){
                $('#side-menu').width(0);
            }
            $('.nav-user').show();
            if (user != null){
                $('#top-login').hide();
                $('#top-register').hide();
                $('#nav-user').fadeIn(200);
                $('#nav-logout').fadeIn(200);
            } else {
                $('#top-login').fadeIn(200);
                $('#top-register').fadeIn(200);
                $('#nav-logout').hide();
                $('#nav-user').hide();
            }
        }
    }

    // responsive navigation on window resize
    $(window).resize(function () {
        userNavToggle();
    });

    // logout button click handlers
    $('#top-logout').click(logout);
    $('#side-logout').click(logout);

    // login form handler
    $('#login-form').submit(function (e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        if (username == '' || password == ''){
            $('#cs-login-error').html('All fields are required').show();
        }else {
            $.post(window.origin + '/login', {
                username: username,
                password: password
            }, function (data) {
                if (data.message) {
                    $('#cs-login-error').html(data.message).show();
                } else {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setUser();
                    userNavToggle();

                    if (!$('#cs-login-error').hidden) {
                        $('#cs-login-error').hide();
                    }
                    $('#login-form')[0].reset();
                    $('#login-modal').hide();
                }
            });
        }
    });// end login form handler

    // register form handler
    $('#register-form').submit(function (e) {
        e.preventDefault();
        const username = $('#new-username').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const password = $('#new-password').val();
        let errmess = [];

        if (username == '' || password == '' || email == ''){
            // create the error message for missing registration requirements
            errmess.push('Username, Email, and Password are required');

        }

        if (!/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,4}\s*$/.test(email)){
            // create the error message for invalid email
            errmess.push('Invalid email format');
        }

        if (!/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(phone)) {
            errmess.push('Invalid phone number format');
        }

        if (errmess.length > 0) {
            let message = '';
            $.each(errmess, function (msg) {
                message += msg + '\n';
            });
            $('#register-error').html(message).show();
        } else {
            // format the phone number by taking out any special characters that are accepted
            // example: (123)456-7890 will be 1234567890
            const fPhone = phone.replace(/[().-]/g, "");

            $.post('register', {
                username: username,
                email: email,
                phone: fPhone,
                password: password
            }, function (data) {
                if (data.message){
                    $('#register-error').html(data.message).show();
                }

                if (data.user){
                    localStorage.setItem('user',JSON.stringify(data.user));
                    setUser();
                    userNavToggle();

                    if (!$('#register-error').hidden) {
                        $('#register-error').hide();
                    }
                    $('#register-form')[0].reset();
                    $('#register-modal').hide();
                }
            });
        }
    });// end login form handler
});