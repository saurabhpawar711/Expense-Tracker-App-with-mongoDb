const backendApi = "http://localhost:4000";

const signUp = document.getElementById('form');
signUp.addEventListener('submit', signUpfunction);

async function signUpfunction(event) {

    event.preventDefault();
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = "";

    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userDetails = {
        name: username,
        email: email,
        password: password
    }
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";

    try {
        await axios.post(`${backendApi}/user/signup`, userDetails);
        alert('You have successfully created account');
        window.location.href = '../Login/login.html';
    }
    catch (err) {
        const errorMessage = err.response.data.error;
        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = `<h4>${errorMessage}</h4>`;
    }
}