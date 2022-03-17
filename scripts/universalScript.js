
const apiURL = 'https://api.themoviedb.org/3/';
const apiKey = '?api_key=a96991b0bf66d698b2c930defd8ed6db';
//search pattern is: apiURL+'search/movie'+apiURL+'&query='+ movie_title
//specific movie pattern is apiURL+movieID+apiKey
//documentation here: https://developers.themoviedb.org/3/getting-started/introduction


const themeStylesheet =document.getElementById("theme");
const themeToggle =document.getElementById('theme-toggle');

function darkModeToggle(){
    if(themeToggle.checked==true){
        themeStylesheet.href="..\\stylesheets\\styles-dark.css";
        
    } else{
        themeStylesheet.href ="..\\stylesheets\\styles-light.css";
       
    }
}
