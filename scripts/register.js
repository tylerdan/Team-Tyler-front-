const url = "https://teamtyler.azurewebsites.net/signUp";

//document.addEventListener('submit', handleSubmit);

class userInfo{
    constructor(name, userName, passWord){
        this.name = name;
        this.userName = userName;
        this.passWord = passWord;
    }
}

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let user = document.getElementById('userName').value;
    let pass = document.getElementById('passWord').value;
    let name = {'firstName':firstName,
                'lastName':lastName
    };

    let formData = new userInfo(name, user, pass);
    let jsonString = JSON.stringify(formData);
    console.log(jsonString);
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
})

/*function handleSubmit(event) {
    event.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let user = document.getElementById('userName').value;
    let pass = document.getElementById('passWord').value;
    let name = {'firstName':firstName,
                'lastName':lastName
    };
    let input = {name,
              'userName':user,
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
        // redirects user back to userPage.html, sets cookie, changes user profile button
        //     to "[user] profile"
        if(response.ok) {
            console.log("Connected!!!");
            setCookie("username", user, 1);
            document.getElementById('profile-button').innerHTML = user + " profile";
            location.assign('../webpages/userPage.html');
        }
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
}*/

// sets cookie as if user logged in
function setCookie(cName, userName, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + userName + ";" + expires + ";path=/";
}
