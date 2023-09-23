const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;

    const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    pokemon.abilities = abilities

    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.stat.name)
    pokemon.stats = stats
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => {
            return pokemonsDetails
        })
}

pokeApi.getPokemonsInfo = (id) => {
    document.getElementById("pokemonCard").style.display = 'flex';
    document.getElementById("bodyId").style.overflow = 'hidden';

    const Nid = id;
    const url = `https://pokeapi.co/api/v2/pokemon/${Nid}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => {
            const pokemons = jsonBody
            const pokeArray = convertPokeApiToInfo(pokemons)
            const newHtml = `
            <div id="cardMain" class="${pokeArray.type}">
                <div class="imgInfo">
                    <span>#${pokeArray.number}</span>
                    <img src="${pokeArray.photo}" alt="${pokeArray.name}">
                </div>
                <h3 class="pokemonStatsName">${pokeArray.name}</h1>
            </div>
            <div class="card">
                <div id="aboutStats">
                    <ul class="infoPokemon" id="infoPokemon">
                        <li class="liAboutEvo">
                            <h3 class="titleInfo titleActivate">ABOUT</h3>
                            <h3 class="titleInfo" onclick="createEvolution()">STATISTICS</h3>
                        </li>
                        <li class="cardLi">
                            <span>Heigth</span>
                            <p>${(pokeArray.height)/10} Meters</p>
                        </li>
                        <li>
                            <span>Types</span>
                            <div class="pTypes">
                                ${pokeArray.types.map((type) => `<p class="type ${type}">${type}</p>`).join('')}
                            </div>
                        </li>
                        <li>
                            <span>Weight</span>
                            <p>${(pokeArray.weight)/10} Kg</p>
                        </li>
                        <li class="abilities">
                            <span>Abilities</span>
                            <div class="pAbilities">
                                ${pokeArray.abilities.map((ability) => `<p class="type ${ability}">${ability}</p>`).join(',')}
                            </div>
                        </li>
                    </ul>
                    
                </div>
                <div class="hidden" id="evolution">

                    <ul class="infoPokemon" id="infoPokemon">
                        <li class="liAboutEvo">
                            <h3 class="titleInfo" onclick="createAboutStats()">ABOUT</h3>
                            <h3 class="titleInfo titleActivate">STATISTICS</h3>
                        </li>
                    </ul>
                    
                    <ul class="infoPokemon" id="infoPokemon">
                        <li class="cardLi">
                            <span>${pokeArray.stats[0]}</span>
                            <p>${pokeArray.statsN[0]}</p>
                            <div class="statsBar">
                                <div style="width: ${pokeArray.statsN[0]}%;" class="completeBar"></div>
                            </div>
                        </li>
                        <li>
                            <span>${pokeArray.stats[1]}</span>
                            <p>${pokeArray.statsN[1]}</p>
                            <div class="statsBar">
                                <div style="width: ${pokeArray.statsN[1]}%;" class="completeBar"></div>
                            </div>
                        </li>
                        <li>
                            <span>${pokeArray.stats[2]}</span>
                            <p>${pokeArray.statsN[2]}</p>
                            <div class="statsBar">
                                <div style="width: ${pokeArray.statsN[2]}%;" class="completeBar"></div>
                            </div>
                        </li>
                        <li class="">
                            <span>${pokeArray.stats[5]}</span>
                            <p>${pokeArray.statsN[5]}</p>
                            <div class="statsBar">
                                <div style="width: ${pokeArray.statsN[5]}%;" class="completeBar"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            `;
            pokemonInfoList.innerHTML = newHtml;
        })       
}

function createEvolution() {
    const evolution = document.querySelector("#evolution");
    const pokemonInfoList = document.getElementById('aboutStats');
    evolution.classList.remove("hidden");
    pokemonInfoList.classList.add("hidden");
}

function createAboutStats() {
    const evolution = document.querySelector("#evolution");
    const pokemonInfoList = document.getElementById('aboutStats');
    evolution.classList.add("hidden");
    pokemonInfoList.classList.remove("hidden");
}

function convertPokeApiToInfo(pokemonInfo){
    const pokemonIn = new PokemonInfo();
    pokemonIn.number = pokemonInfo.id
    pokemonIn.name = pokemonInfo.name

    const types = pokemonInfo.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemonIn.types = types
    pokemonIn.type = type
    pokemonIn.weight = pokemonInfo.weight;
    pokemonIn.height = pokemonInfo.height;

    const abilities = pokemonInfo.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    pokemonIn.abilities = abilities

    const stats = pokemonInfo.stats.map((statsSlot) => statsSlot.stat.name)
    pokemonIn.stats = stats

    const statsN = pokemonInfo.stats.map((statsSlot) => statsSlot.base_stat)
    pokemonIn.statsN = statsN
    
    pokemonIn.photo = pokemonInfo.sprites.other.dream_world.front_default
    return pokemonIn;
}