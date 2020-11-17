$(document).ready(() => {
    $('.box-padre').css('display', "none")
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
        $('.box-padre').css('display', "flex")
        $('.login-options .button').hide();
        login(dataLogin)
            .then((response) => {
                $('.box-padre').css('display', "none")
            })

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

        const response = await fetch("https://artesanias-hbs.herokuapp.com/auth/login", request);
        console.log(response);

        const data = await response.json();


        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = "/home";
            $('.login-a').hide();
            $('.perfil-a').show();
            $('.logout-a').show();
            $('.login-options .button').show();
        } else {
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

    $('.form-register').submit(async(e) => {
        e.preventDefault();

        const formRegistro = $('.form-register')[0];

        console.log(formRegistro);

        const dataRegistro = {
            rol: formRegistro['rol'].value,
            tipoId: formRegistro['tipoId'].value,
            nid: formRegistro['nid'].value,
            nombres: formRegistro['nombres'].value,
            apellidos: formRegistro['apellidos'].value,
            nacimiento: formRegistro['nacimiento'].value,
            telefono: formRegistro['telefono'].value,
            direccion: formRegistro['direccion'].value,
            email: formRegistro['email'].value,
            password: formRegistro['password'].value,
        }

        console.log(dataRegistro);

    })

    async function registro(dataRegistro = null) {
        if (dataRegistro === null) {
            return;
        }

        const headers = new Headers();

        headers.append("Content-Type", "application/json");

        const request = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataRegistro)
        }

        const response = await fetch("http://artesanias-hbs.herokuapp.com/auth/register", request);

        const data = await response.json();

        if (data.status === 1) {
            window.location.href = "/login";
        } else {
            const message = data.message;
            $('.error-register').show();
            $('.error-register').text(message);
            $('.datos-form input').css('border', '1px solid red');

            setTimeout(() => {
                $('.error-register').hide();
                $('.datos-form input').css('border', '1px solid #9fa327');
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