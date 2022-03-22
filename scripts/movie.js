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
    let newRow=table.insertRow()
    table.appendChild(newRow)
    
    let search=await fetch("http://localhost:9000/reviews?id="+movieID)
    console.log(search)
        // let entry=document.createElement('td')
        // entry.innerHTML=element;
        // newRow.appendChild(entry)

    
}


//delete once the reviews are connected to the backend
let mockReviews=["paul",5,"amazing"]

