//searchBT id search button in index.html
//const axios = require('axios');
// input field met id inputCountry in index.html
// display country id countryDisplay in index.html

const inputCountry = document.getElementById("inputCountry");
 inputCountry.addEventListener('keypress', (e) => {
     if (e.key === "enter") {
         fetchCountryInf(inputCountry.value);
         inputCountry.value = "";
     }
 });
const searchbutton = document.getElementById("searchBT");
//console.log(searchbutton);
searchbutton.addEventListener("click", () => {
    FetchCountryInf(inputCountry.value);
        inputCountry.value = "";
});

//const countryDisplay = document.getElementById("countryDisplay");


async function FetchCountryInf(input) {

    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${input}?fullText=true`);
        const countryData = result.data[0]
        console.log(countryData);
        flagCountry(countryData);
        countryDisplay(countryData);
    } catch (e) {
        console.error(e);
        invalidCountry();
    }
}
function invalidCountry() {
    const errorDisplay = document.getElementById("errorDisplay")
    errorDisplay.textContent = "This country is not in our database yet, try again";
    const imageElement = document.getElementById("flagCountry");
    imageElement.src = "";
    imageElement.alt = "";
    const countryGEO = document.getElementById("countryGEO");
    countryGEO.textContent = "";
    const countryINF = document.getElementById("countryINF");
    countryINF.textContent = " ";
    const currenciesString = document.getElementById("currenciesString");
    currenciesString.textContent = " ";
    const langString = document.getElementById("langString");
    langString.textContent = " ";
}
//console.log(countryData)
//console.log("dit is de image url: ", flag);
//console.log(countryGEO);
//console.log(countryINF);
//console.log(currenciesString);
//console.log("dit is taal :", langString);
// log currenciesString en languagesString komt eruit als undefined? Waarom is dit?

function countryDisplay(countryData) {
    const errorDisplay = document.getElementById("errorDisplay");
    errorDisplay.textContent = "";
    const CountryDisplayname = document.getElementById("CountryDisplayname");
    CountryDisplayname.textContent = countryData.name;
    const countryGEO = document.getElementById("countryGEO");
    countryGEO.textContent = countryData.name + " is situated in "+ countryData.subregion + ".";
    const countryINF = document.getElementById("countryINF");
    countryINF.textContent = "The country has a population of " + countryData.population + " people.";
    const currenciesString = document.getElementById("currenciesString");
    currenciesString.textContent = "The capital is " + countryData.capital + "." + currenciesSR(countryData.currencies) ;
    const langString = document.getElementById("langString");
    langString.textContent = languagesMore(countryData.languages) ;
}

function currenciesSR(currencies) {
    if (currencies.length === 1) {
        cur = " You can pay with " + currencies[0].name + "'s.";
        return cur;
    } else {
        cur = " You can pay with " + currencies[0].name + "'s and " + currencies[1].name + "'s.";
        return cur;
    }
}

function languagesMore(languages) {
    if (languages.length === 1) {
        lang = "The language they speak: " + languages[0].name + ".";
        return lang;
    }
    else if (languages.length === 2) {
        lang = "The language(s) they speak: " + languages[0].name + " and " + languages[1].name + ".";
        return lang;
    } else {
        lang = "The language(s) they speak: " + languages[0].name + " , " + languages[1].name + " and " + languages[2].name + ".";
        return lang;
    }
}
function flagCountry(countryData) {
    const imageElement = document.getElementById("flagCountry");
    imageElement.src = countryData.flag;
    imageElement.alt = countryData.demonym + "flag.";
}

