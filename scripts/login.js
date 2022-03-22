const loginForm = document.getElementByName('loginForm');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error-msg');
const url = 'https://teamtyler.azurewebsites.net/login';

loginButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(this);

    // should post login info to backend login function to check if database contains
    // this login info
    fetch(/*url*/, {
        method:'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }).then(function(response) {
        // logs response from backend (if any) into console
        console.log(response.json());
        // should redirect to userPage if account exists
        if (response.status==200){
            let userAccount = response.json()
            location.assign('/userPage');
        }
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
})
