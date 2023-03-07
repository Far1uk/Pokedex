let currentPokedex;
let pokemonNumber;
let load = 21;
let allPokedex = [];

async function loadPokedex() {
  for (let i = 1; i < load; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    currentPokedex = await response.json();
    allPokedex.push(currentPokedex);
    renderPokemon(i);
  }
}

function renderPokemon(i) {
  let renderPokemon = document.getElementById("rowPokemon");
  let type = allPokedex[i - 1]["types"][0]["type"]["name"];
  renderPokemon.innerHTML += /*html*/ `
    <div onclick="openCard(${i})" class="rowPokemonContent ${getPokemonTypeClass(i)}" id="rowPokemonContent${i}">
      <div>
        <span class="col-pokemon-number" id="number">#${i}</span>
      </div>
        <div>
          <h1 class="rowPokemonContentHeader">${allPokedex[i - 1].name}</h1>
          <div class="row-pokemon-art" id="type${currentPokedex["name"]}"></div>
        </div>
      <div>
        <img src="${allPokedex[i - 1].sprites.other["official-artwork"].front_default}" id="pokemonImage" />
      </div>
    </div>
  `;
  renderPokemonTypes();
  dialogPokemonInfo(i);
}

function getPokemonTypeClass(i) {
  return allPokedex[i - 1]["types"][0]["type"]["name"];
}

function renderPokemonTypes() {
  for (let i = 0; i < currentPokedex.types.length; i++) {
    document.getElementById(`type${currentPokedex["name"]}`).innerHTML += `
        <span class="row-pokemon-art">${currentPokedex["types"][i]["type"]["name"]}</span>
        `;
  }
}

function dialogPokemonInfo(i) {
  let name = allPokedex[i - 1].name;
  let type = allPokedex[i - 1].types[0].type.name;
  let ability = allPokedex[i - 1].abilities[0].ability.name;
  let weight = allPokedex[i - 1].weight;
  let height = allPokedex[i - 1].height;
  let picture =
    allPokedex[i - 1].sprites.other["official-artwork"].front_default;
  let baseHP = allPokedex[i - 1].stats[0].base_stat;
  let baseAttack = allPokedex[i - 1].stats[1].base_stat;
  let baseDefense = allPokedex[i - 1].stats[2].base_stat;
  let baseSpeAttack = allPokedex[i - 1].stats[3].base_stat;
  let baseSpeDefense = allPokedex[i - 1].stats[4].base_stat;
  let baseSpeed = allPokedex[i - 1].stats[5].base_stat;
  let dialogPokemonInfo = document.getElementById("col-dialog");
  dialogPokemonInfo.innerHTML = /*html*/ `
        <div class="col-dialog-pokemon-info ${getPokemonTypeClass(i)}" id="dialogPokemonContent${i}">
          <div class="col-close-card">
            <span onclick="closeCard()" class="col-dialog-close"><i class="fa-solid fa-xmark"></i></span>
            <span>#${i}</span>
          </div>
          <h1>${name}</h1>
          <div class="row-pokemon-dialog-art">
            <span class="row-pokemon-art">${type}</span>
          </div>
          <div>
            <p onclick="nextPoke(${i})" class="dialog-click-button-right"><i class="fa-solid fa-chevron-right"></i></p>
          </div>
          <div>
            <p onclick="prevPoke(${i})" class="dialog-click-button-left"><i class="fa-solid fa-chevron-left"></i></p>
          </div>
          <div>
            <img src="${picture}" id="pokemonImageDialog" />
          </div>
        </div>

        <div class="dialog-feature">
          <div class="dialog-moves">
            <p onclick="changeToAbout()">About</p>
            <p onclick="changeToBase()">Base Stats</p>
            <p onclick="changeToMoves()">Moves</p>
          </div>

          <div id="about" class="dialog-all-species">
            <div class="dialog-species-content">
              <p>Species</p>
              <p></p>
            </div>
            <div class="dialog-species-content">
              <p>Height</p>
              <p>${height}</p>
            </div>
            <div class="dialog-species-content">
              <p>Weight</p>
              <p>${weight}</p>
            </div>
            <div class="dialog-species-content">
              <p>Abilities</p>
              <p>${ability}</p>
            </div>
          </div>

          <div id="base" class="dialog-all-species index2">
            <div class="dialog-species-content">
              <p>HP</p>
              <p>${baseHP}</p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%; background-color: #27ae60;"></div>
              </div>
            </div>
            <div class="dialog-species-content">
              <p>Attack</p>
              <p>${baseAttack}</p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%; background-color: #2980b9"></div>
              </div>
            </div>
            <div class="dialog-species-content">
              <p>Defense</p>
              <p>${baseDefense}</p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%; background-color: #b71540"></div>
              </div>
            </div>
            <div class="dialog-species-content">
              <p>Spe. Attack</p>
              <p>${baseSpeAttack}</p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%; background-color: #8e44ad"></div>
              </div>
            </div>
            <div class="dialog-species-content">
              <p>Spec. Defense</p>
              <p>${baseSpeDefense}</p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%; background-color: #d35400"></div>
              </div>
            </div>
            <div class="dialog-species-content">
              <p>Speed</p>
              <p>${baseSpeed}</p>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%; background-color: #cc8e35"></div>
              </div>
            </div>
          </div>
          
          <div id="moves" class="dialog-all-species index2">
            <div class="dialog-move-content" id="move${allPokedex[i-1]["moves"]}"></div>
          </div>
        </div>
    `;
  dialogMove(i);
}

function nextPoke(i) {
  if (i == allPokedex.length - 1) {
    i = 0
  } else {
    i++;
  }
  dialogPokemonInfo(i);
}

function prevPoke(i) {
  if (i == 0) {
    i = allPokedex.length - 1
  } else {
    i--;
  }
  dialogPokemonInfo(i);
}

function dialogMove(i) {
  for (let j = 0; j < allPokedex[i-1].moves.length; j++) {
    document.getElementById(`move${allPokedex[i-1]["moves"]}`).innerHTML += `
      <p class="dialog-move-p">${allPokedex[i-1]["moves"][j]["move"]["name"]}</p>
    `;
  }
}

function changeToAbout() {
  document.getElementById("about").classList.add("index1");
  document.getElementById("about").classList.remove("index2");
  document.getElementById("base").classList.add("index2");
  document.getElementById("moves").classList.add("index2");
}

function changeToBase() {
  document.getElementById("base").classList.add("index1");
  document.getElementById("base").classList.remove("index2");
  document.getElementById("about").classList.add("index2");
  document.getElementById("moves").classList.add("index2");
}

function changeToMoves() {
  document.getElementById("moves").classList.add("index1");
  document.getElementById("moves").classList.remove("index2");
  document.getElementById("about").classList.add("index2");
  document.getElementById("base").classList.add("index2");
}

function openCard(i) {
  document.getElementById("row-dialog-bg").classList.remove("d-none");
  dialogPokemonInfo(i);
}

function closeCard() {
  document.getElementById("row-dialog-bg").classList.add("d-none");
}

function popUpBackground() {
  let popup = document.getElementById('row-dialog-bg');
  popup.classList.toggle('d-none');
} 