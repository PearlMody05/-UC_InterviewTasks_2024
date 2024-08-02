const apiKey="807e157d31eadb2e06dbf08d4583f117";

const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


var search_button=document.getElementById("search");
var weather_img=document.querySelector(".weather_image");

var convert_btn=document.querySelector(".temp_convertor");

var loc_button =document.getElementById("loc"); 

var fav_btn=document.querySelector(".fav");

var heart = document.querySelector("#heart");
var data;

var clear =document.getElementById("clear");

function display(data){
    console.log(data);
    document.querySelector(".place").innerHTML=data.name;
    document.querySelector(".value").innerHTML=data.main.temp;
    document.querySelector(".Humidity").innerHTML=data.main.humidity;
    document.querySelector("#windspeed").innerHTML=data.wind.speed;
    document.querySelector("#description").innerHTML=data.weather[0].description;
    document.querySelector("#units").innerHTML="°C";
    
    if(data.weather[0].main =="Clouds")
    {
     weather_img.src="icons/cloudy.png";
    }
    else if(data.weather[0].main =="Clear")
     {
      weather_img.src="icons/clear.png";
     }
     else if(data.weather[0].main =="Rain")
         {
          weather_img.src="icons/Rain.png";
         }
         else if(data.weather[0].main =="Drizzle")
             {
              weather_img.src="icons/drizzling.png";
             }
             else if(data.weather[0].main =="Mist"||data.weather[0].main =="Fog")
                 {
                  weather_img.src="icons/mist.jpg";
                 }
                 else if(data.weather[0].main =="Snow")
                     {
                      weather_img.src="icons/snow.png";
                     }
                     else if(data.weather[0].main =="Haze")
                         {
                          weather_img.src="icons/haze.png";
                         }
                     else 
                         {
                          weather_img.src="icon.png";
                         }
 }

async function checkWeather(place){
    const response = await fetch(apiUrl+place+`&appid=${apiKey}`);
     data=await response.json();
    display(data);
   
   
}



search_button.addEventListener("click",()=>{
    var place= document.getElementById("city").value;
    checkWeather(place)
    heart.style.color = "#FF7F50";
});

convert_btn.addEventListener("click",()=>{
    var unit = document.querySelector("#units").innerHTML.trim();
    var u = document.querySelector("#temp");
    var temp=parseFloat(u.textContent);
    var final_val;
    if(unit==="°C")
    {
        final_val=((9/5)*temp)+32;
        document.querySelector("#temp").innerHTML =final_val.toFixed(2);
        document.querySelector("#units").innerHTML="°F";
    }
    else if(unit==="°F"){
        final_val=(temp-32) * 5 / 9;
        document.querySelector("#temp").innerHTML =final_val.toFixed(2);
        document.querySelector("#units").innerHTML="°C";

    }
})


const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=";

async function Current_Weather() {
    let lat, lon;
    try {
        await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });

        const response = await fetch(`${apiURL}${lat}&lon=${lon}&appid=${apiKey}`);
        data = await response.json();
        console.log(data);
        display(data);
        document.getElementById("city").value="your location is displayed";
        heart.style.color = "#FF7F50";

    } catch (error) {
        console.error('Error getting weather data:', error);
    }
}

loc_button.addEventListener("click", Current_Weather);//for fetching latitudes and displaying

var fav_list = document.querySelector("#favorites_list");

function display_favData(event)
{
    var place = event.target.textContent;
    console.log(place);
    checkWeather(place);

}


function updateFav(loc){
    
    var listItem = document.createElement("li");
    listItem.textContent=loc;
    fav_list.appendChild(listItem);
    listItem.addEventListener("click", display_favData );
    
}

//fav button
fav_btn.addEventListener("click", function(){
    heart.style.color = "red";
    var location = document.querySelector(".place").innerHTML;
    alert("added to favourites!");
    localStorage.setItem(location,JSON.stringify(data));
    updateFav(location);

})

//clear all fav
clear.addEventListener("click",()=>{
    localStorage.clear();
    fav_list.innerHTML = "";
    
})

function load_favs(){
    for(var key of Object.keys(localStorage)){
        updateFav(key);
    }
}
document.addEventListener("DOMContentLoaded",load_favs);






  


