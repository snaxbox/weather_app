// DOM manipulation and event handling page//
//***************************************** */

// obtain references from index.html
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");


//change the DOM
const updateUI = (data) => {

    const cityDets = data.cityDets;
    // const {cityDets} = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.name}</h5>
        <div class="my-3">${cityDets.weather[0].description}</div>
        <div class="display-4 my-4">
            <span>${cityDets.main.temp}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update icon source
    const iconSrc = `http://openweathermap.org/img/wn/${cityDets.weather[0].icon}.png`;
    icon.setAttribute("src", iconSrc);

    //update the night/day images
    let timeSrc = null;
    if (cityDets.dt >= cityDets.sys.sunrise && cityDets.dt < cityDets.sys.sunset ){
        timeSrc = "img/day.svg";   
    }else{
        timeSrc = "img/night.svg";
    }
    time.setAttribute("src", timeSrc);
    
    // console.log(cityDets.sys.sunrise);
    // console.log(cityDets.sys.sunset);
    // console.log(cityDets.dt);

    //remove display:none for the card div
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
    console.log(data);
}

// use the returned object{cityDets} in the updateUI function 
const updateCity = async(city)=>{
    //calls the getCity function from forecast.js which requests data from the openmapAPI 
    const cityDets = await getCity(city)
    return{
        cityDets: cityDets
    }
}

cityForm.addEventListener("submit", e =>{
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})