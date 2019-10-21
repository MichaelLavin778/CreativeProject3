/* global Vue fetch */
let app = new Vue({
  el: "#root",
  data: {
    input: '',
    pokemon: '',
    id: '',
    weight: '',
    types: [],
    moves: [],
    sprite: ''
  },
  computed: {
  },
  methods: {
    fetchREST() {
      let pokemon = this.input;
      pokemon = pokemon.toLowerCase();
      var url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
      console.log(url);
      fetch(url)
        .then((data) => {
          document.getElementById("msg").innerHTML = "Not a Pokemon: " + toTitleCase(pokemon) + "!";
          this.pokemon = '';
          this.id = '';
          this.weight = '';
          this.types = [];
          this.moves = [];
          this.sprtie = '';
          return (data.json());
        })
        .then((json) => {
          document.getElementById("msg").innerHTML = "";
          
          // console.log(json.name);
          this.pokemon = toTitleCase(json.name);
          // this.pokemon = json.name;
          
          // console.log(json.id);
          this.id = json.id;
          
          this.weight = json.weight;
          
          // console.log(json.type);
          this.types = [];
          for (let i = 0; i < json.types.length; i++) {
            // console.log(json.types[i].type.name);
            // console.log(json.types[i].name);
            // console.log(json.types[i].type);
            this.types.push({ name: json.types[i].type.name });
          };
          
          this.moves = [];
          for (let i = 0; i < json.moves.length; i++) {
            // console.log(json.moves[i].move.name);
            // console.log(json.moves[i].name);
            // console.log(json.moves[i].move);
            this.moves.push({ name: json.moves[i].move.name });
          };
          
          console.log(json.sprite.front_default);
          this.sprite = json.sprite.front_default;
        });
    },
  }
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}