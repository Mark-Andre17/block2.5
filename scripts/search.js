// Методы, которые могут пригодиться:
// starWars.searchPlanets(query), 
// starWars.searchSpecies(query).
// starWars.getCharactersById(id), 
// starWars.getPlanetsById(id), 
// starWars.getSpeciesById(id)
const searchObject = {
    people: [starWars.searchCharacters, starWars.getCharactersById],
    planets: [starWars.searchPlanets, starWars.getPlanetsById],
    species: [starWars.searchSpecies, starWars.getSpeciesById],
    films: starWars.getFilmsById,
    homeworld: [starWars.searchPlanets, starWars.getPlanetsById],
    residents: [starWars.searchCharacters, starWars.getCharactersById],
    starships: starWars.getStarshipsById,
    vehicles: starWars.getVehiclesById,
}
// ОБЩИЕ ПЕРЕМЕННЫЕ
let resultContainer = document.querySelector('.result-container');
let exitBtn = document.querySelector('.delete');
let spinner = document.querySelector('.spinner');
let messageHeader = document.querySelector('.message-header > p');
let messageBody = document.querySelector('.message-body');

// ПЕРВАЯ ПОИСКОВАЯ СТРОКА
let search = document.querySelector('.first-search-input');
let btnSearch = document.querySelector('.first-search-button');
let selectBtn = document.querySelector('.first-select');
let choiceResult = selectBtn.value
let resultSearch = '';


selectBtn.addEventListener('change',  (e) => {
    choiceResult = e.target.value;
    resultSearch = '';
    search.value = '';
    resultContainer.style.visibility = 'hidden';
})
search.addEventListener('change',(e) => {
    resultSearch = e.target.value; 
})
exitBtn.addEventListener('click', () => {
    resultSearch = '';
    resultSearch2 = '';
    search.value = '';
    secondInput.value = '';
    resultContainer.style.visibility = 'hidden';
})
btnSearch.addEventListener('click', async () => {
    try {
        if (resultSearch === '') {
            alert('Пожалуйста, введите что-то в строке поиска');
            throw new Error('Input is empty');
        }
        spinner.style.visibility = 'visible';
        
        const starWarsInfo = await searchObject[choiceResult][0](resultSearch);
        
        
        for (const item of starWarsInfo.results) {
            messageHeader.innerHTML = `${item.name}`;
            messageBody.innerHTML = ``;
            
            for (let key in item) {
                if(item[key] === null){
                    messageBody.innerHTML += `<p>${key}: unknow </p>`; 
                } else if (key === 'films') {
                    messageBody.innerHTML += `<p>${key}: </p>`;
                    for (const film of item[key]) {
                        const url = film;
                        const regex = /(\d+)\/$/;
                        const result = url.match(regex);
                        const filmNumber = result[1];
                        const filmInfo = await searchObject[key](filmNumber);
                        messageBody.innerHTML += `<p style="margin-left: 20px;">${filmInfo.title}</p>`;
                    }
                } else if (key === 'homeworld') {
                    const url = item[key];
                    const regex = /(\d+)\/$/;
                    const result = url.match(regex);
                    const planetNumber = result[1];
                    const planetInfo = await searchObject[key][1](planetNumber); 
                    messageBody.innerHTML += `<p>${key}: ${planetInfo.name}</p>`;
                } else if(key === 'species'){
                    for (const species of item[key]) {
                        const url = species;
                        const regex = /(\d+)\/$/;
                        const result = url.match(regex);
                        const speciesNumber = result[1];
                        const speciesInfo = await searchObject[key][1](speciesNumber);
                        messageBody.innerHTML += `<p>${key}: ${speciesInfo.name}</p>`;
                    }
                } else if(key === 'residents' || key === 'people'){
                    messageBody.innerHTML += `<p>${key}: </p>`;
                    for (const resident of item[key]){
                        const url = resident;
                        const regex = /(\d+)\/$/;
                        const result = url.match(regex);
                        const residentNumber = result[1];
                        const residentInfo = await searchObject[key][1](residentNumber);
                        messageBody.innerHTML += `<p style="margin-left: 20px;">${residentInfo.name}</p>`;
                    }
                } else if(key === 'starships'){
                    messageBody.innerHTML += `<p>${key}: </p>`;
                    for (const starships of item[key]){
                        const url = starships;
                        const regex = /(\d+)\/$/;
                        const result = url.match(regex);
                        const starshipsNumber = result[1];
                        const starshipsInfo = await searchObject[key](starshipsNumber);
                        messageBody.innerHTML += `<p style="margin-left: 20px;">${starshipsInfo.name}</p>`;
                    }
                } 
                else if(key === 'vehicles'){
                    messageBody.innerHTML += `<p>${key}: </p>`;
                    for (const vehicle of item[key]){
                        const url = vehicle;
                        const regex = /(\d+)\/$/;
                        const result = url.match(regex);
                        const vehicleNumber = result[1];
                        const vehicleInfo = await searchObject[key](vehicleNumber);
                        messageBody.innerHTML += `<p style="margin-left: 20px;">${vehicleInfo.name}</p>`;
                    }
                } else {
                    messageBody.innerHTML += `<p>${key}: ${item[key]}</p>`;
                }
            }
        }
        spinner.style.visibility = 'hidden';
        resultContainer.style.visibility = 'visible';
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
// КОНЕЦ

// ВТОРАЯ ПОИСКОВАЯ СТРОКА
let secondChoiceBtn = document.querySelector('.second-select')
let secondInput = document.querySelector('.second-search-input')
let searchBtn2 = document.querySelector('.second-search-button')
let choiceResult2 = secondChoiceBtn.value

let resultSearch2 = '';
secondChoiceBtn.addEventListener('change',  (e) => {
    choiceResult2 = e.target.value;
    resultSearch2= '';
    secondInput.value = '';
    resultContainer.style.visibility = 'hidden';
})
secondInput.addEventListener('change',(e) => {
    resultSearch2 = e.target.value;   
})
searchBtn2.addEventListener('click', async () => {
    try {
        if (resultSearch2 === '') {
            alert('Пожалуйста, введите число в строке поиска');
            throw new Error('Input is empty');
        }
        spinner.style.visibility = 'visible';
        
        const starWarsInfo = await searchObject[choiceResult2][1](resultSearch2);

        messageHeader.innerHTML = `${starWarsInfo.name}`;
        messageBody.innerHTML = ``;
        for(let key in starWarsInfo){
            if(starWarsInfo[key] === null){
                messageBody.innerHTML += `<p>${key}: unknow </p>`; 
            }
            else if(key === 'films'){
                messageBody.innerHTML += `<p>${key}: </p>`;
                for (const film of starWarsInfo[key]) {
                    const url = film;
                    const regex = /(\d+)\/$/;
                    const result = url.match(regex);
                    const filmNumber = result[1];
                    const filmInfo = await searchObject[key](filmNumber);
                    messageBody.innerHTML += `<p style="margin-left: 20px;">${filmInfo.title}</p>`;
                }
            }
            else if(key === 'homeworld'){
                const url = starWarsInfo[key];
                const regex = /(\d+)\/$/;
                const result = url.match(regex);
                const planetNumber = result[1];
                const planetInfo = await searchObject[key][1](planetNumber); 
                messageBody.innerHTML += `<p>${key}: ${planetInfo.name}</p>`;
            }
            else if(key === 'species'){
                for (const species of starWarsInfo[key]) {
                    const url = species;
                    const regex = /(\d+)\/$/;
                    const result = url.match(regex);
                    const speciesNumber = result[1];
                    const speciesInfo = await searchObject[key][1](speciesNumber);
                    messageBody.innerHTML += `<p>${key}: ${speciesInfo.name}</p>`;
                }
            }
            else if(key ==='residents' || key === 'people'){
                messageBody.innerHTML += `<p>${key}: </p>`;
                for (const resident of starWarsInfo[key]){
                    const url = resident;
                    const regex = /(\d+)\/$/;
                    const result = url.match(regex);
                    const residentNumber = result[1];
                    const residentInfo = await searchObject[key][1](residentNumber);
                    messageBody.innerHTML += `<p style="margin-left: 20px;">${residentInfo.name}</p>`;
                }
            }
            else if(key ==='starships'){
                messageBody.innerHTML += `<p>${key}: </p>`;
                for (const starships of starWarsInfo[key]){
                    const url = starships;
                    const regex = /(\d+)\/$/;
                    const result = url.match(regex);
                    const starshipsNumber = result[1];
                    const starshipsInfo = await searchObject[key](starshipsNumber);
                    messageBody.innerHTML += `<p style="margin-left: 20px;">${starshipsInfo.name}</p>`;
                }
            }
            else if(key === 'vehicles'){
                messageBody.innerHTML += `<p>${key}: </p>`;
                for (const vehicle of starWarsInfo[key]){
                    const url = vehicle;
                    const regex = /(\d+)\/$/;
                    const result = url.match(regex);
                    const vehicleNumber = result[1];
                    const vehicleInfo = await searchObject[key](vehicleNumber);
                    messageBody.innerHTML += `<p style="margin-left: 20px;">${vehicleInfo.name}</p>`;
                }
            }
            else {
                messageBody.innerHTML += `<p>${key}: ${starWarsInfo[key]}</p>`
            }
        }
        
        spinner.style.visibility = 'hidden';
        resultContainer.style.visibility = 'visible';
    } catch (error) {
        console.error('Ошибка:', error);
    }
});




// КОНЕЦ




