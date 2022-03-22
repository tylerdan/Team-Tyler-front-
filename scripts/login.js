const loginForm = document.getElementByName('loginForm');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error-msg');

loginButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(this);


    fetch(/*52.188.20.131:9000/login*/, {
        method:'POST',
        body: JSON.stringify(formData)

    }).then(function(response) {
        return response.text();
    }).then(function(text){ // put the response text from previous into console
        console.log(text);
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
})
