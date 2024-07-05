const searchBtn = document.getElementById("search");
const input = document.getElementById("inputWeather");

function addExtendAnimation() {
  const container = document.querySelector(".weather-container");
  container.classList.add("extend");
}
function removeExtendAnimation() {
  const container = document.querySelector(".weather-container");
  container.classList.remove("extend");
}
function addShake() {
  const container = document.querySelector(".input-container");
  container.classList.add("errorShake");
  setTimeout(function () {
    container.classList.remove("errorShake");
  }, 500);
}
function addRender() {
  const render_div = document.querySelectorAll(".render-div");
  render_div.forEach((elem) => {
    elem.classList.add("render");
  });
  setTimeout(function () {
    render_div.forEach((elem) => {
      elem.classList.remove("render");
    });
  }, 1100);
}

async function getWeather() {
  const temperature = document.getElementById("temperature");
  const cityName = document.getElementById("cityName");
  const windSpeed = document.getElementById("windSpeed");
  const humidity = document.getElementById("humidity");
  const discription = document.getElementById("discription");
  let weatherImg = document.getElementById("weatherImg");
  const apiKey = "6878cd3100340f7ce9be193e607be769";
  let city = input.value.trim();
  input.value = city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  if (input.value == "") {
    addShake();
  } else {
    discription.style.color = "orange";
    discription.textContent = "Searching ...";
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log("Response", result);
      let temp = Math.round(result.main.temp - 273.15);
      switch (result.weather[0].main) {
        case "Clear":
          weatherImg.src = "images/clear.png";
          break;
        case "Rain":
          weatherImg.src = "images/rain.png";
          break;
        case "Snow":
          weatherImg.src = "images/snow.png";
          break;
        case "Clouds":
          weatherImg.src = "images/cloud.png";
          break;
        case "Mist":
          weatherImg.src = "images/mist.png";
          break;
          break;
        default:
          weatherImg.src = "images/clear.png";
          break;
      }
      discription.style.color = "white";
      cityName.style.color = "white";
      temperature.textContent = `${temp}`;
      cityName.textContent = result.name;
      humidity.textContent = `${result.main.humidity}%`;
      windSpeed.textContent = `${result.wind.speed} Km/h`;
      discription.textContent = `${result.weather[0].description}`;
      addExtendAnimation();
      addRender();
    } catch (error) {
      try {
        const errorResponse = await fetch(url);
        const errorResult = await errorResponse.json();
        if ((errorResult.message = "city not found")) {
          weatherImg.src = "images/404.png";
          temperature.textContent = `0`;
          humidity.textContent = `0%`;
          windSpeed.textContent = `0 Km/h`;
          discription.style.color = "white";
          discription.textContent = `Ummm...`;
          cityName.style.color = "red";
          cityName.textContent = "City Not Found !!";
          addExtendAnimation();
          addRender();
        }
      } catch {
        weatherImg.src = "images/404.png";
        temperature.textContent = `0`;
        humidity.textContent = `0%`;
        windSpeed.textContent = `0 Km/h`;
        discription.style.color = "white";
        discription.textContent = `Ummm...`;
        cityName.style.color = "red";
        cityName.textContent = "Server Error !!";
        addExtendAnimation();
        addRender();
      }
    }
  }
}

searchBtn.addEventListener("click", getWeather);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (input.value == "") {
      addShake();
    } else {
      getWeather();
    }
  }
});
