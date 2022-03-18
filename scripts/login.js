const loginForm = document.getElementById('login-form');
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
    // test
    fetch(/*'probably controller location'*/, {
        method:'post',
        body: searchParams
    }).then(function(response) {
        return response.text();
    }).then(function(text){
        console.log(text);
    }).catch(function(error){
        console.log(error);
    })
})
