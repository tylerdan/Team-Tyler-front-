username = (key)=>{
    let address =window.location.search
    let parameterList = new URLSearchParams(address);
    return parameterList.get(key)
}
username=username("name");

document.getElementById("username").innerHTML=username;