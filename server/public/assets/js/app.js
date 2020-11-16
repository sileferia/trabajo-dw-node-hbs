document.querySelector('.form-login').addEventListener('submit', (e) => {
    e.preventDefault();

    const formLogin = document.querySelector('.form-login');

    const dataLogin = {
        email: formLogin['email'].value,
        password: formLogin['password'].value
    }

    console.log(dataLogin);

});


async function login(datalogin = null) {

    if (datalogin === null) {
        return;
    }

    const request = {
        method: 'POST',
        body: datalogin
    }

}