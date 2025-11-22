"use strict";

const input = document.querySelector("input");
const search = document.querySelector("#search-btn");
const randomBtn = document.querySelector("#random-btn");
const pokemons = document.querySelector("#pokemon-card");

search.addEventListener("click", () => {
  if (input.value < 1 || input.value > 1025) {
    pokemons.innerHTML = "";
    const html = `
  <div class="error" id="error">
    <p>The Pokemon number must be between 1 and 1025</p>
  </div>
`;
    pokemons.insertAdjacentHTML("beforeEnd", html);
    return;

  } else {
    const request = new XMLHttpRequest();
    request.open("GET", `https://pokeapi.co/api/v2/pokemon/${input.value}`);
    request.send();

    request.addEventListener("load", () => {
      pokemons.innerHTML = "";

      const data = JSON.parse(request.response);
      // console.log(data);
      renderPokemon(data);
    });
  }
});

const random = randomBtn.addEventListener("click", () => {
  const rand = Math.random() * 1025 + 1;
  let numero = Math.floor(rand);

  // console.log(numero);
  input.value = numero;

  const request = new XMLHttpRequest();
  request.open("GET", `https://pokeapi.co/api/v2/pokemon/${numero}`);
  request.send();

  request.addEventListener("load", () => {
    pokemons.innerHTML = "";
    const data = JSON.parse(request.response);
    console.log(data);
    renderPokemon(data);
  });
});

const renderPokemon = (pokemon) => {
  const tailleMetres = pokemon.height / 10; // en mètres
  const poidsKg = pokemon.weight / 10; // en kilos
  const types = pokemon.types.map(t => t.type.name).join(", "); 
  const html = `
  <div class="pokemon-info">
    <h2 class="pokemon-name">${pokemon.name}</h2>
    <img class="pokemon-img" src="${pokemon.sprites.front_default}"  alt="Pokémon">
    <p class="pokemon-types"><strong>Types :</strong> <span>${types}</span></p>
    <p class="pokemon-size"><strong>Taille :</strong> <span>${tailleMetres} m</span></p>
    <p class="pokemon-weight"><strong>Poids :</strong> <span>${poidsKg} Kg</span></p>
  </div>
`;

  pokemons.insertAdjacentHTML("beforeEnd", html);
};

