// * **Step 1** *
/*
create base function and console log text to ensure .js document is linked properly - check chrome dev tools. 
*/
//?const fetchPokemon = () => {
//?     console.log(('Fetching Pokemon!'));
//? };

//? fetchPokemon();

// * **Step 2** *
/*
set url as a variable so we can manipulate it latter on.
start a fetch and pass in the URL (in this case *baseURL*)
-we add a .then which returns a promise( )
-in that promis we define our callback which is an arrow function
-then we pass res.json
-then console log the data. 
-this provides the json for us to use

*/

// const fetchPokemon = () => {
//   const baseURL = `https://pokeapi.co/api/v2/pokemon/1/`;
//   fetch(baseURL)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// };

// fetchPokemon();

//* **Step 3** *
/*
.then data (*data is any variable we wanna choose*)
const pokemon = {} this is logged as an object. 
pokemon []*setting the value to this is property 'name'
 =data.name is how we locate in the json
*/

const fetchPokemon = () => {
  const baseURL = `https://pokeapi.co/api/v2/pokemon/1/`;
  fetch(baseURL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const pokemon = {};
      pokemon["name"] = data.name;
      pokemon["id"] = data.id;
      pokemon["image"] = data.sprites["front_default"];
      pokemon['type'] = '';
      data.types.forEach((type) => {
        pokemon["type"] = pokemon["type"] + ", " + type.type.name;
      });
      console.log(pokemon);
    });
};

fetchPokemon();

//* **Step 4** *
/*

*/
// *******

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 100; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
    </li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
