const allPokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const imageContainer = document.getElementById("image-container");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const type = document.getElementById("types");

let pokemonArray = [];

const fetchPokemonInfo = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pokemonInfo = data;
    console.log(pokemonInfo["types"]);

    hp.innerText = pokemonInfo["stats"][0]["base_stat"];
    attack.innerText = pokemonInfo["stats"][1]["base_stat"];
    defense.innerText = pokemonInfo["stats"][2]["base_stat"];
    specialAttack.innerText = pokemonInfo["stats"][3]["base_stat"];
    specialDefense.innerText = pokemonInfo["stats"][4]["base_stat"];
    speed.innerText = pokemonInfo["stats"][5]["base_stat"];

    pokemonInfo["types"].forEach((item) => type.innerHTML += `<h3>${item["type"]["name"].toUpperCase()}</h3> `);

    pokemonWeight.innerText = `Weight: ${pokemonInfo["weight"]}`;
    pokemonHeight.innerText = `Height: ${pokemonInfo["height"]}`;
    imageContainer.innerHTML = `
    <img src="${pokemonInfo["sprites"]["front_default"]}" alt="${pokemonInfo["name"]} sprites" id="sprite">
    `;
  } catch (err) {
    console.log(err);
  }
}

const fetchData = async () => {
  try {
    const res = await fetch(allPokemonUrl);
    const data = await res.json();
    const allPokemonName = data.results;
    const inputName = input.value.toLowerCase();
    pokemonArray = allPokemonName.filter((item) => item.name === inputName || item.id === Number(inputName));
    //console.log(pokemonArray);
    if (pokemonArray.length === 0) {
      alert("Pokémon not found");
      return;
    } 

    pokemonName.textContent = pokemonArray[0].name.toUpperCase();
    pokemonId.textContent = `#${pokemonArray[0].id}`;
    fetchPokemonInfo(pokemonArray[0].url);
    type.innerHTML = "";
  } catch (err) {
    console.log(err);
  }
}

searchBtn.addEventListener("click", fetchData);
