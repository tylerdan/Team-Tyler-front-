const title = document.getElementById("title")
const banner = document.getElementById("bannerImg");
const data = document.getElementById("data");
const table = document.getElementById("review_table");
const form_caption = document.getElementById("form_caption");
const movieID = window.location.search.split("input=")[1];
const year=document.getElementById("year");
const userID= localStorage.userId;
//a function to use the movie's data to fill out the page
async function populatePage(){
    //let query = window.location.search.split("input=");
    //console.log(apiURL+'movie/'+movieID+apiKey)
    let search=await fetch(apiURL+'movie/'+movieID+apiKey);
    let movie=await search.json();
        
        let releaseyear=" ("+movie.release_date.substring(0,4)+")"
        title.innerHTML=movie.title;
        year.innerHTML=releaseyear;
    
        let poster =document.createElement('img');
            poster.src = "https://image.tmdb.org/t/p/original/"+ movie.poster_path;
            poster.alt = movie.title + ' poster not found.'
            poster.id="poster";
                    

        banner.src="https://image.tmdb.org/t/p/original/"+movie.backdrop_path;
        
        var summary=document.createElement('p');
            summary.innerHTML=movie.overview;
            summary.id="summary";
        
        data.insertBefore(poster,document.getElementById("titleInfo")); 
        data.appendChild(summary);

        document.getElementById("form_caption").innerHTML="Submit your review of "+movie.title;
       // document.getElementById("form_id").value=movieID
        //document.getElementById("user_id").value=3;
     
        //document.getElementById("user_id").innerHTML= USER ID FROM BACK END;
        
    getReviews();
}



//populates the review table from the backend
async function getReviews(){
    
    
    let search=await fetch("https://teamtyler.azurewebsites.net/reviews?id="+movieID)
    
    if (search.status==200){
    let reviewData =await search.json();
    for(let review of reviewData){
        
        let reviewUser= review.userName;
        let reviewScore=review.rating;
        let reviewText=review.comment;
        let newReview = new Review(reviewUser,reviewScore,reviewText);
        
        let newRow=table.insertRow()
        table.appendChild(newRow)
        let tableUser=document.createElement('td')
            let userLink=document.createElement('A');
            userLink.setAttribute("href","userPage.html?name="+newReview.user);
            userLink.innerText=newReview.user;

            tableUser.appendChild(userLink);
            newRow.appendChild(tableUser)
       
        let tableScore=document.createElement('td')
            tableScore.innerHTML=newReview.score;
            newRow.appendChild(tableScore)    
        
        let tableText=document.createElement('td')
            tableText.innerHTML=newReview.text;
            newRow.appendChild(tableText)
        }
        
    }
        
    }


//classes for processing data

    class Review{
        constructor(user, score, text){
            this.user=user;
            this.score=score;
            this.text=text;
        }
        toString(){
            return this.user+" "+this.score+" "+this.text
    }
}


class IdObj{
    constructor(id){
    this.id=id
    }
}

class MovieObj{
        constructor(id){
    this.id=id
    }
}

class AuthorObj{
        constructor(id){
    this.id=id
    }
}

class FormProcessed{
    constructor(rating, comment, author, movie){
    this.rating=rating
    this.comment=comment
    this.author=author
    this.movie=movie
    }

}



//submission form for reviews
const form1=document.getElementById("reviewForm");
form1.addEventListener("submit",async (e)=>{
    e.preventDefault();
    
   
    let rating;
    const stars =document.getElementsByName("rating");
    for(i of stars){
        if(i.checked){rating=Number(i.value)}
        }
    let comment=document.getElementById("commentBox").value;
    let movie=new MovieObj(Number(movieID));
    let author =new AuthorObj(userID);
    



    let formDataSerialized = new FormProcessed(rating, comment, author, movie)

    try {
            const response =await fetch("https://teamtyler.azurewebsites.net/postReview",{
                    method: 'PUT',
                    body: JSON.stringify(formDataSerialized),
                    headers:{
                            'Content-Type':'application/json'
                        }
                
            })
            const json =await response.json();
            console.log(json);
        } catch (error) {
                console.error(error);
                alert('error')
            }
                   window.location.reload()
        }
 
        )
        
        
        
