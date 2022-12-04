const contriesContainer = document.querySelector(".countries");
const mainContainer = document.querySelector("main");
const backButton = document.querySelector(".back");
const findButton = document.querySelector(".find_button");
const findInput = document.querySelector("#finder");
const regionSelect = document.querySelector("#region");
const bordersCountryDiv = document.querySelector(".country-full__borders");
const darkModeButton = document.querySelector(".dark_mode");

// FETCH DATA FROM API

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    renderCountrys(data);

    const countrySelector = document.querySelectorAll(".country");
    countrySelector.forEach((country) => {
      country.addEventListener("click", function () {
        contriesContainer.style.display = "none";

        const clickedCountry =
          country.querySelector(".country__head").textContent;
        return fetch(`https://restcountries.com/v3.1/name/${clickedCountry}`)
          .then((result) => result.json())
          .then((data) => {
            const neighbour = data[0].borders;
            renderCountry(data[0]);
            if (neighbour == null) {
              return renderNoBordersInfo();
            } else {
              return fetch(
                `https://restcountries.com/v2/alpha?codes=${neighbour}`
              )
                .then((response) => {
                  return response.json();
                })
                .then((data) => renderBordersCountrys(data));
            }
          });
      });
    });
  });

function renderCountrys(data) {
  for (let index = 0; index < data.length; index++) {
    const someHtml = `<div class="country">
<img class="flag" src="${data[index].flags["png"]}" alt="">
<h1 class="country__head">${data[index].name["common"]}</h1>
<p class="country__people"><span class="bold">Poulation:&nbsp</span><span> ${data[
      index
    ].population.toLocaleString("en-US")}</span></p>
<p class="country__region"><span class="bold">Region:&nbsp</span><span class="region">${
      data[index].region
    }</span></p>
<p class="country__capital"><span class="bold">Capital:&nbsp</span><span>${
      data[index].capital
    }</span></p>
</div>`;
    contriesContainer.insertAdjacentHTML("beforeend", someHtml);
  }
}

function renderBordersCountrys(data) {
  const bordersCountryDiv = document.querySelector(".country-full__borders");
  let borderCountry;
  for (let index = 0; index < data.length; index++) {
    borderCountry = `<span class="border_country">${data[index].name}</span>
`;
    bordersCountryDiv.insertAdjacentHTML("beforeend", borderCountry);
  }
}

function renderNoBordersInfo() {
  const bordersCountryDiv = document.querySelector(".country-full__borders");
  const noBorderInfo = "No neighbours";
  bordersCountryDiv.insertAdjacentHTML("beforeend", noBorderInfo);
}

function renderCountry(data) {
  const fullCountry = `<div class="country-full">
  <img class="flag" src="${data.flags["png"]}" alt="">
  <div class="right-wrapper">
  <h1 class="country-full__head">${data.name["common"]}</h1>
  <div class="flex_wrapper">
  <div>
  <p class="country-full__name"><span class="bold>Native name:</span><span> ${
    data.name["official"]
  }</span></p>
  <p class="country-full__people"><span class="bold">Poulation:&nbsp</span><span> ${data.population.toLocaleString(
    "en-US"
  )}</span></p>
  <p class="country-full__region"><span class="bold">Region:&nbsp</span><span> ${
    data.region
  }</span></p>
  <p class="country-full__subRegion"><span class="bold">Sub Region:&nbsp</span><span> ${
    data.subregion
  }</span></p>
  <p class="country-full__capital"><span class="bold">Capital:&nbsp</span><span> ${
    data.capital
  }</span></p>
  </div>
  <div>
  <p class="country-full__domain"><span class="bold">Domain:&nbsp</span>&nbsp<span> ${
    data.tld
  }</span></p>
  <p class="country-full__currencies"><span class="bold">Currencies:&nbsp</span><span>${
    data.currencies ? Object.keys(data.currencies).toString() : " "
  }</span></p>
  <p class="country-full__languages"><span class="bold">Languages:</span><span>${
    data.languages ? Object.values(data.languages).toString() : " "
  }</span></p>
    </div>
  </div>
  <div class="borders_country">
    <p class="country-full__borders"><span class="bold">Border countres:&nbsp</span>
    </p>
     </div>
  </div>
  </div>`;

  backButton.style.display = "block";
  findButton.style.display = "none";
  findInput.style.display = "none";
  regionSelect.style.display = "none";

  mainContainer.insertAdjacentHTML("beforeend", fullCountry);
}

// BACK BUTTON

const back = document.querySelector(".back");
back.addEventListener("click", function () {
  location.reload();
});

// SELECT COUNTRY

const filter = document.querySelector("#region");

filter.onchange = () => {
  const option = filter.value;
  const filterByRegion = document.querySelectorAll(".region");

  filterByRegion.forEach((region) => {
    if (region.textContent == option || option == "All") {
      region.parentElement.parentElement.style.display = "block";
    } else {
      region.parentElement.parentElement.style.display = "none";
    }
  });
};

//FINDER INPUT

findButton.addEventListener("click", function () {
  searchValue = findInput.value;
  const filterByRegion = document.querySelectorAll(".country__head");

  filterByRegion.forEach((region) => {
    if (region.textContent == searchValue) {
      region.parentElement.style.display = "block";
    } else {
      region.parentElement.style.display = "none";
    }
  });
});

////////////////// DARK MODE

const body = document.querySelector("body");
const dark_modeText = document.querySelector(".dark_mode-text");

window.onload = function manageDarkMode() {
  if (localStorage.getItem("darkMode") == "false") {
    dark_modeText.textContent = "Dark mode";
    body.style.backgroundColor = "hsl(0, 0%, 100%)";
    body.style.color = "black";
    findInput.style.backgroundColor = "hsl(0, 0%, 100%)";
    findInput.style.color = "black";
    regionSelect.style.color = "black";
    regionSelect.style.backgroundColor = "hsl(0, 0%, 100%)";
    backButton.style.backgroundColor = "hsl(0, 0%, 100%)";
    backButton.style.color = "black";
  } else if (localStorage.getItem("darkMode") == "true") {
    dark_modeText.textContent = "Light mode";
    body.style.backgroundColor = "hsl(207, 26%, 17%)";
    body.style.color = "hsl(0, 0%, 100%)";
    findInput.style.backgroundColor = "hsl(209, 23%, 22%)";
    findInput.style.color = "hsl(0, 0%, 100%)";
    regionSelect.style.color = "hsl(0, 0%, 100%)";
    regionSelect.style.backgroundColor = "hsl(209, 23%, 22%)";
    backButton.style.backgroundColor = "hsl(209, 23%, 22%)";
    backButton.style.color = "hsl(0, 0%, 100%)";
  }
};

darkModeButton.addEventListener("click", function () {
  
  if (localStorage.getItem("darkMode") == "false" || localStorage.getItem("darkMode") == null) {
    localStorage.setItem("darkMode", "true");
  } else {
    localStorage.setItem("darkMode", "false");
  }

  if (localStorage.getItem("darkMode") == "true") {
    dark_modeText.textContent = "Light mode";

    body.style.backgroundColor = "hsl(207, 26%, 17%)";
    body.style.color = "hsl(0, 0%, 100%)";
    findInput.style.backgroundColor = "hsl(209, 23%, 22%)";
    findInput.style.color = "hsl(0, 0%, 100%)";
    regionSelect.style.color = "hsl(0, 0%, 100%)";
    regionSelect.style.backgroundColor = "hsl(209, 23%, 22%)";
    backButton.style.backgroundColor = "hsl(209, 23%, 22%)";
    backButton.style.color = "hsl(0, 0%, 100%)";
  } else if (localStorage.getItem("darkMode") == "false") {
    localStorage.setItem("darkMode", "false");

    dark_modeText.textContent = "Dark mode";
    body.style.backgroundColor = "hsl(0, 0%, 100%)";
    body.style.color = "black";
    findInput.style.backgroundColor = "hsl(0, 0%, 100%)";
    findInput.style.color = "black";
    regionSelect.style.color = "black";
    regionSelect.style.backgroundColor = "hsl(0, 0%, 100%)";
    backButton.style.backgroundColor = "hsl(0, 0%, 100%)";
    backButton.style.color = "black";
  }
});
