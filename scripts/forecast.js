// api interactions
//****************** */


// api key from openweathermapAPI
const key = '5682504a1d733404f8f40e8b349b4c5f';
   

// Get Weather infomation of the inputed city
const getCity = async (city) =>{

    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&units=metric&appid=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;


}

// getCity("manchester")
// .then(data => console.log(data))
// .catch(err => console.log(err));

