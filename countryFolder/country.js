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

    if (country.population) population.innerText = country.population;
    if (country.region) region.innerText = country.region;
    if (country.tld) tld.innerText = country.tld;
    if (country.capital) capital.innerText = country.capital;
    if (country.subRegion) subRegion.innerText = country.subregion;
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)[0].name;
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        let borderCountry = document.createElement("a");
        borderCountry.innerText = border;
        borderCountries.append(borderCountry);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then(([countryData]) => {
            borderCountry.href = `country.html?name=${countryData.name.common}`;
          });
      });
    }
  });

// setting the dark mode

let modeText_2 = document.querySelector(".mode-text");
let modeIcon_2 = document.querySelector(".icon");
let themeSwitch_2 = document.querySelector(".theme-changer");

const addDarkMode = () => {
  document.body.classList.add("dark");
  localStorage.setItem("darkMode_2", "active");
  modeIcon_2.innerHTML = `<i class="fa-regular fa-sun"></i>`;
  modeText_2.innerHTML = "Light Mode";
};

const removeDarkMode = () => {
  document.body.classList.remove("dark");
  localStorage.setItem("darkMode_2", null);
  modeText_2.innerHTML = "Dark Mode";
  modeIcon_2.innerHTML = `<i class="fa-regular fa-moon"></i>`;
};

let isDark = localStorage.getItem("darkMode_2");

if (isDark === "active") addDarkMode();

themeSwitch_2.addEventListener("click", () => {
  isDark = localStorage.getItem("darkMode_2");
  isDark !== "active" ? addDarkMode() : removeDarkMode();
});
