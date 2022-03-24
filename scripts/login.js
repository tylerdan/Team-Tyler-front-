const url = "https://teamtyler.azurewebsites.net/login";

document.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
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
    method:'PUT',
        body: data,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => response.json())
    .then(function(response) {
        console.log(response);
        // checks if response got through
        if(response.ok) {
            console.log("Connected!!!");
        }
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
}
/*document.addEventListener("submit", (e) => {
    e.preventDefault();
    // create formData from what's in the login form passed from login.html
    const data = new FormData(e.target);
    const value = data.get('userName');
    console.log(value);
    //console.log("Created FormData, " + [...data.keys()].length + " keys in data");
    //console.log(formData);
    //console.log(formData.json());
    //console.log(uName);
   // console.log(pass);
    //
    //console.log(formData);

    // should post login info to backend login function to check if database contains
    // this login info
    fetch(/*url, {
        method:'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }).then(function(response) {
        // logs response from backend (if any) into console
        console.log(response.text);
        // should redirect to userPage if account exists
        if (response.status == 200 && response.text=='true'){
            let userAccount = response.json()
            // sets cookie if login successful and redirects to userPage
            setCookie("username", user, 1)
            location.assign('/userPage');
        }
    }).catch(function(error){ // if an error is thrown, show it in console
        console.log(error);
    })
})*/

// sets cookie
function setCookie(cName, userName, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + userName + ";" + expires + ";path=/";
}
