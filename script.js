const endpoint = 'https://raw.githubusercontent.com/mjofficials/Indian-cities-by-population-JSON/master/data.json';
const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //here we need to figure out city or state matches what was was searches
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityRank = place.rank.replace(regex, `<span class="hl">${this.value}</span>`);
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

        return `
        <li>
            <span class="name">${cityRank}${`)`} ${cityName} ${`city`}, ${stateName} ${`(state)`}</span>
            <div class="separateTable">
            <span class="population">${place.populationIn2001} ${`<h6>(2001)</h6>`}</span>
            <span class="population">${place.populationIn2011} ${`<h6>(2011)</h6>`}</span>
            </div>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
