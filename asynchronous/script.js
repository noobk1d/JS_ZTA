const countriesContainer = document.querySelector(".countries");

//First AJAX call:XMLHttpRequest
const renderCountry = function (data, className = "") {
  const currency = Object.keys(data.currencies);
  const language = Object.keys(data.languages);
  const html = `<div class="country ${className}">
             <img class="country__img" src="${data.flags.png}" alt="flag" />
             <div class="country__data">
               <h3 class="country__name">${data.name.common}</h3>
               <h4 class="country__region">${(
                 +data.population / 1000000
               ).toFixed(1)} people</h4>
               <p class="country__row"><span>👫</span>${data.region}</p>
               <p class="country__row"><span>🗣️</span>${
                 data.languages[language[0]]
               }</p>
               <p class="country__row"><span>💰</span>${
                 data.currencies[currency].name
               }</p>
             </div>
           </div>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function (e) {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
  });
};

//Using XMLHttpRequest
const getCountryAndNeightbour = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function (e) {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    //Neighbour data
    const [neighbour] = data.borders;
    console.log(neighbour);
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function (e) {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      renderCountry(data, "neighbour");
    });
  });
};

// Using Promises

const getCountryDataPromise = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Country Not Found(${response.status})`);
      return response.json();
    })
    .then((response) => {
      console.log(response);
      renderCountry(response[0]);

      //Neighbour
      const [neighbour] = response[0].borders;
      // const neighbour = asasd;
      console.log(neighbour);
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(`No Neighbour Found`);
      return response.json();
    })
    .then((response) => {
      renderCountry(response[0], "neighbour");
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const getCountryCommonPromise = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);
      renderCountry(response[0]);

      //Neighbour
      const [neighbour] = response[0].borders;
      // const neighbour = asasd;
      console.log(neighbour);
      if (!neighbour) throw new Error(`Neighbour Not Found`);
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => {
      console.log(response);
      renderCountry(response[0], "neighbour");
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

getCountryCommonPromise("united kingdom");
