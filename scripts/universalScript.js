const apiURL = 'https://api.themoviedb.org/3/';
const apiKey = '?api_key=a96991b0bf66d698b2c930defd8ed6db';
//search pattern is: apiURL+'search/movie'+apiKey+'&query='+ movie_title
//specific movie pattern is apiURL+movieID+apiKey
//documentation here: https://developers.themoviedb.org/3/getting-started/introduction

const movieSearchInput=document.getElementById('movieSearchInput');
const movieSearchSubmit=document.getElementById('movieSearchSubmit');

//gets the value from the url and runs a search
function getQueryValue(){
    let query = window.location.search.split("input=");
    //console.log((query[1].substring(query[1].length-1)));
   if(Number((query[1].substring(query[1].length-1))>1)){
    document.getElementsByClassName("back")[0].disabled=false;
    document.getElementsByClassName("back")[1].disabled=false;
   }
    movieSeach(query[1]);
}

function selectMovie(event){
    movieId=event.target.id;
    window.location.href='movie.html?input='+ movieId;

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
      //  resultList.addEventListener("click",sayhi);

        for(let movie of searchResults.results){
            if(movie.adult==false){
                let newMovie = new Movie(movie.title, movie.release_date, movie.poster_path, movie.overview, movie.id);
               // console.log(newMovie)
                let movieResult = document.createElement('li');
                resultList.appendChild(movieResult);
                    movieId=newMovie.id;
                   
                    let movieData=document.createElement('div');
                        movieData.innerHTML=newMovie;
                        movieData.id=movieId;
                        movieData.appendChild(document.createElement('br'))
                   
                    let poster =document.createElement('img');
                        poster.src = "https://image.tmdb.org/t/p/w200/"+ newMovie.poster_path;
                        poster.alt = newMovie.title + ' poster not found.';
                        poster.id=movieId;
                    movieData.appendChild(poster);
                    
                    //remove if we decide not to use summary in searches
                    // let summary=document.createElement('p');
                    //     summary.id=movieId;
                    //     summary.appendChild(document.createTextNode(newMovie.overview));
                    // movieData.appendChild(summary);
                    
              //  movieResult.innerHTML= newMovie.title;
                movieResult.appendChild(movieData)
                movieResult.onclick=selectMovie;
                
            }
            document.getElementById("searchResults").appendChild(resultList);
        
        }
    }

}

//function to display more results
function getNextResults(){
    let query = window.location.search.split("input=");
    //let pageNum =query.substring(0,1);
    let pageIndex = Number(query[1].substring(query[1].length-1));
    if (Number.isNaN(pageIndex)||pageIndex==1){
        console.log(2);
        query=query[1]+'&page=2'
    } else{
        pageIndex++;
     query=query[1].substring(0,query[1].length-1)+pageIndex;
     
    }
        window.location.href='searchResults.html'+'?input='+query;
}

//function to display prior results
function getPreviousResults(){
    let query = window.location.search.split("input=");
    //let pageNum =query.substring(0,1);
    let pageIndex = Number(query[1].substring(query[1].length-1));
    if (Number.isNaN(pageIndex)||pageIndex==1){
       // document.getElementById("back").disabled=true;
    } else{
       // document.getElementById("back").disabled=false;
        
        pageIndex--;
     query=query[1].substring(0,query[1].length-1)+pageIndex;
     window.location.href='searchResults.html'+'?input='+query;
    }
        
}

//movie class
class Movie{
    constructor(title, release_date, poster_path, overview, id){
        this.title=title;
        if (release_date==undefined){
            this.release_date=''
            } else{
            this.release_date=release_date;
            }
        this.poster_path=poster_path;
        this.overview=overview;
        this.id=id;
        }
    
    toString(){
        return this.title+" : "+this.release_date.substring(0,4);
    }
}


//following is the toggle for dark mode
const themeStylesheet =document.getElementById("theme");
const themeToggle =document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');
if(storedTheme){
    if(themeStylesheet.href.includes('dark')){
        themeToggle.checked=true;
    }else{
        themeToggle.checked=false;
    }
    themeStylesheet.href = storedTheme;
}

function darkModeToggle(){
    if(themeToggle.checked==true){
        themeStylesheet.href="..\\stylesheets\\styles-dark.css";
        
    } else{
        themeStylesheet.href ="..\\stylesheets\\styles-light.css";
       
    }
    localStorage.setItem('theme',themeStylesheet.href)
}

// gets cookie from stored cookies by passed in cookie name
function getCookie(cname) {
    let name = cname + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let ca = decodeCookie.split(';')
    for (let i = 0; i < ca.length; i++){
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// checks if cookie is set.
function checkCookie() {
    let user = getCookie("username");
    var profile = document.getElementById("profile-button");
    // lets user go to profile page if cookie is set or login page if not
    if (user != "") {
        const username = document.cookie.split("=");
        //console.log(username);
        profile.innerHTML = username[1] + "'s profile";
        profile.onclick = function() {
            location.assign('../webpages/userPage.html');
        }
    } else {
        profile.onclick = function() {
            location.assign('../webpages/login.html');
        }
    }
}

function deleteCookie() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(document.cookie);
    location.assign('../webpages/index.html');
}
