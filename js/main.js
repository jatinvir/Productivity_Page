// DOM ELEMENTS:
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const names = document.getElementById("names");
const focus = document.getElementById("focus");

// Show Time
function shwoTime() {
    let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();

    // Set AM or PM
   let amPm = 0; 
   if (hour >= 12){
       amPm = "PM"
   } else {
       amPm = "AM"
   }

    // 12hr Format
    if (hour % 12) {
        hour = hour%12;
    } else{
        hour = 12;
    }


    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;
    setTimeout(shwoTime, 1000);
    
}

// Add Zeros
function addZero(n) {
  if (parseInt(n, 10) < 10) {
        return "0" + n;
    } else {
        return ("" + n);
    }
}

// Set Background anf greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if(hour <= 12) {
        // Morning
        document.body.style.backgroundImage= "url('/imgs/morning.jpg')";
        greeting.innerHTML = "Good Morning";
    } else if (hour < 18) {
        //Afternoon
        document.body.style.backgroundImage= "url('/imgs/afternoon.jpg')";
        greeting.innerHTML = "Good Afternoon";


    } else {
        // Evening
        document.body.color = "snow";
        document.body.style.backgroundImage= "url('/imgs/evening.jpg')";
        greeting.innerHTML = "Good Evening";


        
    }

}

// Get Name
function getName() {
    if(localStorage.getItem("names") === null) {
        names.textContent = "[Enter Name]";
    } else {
        names.textContent = localStorage.getItem("names");
    }
}

// Set Name
function setName(e) {
    if (e.type == "keypress"){
        // Enter Key
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem("names", e.target.innerText);
            // No new line
            names.blur();  
        }
    } else {
        localStorage.setItem("names", e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if(localStorage.getItem("focus") === null) {
        focus.textContent = "[Enter Focus]";
    } else {
        focus.textContent = localStorage.getItem("focus");
    }
}

// Set Name
function setFocus(e) {
    if (e.type == "keypress"){
        // Make sure enter is pressed
        if(e.which == 13 || e.keyCdoe == 13) {
            localStorage.setItem("focus", e.target.innerText);
            focus.blur();  
        }
    } else {
        localStorage.setItem("focus", e.target.innerText);
    }
}

// Weather
const p = document.querySelector("#weather-data p");

// Object to hold data
let openWeather = {}

// Request data from server
let xhr = new XMLHttpRequest()

// Get data from url
xhr.open("GET", `http://api.openweathermap.org/data/2.5/weather?q=Hamilton,ca&appid=968f162b48ab5e9cb32c54113ea5d59e&units=metric`)

// text is type of data in response
xhr.responseType = "text"

//Do when loaded
xhr.addEventListener("load", function(){
    // 200 for success
    if (xhr.status === 200){
        console.log("Works xhr.status")
        // JSON.parse to have it look like a class
        openWeather = JSON.parse(xhr.responseText)
        populateWeatherInfo(openWeather, p)
    } else {
        p.innerHTML = "Error: " + xhr.status
    }
}, false)

// request to server
xhr.send();

// update page contents
function populateWeatherInfo(openWeather, p){
    // name is in API info
    const location = openWeather.name
    // round as it's a decimal in API
    const temp = Math.round(openWeather.main.temp)

    const str = `${location} ${temp}°`
    p.innerHTML = str;
}


names.addEventListener("keypress", setName);
names.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

// Run Functions
shwoTime();
setBgGreet();
getName();
getFocus();
