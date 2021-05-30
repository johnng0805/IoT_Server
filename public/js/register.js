$(function() {
    $('#registerForm').on('click', '#registerBtn', function(event) {
        $('#registerForm').validate({
            rule: {
                email: {
                    email: true
                },
                password: {
                    alphanumeric: true
                },
                repassword: {
                    alphanumeric: true,
                    equalTo: '[name=password]'
                }
            },
            messages: {
                email: {
                    email: "Please enter email."
                },
                password: {
                    alphanumeric: "No special characters allowed."
                },
                repassword: {
                    alphanumeric: "No special characters allowed.",
                    equalTo: "Password not match"
                }
            },
            errorElement: "div"
        });

        const registerForm = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            repassword: $('#repassword').val(),
            gender: $('#gender').val()
        };
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/register',
            contentType: 'application/json',
            data: JSON.stringify(registerForm),
            encode: true
        }).done(function(res) {
            console.log(res);
            location.href = "http://localhost:3000/";
        })
    })
})