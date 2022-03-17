

const themeStylesheet =document.getElementById("theme");
const themeToggle =document.getElementById('theme-toggle');

function darkModeToggle(){
    if(themeToggle.checked==true){
        themeStylesheet.href="..\\stylesheets\\styles-dark.css";
        
    } else{
        themeStylesheet.href ="..\\stylesheets\\styles-light.css";
       
    }
}
