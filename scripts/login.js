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
    //console.log(jsonString);

    try {
        const response = await fetch(url, {
            method:'POST',
            mode: 'cors',
            body: jsonString,
            headers: new Headers({
              'Content-Type': 'application/json'
            })
        })
        //console.log(response);
        if(response.status==200){
            if(response.ok){
                let jsonResult = await response.json();
                let resultId = jsonResult.id;
                // cookie structure: username=[user], lasts for [1] day
                setCookie("username", user, resultId, 1);
                // changes profile button to say "[user] profile"
                document.getElementById('profile-button').innerHTML = user + "'s profile";
                // redirects to profile page
                location.assign('../webpages/userPage.html');
                console.log(response);
            }
        } else if (response.status == 500) {
            document.getElementById('login-error-msg').innerHTML = "Incorrect username and/or password";
        }
    } catch (error) {
        document.getElementById('login-error-msg').innerHTML = "Incorrect username and/or password";
    }
})

// sets cookie
function setCookie(cName, userName, userId, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + userName + ","+ userId + ";" + expires + ";path=/";
}
