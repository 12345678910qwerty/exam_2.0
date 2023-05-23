const loginForm = document.querySelector('.main--start');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorDiv = document.getElementById('error');

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    window.location.href = '../html/index3.html';
}

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = '../html/index3.html';
    } else {
        errorDiv.innerText = 'Invalid email or password.';
    }
});

const logoutButton = document.getElementById('login-button');
logoutButton.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '../html/index3.html';
});