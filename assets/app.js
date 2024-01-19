const form = document.getElementById('cityName');
let city;

const loader = document.querySelector("#loading");

window.addEventListener('load',function(){ 
    setTimeout(()=>{
        document.querySelector('body').classList.add('is-loaded')  
    }, 1000);
});



function displayLoading() {
    loader.classList.add("display");
    document.querySelector(".weather").style.display = "none";
    
}

// hiding loading 
function hideLoading() {
    setTimeout(() => {
        loader.classList.remove("display");
        document.querySelector(".weather").style.display = "block";

    }, 4000);
    // loader.classList.remove("display");
}

let cityData = {
    name: '',
    temperature: '',
    description: '',
    icon: '',
    humidity: '',
    wind: ''
};

function displayData(formData){       
    document.querySelector(".city").innerText = `Weather In ${formData.name}`;
    document.querySelector(".temp").innerText = `${formData.temperature}°C`;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + formData.icon + ".png";

    document.querySelector(".humidity").innerText = "Humidity: " + formData.humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + formData.wind + " km/h";
}

form.addEventListener('submit', (event) => {
    displayLoading()
    event.preventDefault();
    city = form.elements['city'].value;
    getCityData(city);    
});

async function getCityData(city) {
    // const response = await fetch();
    // return response.json();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f997017350ee48ad9a0c56d78396836b`)
        .then((response) => response.json())
        .then((data) => {
            hideLoading()
            // cityData = data[0];
            // console.log(data.wind.speed)
            cityData.name = data.name;
            cityData.temperature = data.main.temp;
            cityData.description = data.weather[0].description;
            cityData.icon = data.weather[0].icon;
            cityData.humidity = data.main.humidity;
            cityData.wind = data.wind.speed;

           
            setTimeout(() => {
                displayData(cityData);
            }, 4000);

        })
        .catch(
            (error) => {
                setTimeout(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'City not found',
                        text: 'Please enter an approproate city name'
                      })
                }, 4000);
               
            }
        );
}