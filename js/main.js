const btnGenerate = document.getElementById("btn-generate");
btnGenerate.addEventListener("click", fetchRandomDog);

let dogFactPlaceholder = document.getElementById("dog-fact");
const weatherPlaceholder = document.getElementById("weather-data");

function fetchRandomDog() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://dog.ceo/api/breeds/image/random", requestOptions)
    .then((response) => response.json()) //parse as JSON data
    .then((result) => {
      const dogPlaceholder = document.getElementById("dog-img");
      dogPlaceholder.src = result.message;

      getRandomFact();

      getWeatherData();
    }) //map our json
    .catch((error) => console.error(error));
}

function getRandomFact() {
  fetch("https://dogapi.dog/api/v2/facts?limit=2")
    .then((response) => response.json())
    .then((data) => {
      dogFactPlaceholder.innerHTML = data.data[0].attributes.body;
      data.data.forEach((fact) => {
        //console.log(fact.attributes.body);
        //dogFactPlaceholder.innerHTML = fact.attributes.body;
      });
    });
}

function getWeatherData() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://api.weatherapi.com/v1/current.json?key=3278c408f5154f9fab7112324251111&q=London&aqi=no",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      weatherPlaceholder.src = result.current.condition.icon;
    })
    .catch((error) => console.error(error));
}
