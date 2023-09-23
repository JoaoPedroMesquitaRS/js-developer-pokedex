const pokemonList = document.getElementById('pokemonList');
const pokemonInfoList = document.getElementById('pokemonInfoList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    
    const pokemonHtml = `
        <li onclick="pokeApi.getPokemonsInfo(this.id)" id="${pokemon.number}" class="pokemonLi pokemon ${pokemon.type} ${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
    pokemonList.innerHTML += pokemonHtml;
}

async function loadPokemonItens(offset, limit) {
    await pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        const classCount = document.getElementsByClassName("skeleton").length;
        let qtdLi = 10;         

        // TO THIS CONDITION WORKS, ITS NECESSART ADD THE 'skeleton' CLASS ON THE <li> TAG
        // if(classCount >= qtdLi){        
        //     for (let index = 1; index < classCount; index++) {
        //         const liId = document.getElementById(index);
        //         console.log(liId)
        //         liId.classList.remove("skeleton")                    
        //     }
        // }
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit
    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})