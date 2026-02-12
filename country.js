let country = new URLSearchParams(window.location.search).get("name");
let countryImg = document.querySelector(".country-details img");
let countryName = document.querySelector(".details-text-container .commonName");
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
  .then((country) => {
    let borderCondition = country[0].borders ? country[0].borders : "Not";
    countryImg.src = country[0].flags.svg;
    countryName.innerText = country[0].name.common;
    nativeName.innerText = country[0].name.common;
    population.innerText = country[0].population;
    region.innerText = country[0].region;
    subRegion.innerText = country[0].subregion;
    capital.innerText = country[0].capital;
    tld.innerText = country[0].tld;
    currencies.innerText = Object.values(country[0]?.currencies)[0].symbol;
    languages.innerText = Object.values(country[0].languages);

    if (borderCondition) {
      borderCountries.innerText = borderCondition;
    } else {
      for (let i = 0; i < country[0].borders.length; i++) {
        let a = document.createElement("a");
        a.innerText = country[0].borders[i];
        borderCountries.append(a);
      }
    }
  });
