// function login() {
//     const formLogin = document.querySelector('.form-login');

//     console.log(formLogin);
// }

document.querySelector('.form-login').addEventListener('submit', (e) => {
    e.preventDefault();

    const formLogin = document.querySelector('.form-login');

    console.log(formLogin['email']);
});