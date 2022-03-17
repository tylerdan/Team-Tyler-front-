const apiURL = 'https://api.themoviedb.org/3/';
const apiKey = '?api_key=a96991b0bf66d698b2c930defd8ed6db';
//search pattern is: apiURL+'search/movie'+apiKey+'&query='+ movie_title
//specific movie pattern is apiURL+movieID+apiKey
//documentation here: https://developers.themoviedb.org/3/getting-started/introduction

const movieSearchInput=document.getElementById('movieSearchInput');
const movieSearchSubmit=document.getElementById('movieSearchSubmit');

//gets the value from the url and runs a search
function getQueryValue(){
    let query = window.location.search.split("=");
     //console.log(query[1]);
    movieSeach(query[1]);
}

//runs the search and create a list of the values
async function movieSeach(query){
    // console.log(query);
    let search=await fetch(apiURL+'search/movie'+apiKey+'&query='+ query);
    // console.log(search)
    if(search.status==200){
        let searchResults=await search.json();
        // console.log(searchResults);
        let resultList=document.createElement('ol');
        document.getElementById("searchResults").appendChild(resultList);
        for(let movie of searchResults.results){
            if(movie.adult==false){
                let newMovie = new Movie(movie.title, movie.release_date, movie.poster_path, movie.overview);
               // console.log(newMovie)
                let movieResult = document.createElement('li');
                movieResult.innerHTML= newMovie;
                resultList.appendChild(movieResult);

                let poster =document.createElement('img');
                poster.src = "https://image.tmdb.org/t/p/w200/"+ newMovie.poster_path;
                poster.alt = newMovie.title + ' poster not found.';
                resultList.appendChild(poster);

                
                let summary=document.createElement('p');
                summary.appendChild(document.createTextNode(newMovie.overview));
                resultList.appendChild(summary);


                
            }
        }
    }

}


//movie class
class Movie{
    constructor(title, release_date, poster_path, overview){
        this.title=title;
        this.release_date=release_date;
        this.poster_path=poster_path;
        this.overview=overview;
        }
    
    toString(){
        return this.title+" : "+this.release_date.substring(0,4);
    }
}


//following is the toggle for dark mode
const themeStylesheet =document.getElementById("theme");
const themeToggle =document.getElementById('theme-toggle');

function darkModeToggle(){
    if(themeToggle.checked==true){
        themeStylesheet.href="..\\stylesheets\\styles-dark.css";
        
    } else{
        themeStylesheet.href ="..\\stylesheets\\styles-light.css";
       
    }
}
