const registrationForm = document.getElementById('registration-form');
const name = document.getElementById('full-name')
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const errorDiv = document.getElementById('error');

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        errorDiv.innerText = 'Passwords do not match.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(u => u.email === email);
    if (userExists) {
        errorDiv.innerText = 'User with this email already exists.';
        return;
    }

    const newUser = {
        email: email,
        password: password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    name.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    window.location.href = '../html/index2.html';
});