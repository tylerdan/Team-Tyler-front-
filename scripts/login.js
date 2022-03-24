const url = "https://teamtyler.azurewebsites.net/login";

//document.addEventListener('submit', handleSubmit);

class userInfo{
    constructor(userName, passWord){
        this.userName = userName;
        this.passWord = passWord;
    }
}

const userForm = document.getElementById('login');
userForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    let user = document.getElementById('userName').value;
    let pass = document.getElementById('passWord').value;

    let formData = new userInfo(user, pass);
    let jsonString = JSON.stringify(formData);
    console.log(jsonString);

    try {
        const response = await fetch(url, {
            method:'POST',
            body: jsonString,
            headers: new Headers({
              'Content-Type': 'application/json'
            })
        })
        console.log(response);
        if(response.ok){
            // cookie structure: username=[user], lasts for [1] day
            setCookie("username", user, 1);
            console.log(document.cookie);
            // changes profile button to say "[user] profile"
            document.getElementById('profile-button').innerHTML = user + " profile";
            // redirects to profile page
            location.assign('../webpages/userPage.html');
        }
    } catch (error) {
        document.getElementById('login-error-msg').innerHTML = "Incorrect username and/or password";
    }
})

/*function handleSubmit(event) {
    event.preventDefault();
    var user = document.getElementById('userName').value;
    var pass = document.getElementById('passWord').value;
    var input = {'userName':user,
              'passWord':pass
    };
    // turns user input into json format for backend
    console.log(input);
    const data = JSON.stringify(input);
    console.log(data);
    // should post data to backend
    fetch(url, {
    method:'POST',
        body: data,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => response.json())
    .then(function(response) {
        console.log(response);
        // checks if response got through
        if(response.ok) {
            // if there is an account in the database
            if(response != null) {
                // cookie structure: username=[user], lasts for [1] day
                setCookie("username", user, 1);
                // changes profile button to say "[user] profile"
                document.getElementById('profile-button').innerHTML = user + " profile";
                // redirects to profile page
                location.assign('../webpages/userPage.html');
            }
        }
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
}*/

// sets cookie
function setCookie(cName, userName, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    console.log(expires);
    document.cookie = cName + "=" + userName + ";" + expires + ";path=/";
    console.log(document.cookie);
}
