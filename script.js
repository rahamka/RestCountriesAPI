const countryContainer = document.querySelector(".countries-container");
let countryCard;
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,tld,currencies,languages,borders,subregion,population,region,flags",
)
  .then((data) => data.json())
  .then((countries) => {
    countries.forEach((country) => {
      countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `/country.html?name=${country.name.common}&Population=${country.population}&Region=${country.region}&Capital=${country.capital}`;
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
  });

/*
countries info
// Native Name:
country.name.official

// Sub region:
country.subregion

// capital
country.capital

// top level domain
country.tld

// currencies
Object.entries(country.currencies)?[0]?.[0]

// language
country.language.cat

// border countries
country.borders

*/
