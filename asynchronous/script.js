const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");

//First AJAX call:XMLHttpRequest
const renderCountry = function (data, className = "") {
  console.log("render");
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
  countriesContainer.style.opacity = 1;
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

// getCountryCommonPromise("united kingdom");

// navigator.geolocation.getCurrentPosition((pos) => {
//   console.log(pos),
//     (err) => {
//       console.log(err);
//     };
// });

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then((pos) => {
//   console.log(pos);
// });

//Task 1

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude, longitude } = pos.coords;
      // console.log(latitude, longitude);
      return fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`);
    })
    .then((pos) => {
      if (!pos.ok) throw new Error("Problem with gecoding ${pos.status}");
      return pos.json();
    })
    .then((data) => {
      console.log(data);
      const { country } = data;
      console.log(country);

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error("Problem with gecoding ${res.status}");
      return res.json();
    })
    .then((data) => {
      console.log(data);
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener("click", whereAmI());

//Async Await
// const whereAmI2 = async function (country) {
//   const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };

const whereAmI2 = async function () {
  const pos = await getPosition();
  const { latitude, longitude } = pos.coords;

  const resGeo = await fetch(
    `https://geocode.xyz/${latitude},${longitude}?json=1`
  );
  const geoData = await resGeo.json();
  const { country } = geoData;
  // const country = "portugal";
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

// btn.addEventListener("click", whereAmI2());

