"use strict";

const request = new XMLHttpRequest();
request.open("GET", `https://pokeapi.co/api/v2/pokemon/1`);
request.send();

request.addEventListener("load", () => {
  const data = JSON.parse(request.response);
  console.log(data);
    
  board.innerHTML = "";

  data.stationboard.forEach((station) => {
    renderStation(station);
  });
});

