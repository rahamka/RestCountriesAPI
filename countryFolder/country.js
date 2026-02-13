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
    let borderCondition = country.borders ? country.borders : "Not";
    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;
    console.log(country.name.official);

    // if condition for getting native name
    if (country.name.official) {
      nativeName.innerText = country.name.official;
    } else {
      nativeName.innerText = country.name.common;
    }
    // population.innerText = country.population;
    // region.innerText = country.region;
    // subRegion.innerText = country.subregion;
    // capital.innerText = country.capital;
    // tld.innerText = country.tld;
    // currencies.innerText = Object.values(country?.currencies).symbol;
    // languages.innerText = Object.values(country.languages);

    // if (borderCondition) {
    //   borderCountries.innerText = borderCondition;
    // } else {
    //   for (let i = 0; i < country.borders.length; i++) {
    //     let a = document.createElement("a");
    //     a.innerText = country.borders[i];
    //     borderCountries.append(a);
    //   }
    // }
  });
