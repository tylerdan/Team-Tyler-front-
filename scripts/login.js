const loginForm = document.getElementByName('loginForm');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error-msg');

loginButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for(const pair of formData){
        searchParams.append(pair[0], pair[1]);
    }
    console.log(searchParams);

    fetch(/*localhost:9000/login*/, {
        method:'POST',
        body: searchParams
    }).then(function(response) {
        return response.text();
    }).then(function(text){ // put the response text from previous into console
        console.log(text);
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
})
