const title = document.getElementById("title")
const banner = document.getElementById("bannerImg");
const data = document.getElementById("data")
const table = document.getElementById("review_table")
const form_caption = document.getElementById("form_caption")
const movieID = window.location.search.split("input=")[1];

//a function to use the movie's data to fill out the page
async function populatePage(){
    //let query = window.location.search.split("input=");
    console.log(apiURL+'movie/'+movieID+apiKey)
    let search=await fetch(apiURL+'movie/'+movieID+apiKey);
    let movie=await search.json();
        
        var year=" ("+movie.release_date.substring(0,4)+")"
        title.innerHTML=movie.title+year;
    
        let poster =document.createElement('img');
            poster.src = "https://image.tmdb.org/t/p/w200/"+ movie.poster_path;
            poster.alt = movie.title + ' poster not found.';
                    

        banner.src="https://image.tmdb.org/t/p/w500/"+movie.backdrop_path;
        
        var summary=document.createElement('p');
            summary.innerHTML=movie.overview;
        
        data.appendChild(summary);
        data.appendChild(poster); 

        document.getElementById("form_caption").innerHTML="Submit your review of "+movie.title;
        document.getElementById("form_id").innerHTML=movie.id;
        //document.getElementById("user_id").innerHTML= USER ID FROM BACK END;
        
    getReviews();
}


//populates the review table from the backend
async function getReviews(){

    
    let search=await fetch("https://teamtyler.azurewebsites.net/reviews?id="+movieID)
    let reviewData =await search.json();
    console.log(reviewData)
   // console.log(reviewData[0].author.userName)
    for(i in reviewData){
        let review=reviewData[i].split(',');
        //console.log(review);
        let reviewUser= review[3].substring(8,review[3].length-1);
        let reviewScore=review[1].substring(8,9);
        let reviewText=review[2].substring(10,review[2].length-1);
        //console.log(reviewUser+' '+reviewScore+' '+reviewText)
        let newReview = new Review(reviewUser,reviewScore,reviewText);
        console.log(newReview)
        let newRow=table.insertRow()
        table.appendChild(newRow)
        let tableUser=document.createElement('td')
            tableUser.innerHTML=newReview.user;
            newRow.appendChild(tableUser)
        let tableScore=document.createElement('td')
            tableScore.innerHTML=newReview.score;
            newRow.appendChild(tableScore)    
        let tableText=document.createElement('td')
            tableText.innerHTML=newReview.text;
            newRow.appendChild(tableText)
    }
        

    
}
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

//delete once the reviews are connected to the backend
let mockReviews=["paul",5,"amazing"]

