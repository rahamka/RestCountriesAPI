const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.getElementById("filter-by-region");

let countryCard;
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,tld,currencies,languages,borders,subregion,population,region,flags",
)
  .then((data) => data.json())
  .then((countries) => {
    renderCountries(countries);
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
    countryCard = document.createElement("a");
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
    } catch (err) {
      // console.log(err);
    }
  });
}
