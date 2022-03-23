const registerForm = document.getElementById('registerForm');
const registerButton = document.getElementById('register-button');
const registerError = document.getElementById('login-error-msg');
const url = 'https://teamtyler.azurewebsites.net/signUp';

// when register-button is clicked...
registerButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(this);

    // posts data to backend signUp function in controller
    fetch(/*url*/, {
        method:'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }).then(function(response) {
        // log response (if any) to console
        console.log(response.json());
        // if correctly submitted, bring to user page
        if(response.status==200) {
            location.assign('/userPage');
        }
    }).catch(function(error){// if an error is thrown, show it in console
        console.log(error);
    })
})