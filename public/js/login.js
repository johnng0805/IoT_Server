$(function() {
    $('#loginForm').submit(function(event) {
        $('#loginForm').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    alphanumeric: true
                }
            },
            messages: {
                username: {
                    required: ("Please input email."),
                    alphanumeric: ("No special characters.")
                },
                password: {
                    required: "Please input password.",
                    alphanumeric: "No special characters."
                }
            },
            submitHandler: function(form) {
                form.submit()
            },
            errorElement: "div",
        });

        event.preventDefault();

        const loginForm = {
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/login',
            contentType: 'application/json',
            data: JSON.stringify(loginForm),
            encode: true,
        }).done(function(res) {
            console.log(res);
            location.reload();
        })
    })
})