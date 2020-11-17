$(document).ready(() => {
    if (localStorage.getItem('token')) {
        $('.login-a').hide();
        $('.perfil-a').show();
        $('.logout-a').show();

    } else {
        $('.login-a').show();
        $('.perfil-a').hide();
        $('.logout-a').hide();
    }


    $('.form-login').submit(async(e) => {
        e.preventDefault();

        const formLogin = $('.form-login')[0];

        const dataLogin = {
            email: formLogin['email'].value,
            password: formLogin['password'].value
        }

        await login(dataLogin);

    });


    async function login(dataLogin = null) {

        if (dataLogin === null) {
            return;
        }

        const headers = new Headers();

        headers.append("Content-Type", "application/json");

        const request = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataLogin)
        }

        console.log(request);
        const response = await fetch("https://artesanias-hbs.herokuapp.com/auth/login", request);

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = "/home";
            $('.login-a').hide();
            $('.perfil-a').show();
            $('.logout-a').show();
        } else {
            console.log(data);
            const message = data.message.loginMessage[0];
            $('.error-login').show();
            $('.error-login').text(message);
            $('.datos-form input').addClass('error');

            setTimeout(() => {
                $('.error-login').hide();
                $('.datos-form input').removeClass('error');
            }, 6000)
        }
    }

    $('.logout-a a').click(async() => {
        console.log('logout');

        const request = {
            method: 'GET'
        }

        const response = await fetch("https://artesanias-hbs.herokuapp.com/logout", request);

        if (response.ok) {
            window.location.href = "/home";
            localStorage.removeItem('token');
        }
    })

    $('.toggle').click(() => {

        if ($('.header').hasClass('hg-auto')) {
            $('.header').removeClass('hg-auto');
        } else {
            $('.header').addClass('hg-auto');
        }

    })
})