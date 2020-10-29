// DOM manipulation and event handling page//

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");


const updateUI = (data) => {

    const cityDets = data.cityDets;
    
    details.innerHTML = `
        <h5 class="my-3">${cityDets.name}</h5>
        <div class="my-3">${cityDets.weather[0].description}</div>
        <div class="display-4 my-4">
            <span>${cityDets.main.temp}</span>
            <span>&deg;C</span>
        </div>
    `;

    //remove display:none for the card div
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
    console.log(data);
}


const updateCity = async(city)=>{
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