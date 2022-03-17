
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

//runs the search and returns the values
async function movieSeach(query){
    // console.log(query);
    let search=await fetch(apiURL+'search/movie'+apiKey+'&query='+ query);
    // console.log(search)
    if(search.status==200){
        let searchResults=await search.json();
        // console.log(searchResults);
        let resultList=document.createElement('ol');
        document.getElementById("searchResults").appendChild(resultList)
        for(let movie of searchResults.results){
            let newMovie = new Movie(movie.title, movie.release_date)
            console.log(newMovie)
            let movieResult = document.createElement('li');
            movieResult.innerHTML= newMovie;
            resultList.appendChild(movieResult)
        }
    }

}


//movie class
class Movie{
    constructor(title, release_date){
        this.title=title;
        this.release_date=release_date;
    }
    toString(){
        return this.title+" : "+this.release_date;
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
