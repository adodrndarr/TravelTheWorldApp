let countryService = {
    getCountryData: async function () { ////////////////////// 1
        let url = `https://restcountries.eu/rest/v2/name/${uiService.country}`;
        try {
            let countriesObj = await ((await fetch(url)).json());
            uiService.countries = countriesObj; // cache resObj
            uiService.showData(countriesObj); ////////////////////// 2
        }
        catch (err) {
            alert(`The country ${uiService.country} could not be found, please try again!`);
            uiService.table.style.display = `none`;
            uiService.country = "Germany";
            countryService.getCountryData();

            console.log(err);
            return;
        };
    },
    getLanguages: function (arrayWithLanguages) { ////////////////////// 4
        let languages = "";
        for (let language of arrayWithLanguages) {
            languages += language.name + " ";
        }
        return languages;
    },
    getCurrencies: function (arrayWithCurrencies) { ////////////////////// 5
        let currencies = "";
        for (let currency of arrayWithCurrencies) {
            currencies += currency.name + " ";
        }
        return currencies;
    },
}



let uiService = {
    country: "de",
    countries: null,

    btnName: document.getElementsByTagName("button")[0],
    btnPopulation: document.getElementsByTagName("button")[1],
    btnArea: document.getElementsByTagName("button")[2],
    btnSearch: document.getElementsByTagName("button")[3],

    inputCountry: document.getElementsByTagName("input")[0],
    
    table: document.getElementsByTagName("table")[0],
    tBody: document.querySelector("tbody"),

    registerListeners: function () {
        this.btnSearch.addEventListener("click", (event) => {
            event.preventDefault();
            this.country = this.inputCountry.value;
            countryService.getCountryData(); /////////////// 1

            this.inputCountry.value = ""; // clear input
        });
        this.btnArea.addEventListener("click", () => {
            this.sortArea(this.countries);
        });
        this.btnPopulation.addEventListener("click", () => {
            this.sortPopulation(this.countries);
        });
        this.btnName.addEventListener("click", () => {
            this.sortByName(this.countries);
        });
    },

    sortAreaClicked: false,
    sortPopulationClicked: false,
    sortByNameClicked: false,

    showData: function (countries) { /////////////////////// 3
        let countNumber = 1;
        this.tBody.innerHTML = ""; // reset content

        for(let country of countries){
            if(country.area == null) country.area = 0;
            
            this.tBody.innerHTML += `
                <tr>
                    <th scope="row">${countNumber++}</th>
                    <td><img src = "${country.flag}" width= "70px" height="30px"/></td>
                    <td>${country.name}</td>
                    <td>${country.population}</td>
                    <td>${country.capital}</td>
                    <td>${country.area}</td>
                    <td>${countryService.getLanguages(country.languages)}</td>
                    <td>${countryService.getCurrencies(country.currencies)}</td>
                </tr>`
        }
            this.table.style.display = `block`; ////////////////////// 6 (END)
    },
    sortArea: function (countriesArray) {
        for (let i = 0; i < countriesArray.length; i++) {
            countriesArray.sort((obj1, obj2) => {
                if (obj1.area < obj2.area) {
                    return 1;
                }
                else if (obj1.area === obj2.area) {
                    return 0;
                }
                else {
                    return -1;
                }
            });
        }
        
        if (this.sortAreaClicked) {
            countriesArray.reverse();

            this.showData(countriesArray);
            this.sortAreaClicked = false;
            return;
        }
        this.showData(countriesArray);
        this.sortAreaClicked = true;
    },
    sortPopulation: function (countriesArray) {
        for (let i = 0; i < countriesArray.length; i++) {
            countriesArray.sort((obj1, obj2) => {
                if (obj1.population < obj2.population) {
                    return 1;
                }
                else if (obj1.population === obj2.population) {
                    return 0;
                }
                else {
                    return -1;
                }
            });
        }
        if (this.sortPopulationClicked) {
            countriesArray.reverse();

            this.showData(countriesArray);
            this.sortPopulationClicked = false;
            return;
        }
        this.showData(countriesArray);
        this.sortPopulationClicked = true;
    },
    sortByName: function (countriesArray) {
        for (let i = 0; i < countriesArray.length; i++) {
            countriesArray.sort((obj1, obj2) => {
                if (obj1.name > obj2.name) {
                    return 1;
                }
                else if (obj1.name === obj2.name) {
                    return 0;
                }
                else {
                    return -1;
                }
            });
        }
        if (this.sortByNameClicked) {
            countriesArray.reverse();

            this.showData(countriesArray);
            this.sortByNameClicked = false;
            return;
        }
        this.showData(countriesArray);
        this.sortByNameClicked = true;
    }
}
uiService.registerListeners(); /////////////// 0 
countryService.getCountryData(); // load immediately default data at the start...