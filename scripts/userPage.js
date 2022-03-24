const revTable=document.getElementById("review_table");
username = (key)=>{
    let address =window.location.search
    let parameterList = new URLSearchParams(address);
    return parameterList.get(key)
}
username=username("name");

document.getElementById("username").innerHTML=username;

document.addEventListener('onload',getReveiws())

async function getReveiws(){
    let search = await fetch("https://teamtyler.azurewebsites.net/userReviews?userName="+username)
    if (search.status==200){
        let response=await search.json()
        for(review of response){
            let id =review.movieId
            let rating =review.rating;
            let comment=review.comment;
            let title =await getMovieTitle(id);
            console.log(id+" "+rating+comment)
            
            
            let newRow=revTable.insertRow();
            revTable.appendChild(newRow)
            
            let tableMovie=document.createElement('td')
            let userLink=document.createElement('A');
            userLink.setAttribute("href","movie.html?input="+id);
            userLink.innerText=title;

            tableMovie.appendChild(userLink);
            newRow.appendChild(tableMovie)
       
        let tableScore=document.createElement('td')
            tableScore.innerHTML=rating;
            newRow.appendChild(tableScore)    
        
        let tableText=document.createElement('td')
            tableText.innerHTML=comment;
            newRow.appendChild(tableText)
        }
        
    }

}

async function getMovieTitle(id){
    
    let search =await fetch(apiURL+'movie/'+id+apiKey);
    let movie=await search.json();
    return movie.title;
}