const registerForm = document.getElementById('registerForm');
const registerButton = document.getElementById('register-button');
const registerError = document.getElementById('login-error-msg');

// when register-button is clicked...
registerButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for(const pair of formData){
        searchParams.append(pair[0], pair[1]); // encodes input in url usable format
    }
    console.log(searchParams);
    // test
    fetch(/*localhost:9000/login*/, {
        method:'POST',
        body: searchParams
    }).then(function(response) {
        return response.text();
    }).then(function(text){// put the response text from previous into console
        console.log(text);
    }).catch(function(error){// if an error is thrown, show it in console
        console.log(error);
    })
})