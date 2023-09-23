function createInfoCard(pokemon){
return `
<div class="imgInfo">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            </div>
            <h3 class="pokemonStatsName">Pokemon name</h1>
            <div class="card">
                <ul class="infoPokemon">
                    <li><h3 class="titleInfo">About</h3></li>
                    <li class="cardLi">
                        <span>Heigth</span>
                        <p>${pokemon.height}</p>
                    </li>
                    <li>
                        <span>Types</span>
                        <p>${pokemon.types}</p>
                    </li>
                    <li>
                        <span>Weight</span>
                        <p>${pokemon.weight}</p>
                    </li>
                    <li class="abilities">
                        <span>Abilities</span>
                        <p>${pokemon.abilities}</p>
                    </li>
                </ul>
                <ul class="infoPokemon">
                    <li><h3 class="titleInfo">Statistics</h3></li>
                    <li class="cardLi">
                        <span>XP</span>
                        <p>${pokemon.height}</p>
                    </li>
                    <li>
                        <span>ATA</span>
                        <p>${pokemon.types}</p>
                    </li>
                    <li>
                        <span>DEF</span>
                        <p>${pokemon.weight}</p>
                    </li>
                    <li class="abilities">
                        <span>TEC</span>
                        <p>${pokemon.abilities}</p>
                    </li>
                </ul>
            </div>
` ;
} 