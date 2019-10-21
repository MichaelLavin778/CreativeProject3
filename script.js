/* global Vue fetch */
let app = new Vue({
  el: "#root",
  data: {
    input: '',
    pokemon: '',
    id: '',
    height: '',
    weight: '',
    types: [],
    moves: [],
    abilities: [],
    sprite: '',
    sprite_shiny: ''
  },
  computed: {
  },
  methods: {
    fetchREST() {
      let pokemon = this.input;
      pokemon = pokemon.toLowerCase();
      var url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
      // console.log(url);
      fetch(url)
        .then((data) => {
          document.getElementById("msg").innerHTML = "Not a Pokemon: " + toTitleCase(pokemon) + "!";
          this.pokemon = '';
          this.sprite = '';
          this.sprite_shiny ='';
          this.id = '';
          this.height = '';
          this.weight = '';
          this.types = [];
          this.moves = [];
          this.abilities = [];
          return (data.json());
        })
        .then((json) => {
          document.getElementById("msg").innerHTML = "";
          
          // console.log(json.name);
          this.pokemon = toTitleCase(json.name);
          // this.pokemon = json.name;
          
          // console.log(json.id);
          this.id = json.id;
          
          this.height = json.height;
          this.weight = json.weight;
          
          // console.log(json.type);
          this.types = [];
          for (let i = 0; i < json.types.length; i++) {
            // console.log(json.types[i].type.name);
            this.types.push({ name: json.types[i].type.name });
          };
          
          this.moves = [];
          for (let i = 0; i < json.moves.length; i++) {
            // console.log(json.moves[i].move.name);
            this.moves.push({ name: json.moves[i].move.name });
          };
          
          this.abilities = [];
          for (let i = 0; i < json.abilities.length; i++) {
            // console.log(json.abilities[i].ability.name);
            this.abilities.push({ name: json.abilities[i].ability.name });
          };
          
          // console.log(json.sprites.front_default);
          this.sprite = json.sprites.front_default;
          this.sprite_shiny = json.sprites.front_shiny;
        });
    },
  }
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}