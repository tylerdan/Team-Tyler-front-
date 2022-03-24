const url = "https://teamtyler.azurewebsites.net/signUp";

document.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var user = document.getElementById('userName').value;
    var pass = document.getElementById('passWord').value;
    var name = {'firstName':firstName,
                'lastName':lastName
    };
    var input = {name,
              'userName':user,
              'passWord':pass
    };
    // turns user input into json format for backend
    console.log(input);
    const data = JSON.stringify(input);
    console.log(data);
    // should post data to backend
    fetch(url, {
    method:'PUT',
        body: data,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => response.json())
    .then(function(response) {
        console.log(response);
        // checks if response got through
        // redirects user back to userPage.html and sets login cookie
        if(response.ok) {
            console.log("Connected!!!");
            setCookie("username", user, 1);
            location.assign('../webpages/userPage.html');
        }
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
}

// sets cookie as if user logged in
function setCookie(cName, userName){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + userName + ";" + expires + ";path=/";
}
