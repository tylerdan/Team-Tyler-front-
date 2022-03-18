const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error-msg');

loginButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(this);

    fetch(/*'probably controller location'*/, {
        method:'post',
        body: formData
    })then(function(response) {
        return response.text();
    })then(function(text){
        console.log(text);
    })catch(function(error){
        console.log(error);
    })
})
