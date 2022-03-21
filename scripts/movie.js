const title = document.getElementById("title")
const banner = document.getElementById("bannerImg");
const data = document.getElementById("data")
const table = document.getElementById("review_table")


//a function to use the movie's data to fill out the page
async function populatePage(){
    let query = window.location.search.split("input=");
    console.log(apiURL+'movie/'+query[1]+apiKey)
    let search=await fetch(apiURL+'movie/'+query[1]+apiKey);
    let movie=await search.json();
        
        var year=" ("+movie.release_date.substring(0,4)+")"
        title.innerHTML=movie.title+year;
    
        let poster =document.createElement('img');
            poster.src = "https://image.tmdb.org/t/p/w200/"+ movie.poster_path;
            poster.alt = movie.title + ' poster not found.';
                    

        banner.src="https://image.tmdb.org/t/p/w500/"+movie.backdrop_path
        
        var summary=document.createElement('p');
            summary.innerHTML=movie.overview;
        
        data.appendChild(summary)
        data.appendChild(poster) 
    getReviews();
}

function getReviews(){
    let newRow=table.insertRow()
    table.appendChild(newRow)
    mockReviews.forEach(element => {
        let entry=document.createElement('td')
        entry.innerHTML=element;
        newRow.appendChild(entry)

    });
}


//delete once the reviews are connected to the backend
let mockReviews=["paul",5,"amazing"]

