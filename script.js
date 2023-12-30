const searchbtn = document.querySelector('.search-box button') ;
const inputfield = document.querySelector('.search-box input') ;
const weatherimage = document.getElementById('weather-image') ;
searchbtn.addEventListener('click' , handleClick) ;

var city_name ; 
function handleClick(event){
    if(inputfield.value == ""){
        alert("Please Enter a valid city name") ;
    }
    else{
        city_name = inputfield.value ;
        console.log(city_name) ;
        city_to_coordinates();
    }
}

async function city_to_coordinates(){
    let address = `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=c64c3600659b9d08e935e8fbc7ad022c` ;
    let response = await fetch(address) ;
    if(response.status == 200){
        obj = await response.json() ;
        document.getElementById("city-name").innerHTML = obj[0].name  ; 
        coordinates_to_temp(obj[0].lat , obj[0].lon) ;
        
    }
    else{
        alert("An unknown error has occured please write a mail to the owner") ;
    }

}
async function coordinates_to_temp(lat , lon){
    let address = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=22bcab8b850647471efd5377d19404c9&units=metric` ;
    let response = await fetch(address) ;
    if(response.status == 200){
        let obj = await response.json() ;
        console.log(obj);
        const temp = obj.main.temp ; 
        const humidity = obj.main.humidity ;
        const wind_speed = obj.wind.speed ; 
        document.getElementById('temp').innerHTML = temp  + "°C"; 
        document.getElementsByClassName('wind')[0].innerHTML = wind_speed ; 
        document.getElementsByClassName('humidity')[0].innerHTML = humidity ; 
        if(obj.clouds.all <= 10){
            weatherimage.setAttribute('src' , './images/clear.png')

        }
        else if(obj.clouds.all <= 60 && obj.clouds.all > 10){
            weatherimage.setAttribute('src' , './images/clouds.png')
        }
        else if(obj.clouds.all > 60 && obj.clouds.all <= 75){
            weatherimage.setAttribute('src' , './images/drizzle.png')
            
        }
        else{
            weatherimage.setAttribute('src' , './images/rain.png')

        }
        
    }
    else{
        alert("An unknown error has occured please write a mail to the owner") ;
    }
}   

