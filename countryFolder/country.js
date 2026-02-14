let country = new URLSearchParams(window.location.search).get("name");
let flagImage = document.querySelector(".country-details img");
let countryNameH1 = document.querySelector(
  ".details-text-container .commonName",
);
let nativeName = document.querySelector(".details-text .nativeName>span");
let population = document.querySelector(".population>span");
let region = document.querySelector(".region>span");
let subRegion = document.querySelector(".subRegion>span");
let capital = document.querySelector(".capital>span");
let tld = document.querySelector(".top-level-domain>span");
let currencies = document.querySelector(".currencies>span");
let languages = document.querySelector(".languages>span");
let borderCountries = document.querySelector(".border-countries>p>span");

fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((country) => country[0])
  .then((country) => {
    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;

    // if condition for getting native name
    if (country.name.official) {
      nativeName.innerText = country.name.official;
    } else {
      nativeName.innerText = country.name.common;
    }
    population.innerText = country.population;
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    capital.innerText = country.capital;
    tld.innerText = country.tld;
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    } else {
      languages.innerText = "Sorry Not Available";
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)[0].name;
    } else {
      currencies.innerText = "Not Available";
    }

    if (country.borders) {
      country.borders.forEach((val) => {
        let borderCountry = document.createElement("a");
        borderCountry.innerText = val;
        borderCountries.append(borderCountry);
      });
    }
  });
