const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.getElementById("filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeSwitch = document.querySelector(".theme-changer");
let themeIcon = document.querySelector(".icon");
let modeText = document.querySelector(".mode-text");
let searchIcon = document.querySelector(".search-container>i");

let allCountriesData;

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,tld,currencies,languages,borders,subregion,population,region,flags",
)
  .then((data) => data.json())
  .then((countries) => {
    renderCountries(countries);
    allCountriesData = countries;
  });

filterByRegion.addEventListener("change", (evt) => {
  // Note: we're creating new cards after cleaning the previous cards of the countryContainer cards.
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((data) => data.json())
    .then((countries) => {
      renderCountries(countries);
    });
});

function renderCountries(countries) {
  countryContainer.innerHTML = "";
  countries.forEach((country) => {
    let countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/RestCountriesAPI/countryFolder/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
              <img src="${country.flags.svg}" alt="${country.name.common}" />
              <div class="card-text">
                  <h3 class="card-title">${country.name.common}</h3>
                  <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                  <p><b>Region: </b>${country.region}</p>
                  <p><b>Capital: </b>${country.capital}</p>
              </div>
      `;
    try {
      countryContainer.append(countryCard);
    } catch (err) {}
  });
}

searchInput.addEventListener("input", (evt) => {
  let value = allCountriesData.filter((countries) =>
    countries.name.common
      .toLowerCase()
      .includes(evt.target.value.toLowerCase()),
  );
  renderCountries(value);
});

const enableDarkMode = () => {
  document.body.classList.add("dark");
  localStorage.setItem("darkMode", "active");
  modeText.innerHTML = "Light Mode";
  themeIcon.innerHTML = `<i class="fa-regular fa-sun"></i>`;
  searchIcon.classList.add("toggleIconColor");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark");
  localStorage.setItem("darkMode", null);
  modeText.innerHTML = "Dark Mode";
  themeIcon.innerHTML = `<i class="fa-regular fa-moon"></i>`;
  searchIcon.classList.remove("toggleIconColor");
};

let darkMode = localStorage.getItem("darkMode");

if (darkMode === "active") enableDarkMode();

themeSwitch.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  darkMode !== "active" ? enableDarkMode() : disableDarkMode();
});
