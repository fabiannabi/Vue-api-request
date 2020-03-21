<template>
  <div class="pokedex-body">
    <h1 class="pokemon-title">Pokemon search Engine</h1>
    <div v-show="error" class="errorPage">
      <h1>{{ errorMessage }}</h1>
    </div>
    <div v-show="showCard" class="pokemon-cards">
      <!--
<div class="nav-bar">
        <li>Map</li>
        <li>Items</li>
        <li>Locations</li>
        <li>Berries</li>
        <li>Berries</li>
        <li>Berries</li>
        <li>Berries</li>
        <li>Berries</li>
        <li>Berries</li>
      </div>
      -->
      <div class="pokemon-stats">
        <img class="sprite" v-bind:src="sprite" alt="Pokemon Not Found" />
        <ul class="pokemon-stats">
          <li class="pokemon-name">
            <P>{{ name|Upcase }}</P>
          </li>
          <div class="type">
            <li v-for="types in typesbox" :key="types.id">
              <div>{{types.type.name|Capitaliced}}</div>
            </li>
          </div>
          <!-- <li class="moveset" v-for="move in moveset" :key="move.move.name">
            <p>{{ move.move.name|Capitaliced }}</p>
          </li>-->
        </ul>
      </div>
    </div>
    <div class="search">
      <input v-model="pokemonSearched" type="text" placeholder="Search a Pokemon" />
      <button @click="searchPokemon">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      id: "",
      pokemonSearched: "",
      name: "",
      sprite: "",
      moveset: [],
      typesbox: [],
      showCard: false,
      error: false,
      errorMessage: ""
    };
  },
  computed: {},

  methods: {
    searchPokemon() {
      this.$http
        .get(
          "https://pokeapi.co/api/v2/pokemon/" +
            (this.pokemonSearched
              ? this.pokemonSearched.toLowerCase()
              : "daggaz") +
            "/"
        )
        .then(function(data) {
          console.log(data),
            (this.name = data.body.name),
            (this.id = data.body.id),
            (this.sprite = data.body.sprites.front_default),
            (this.moveset = data.body.moves.slice(0, 4)),
            (this.typesbox = data.body.types.slice(0, 2)),
            (this.showCard = true),
            (this.error = false),
            console.log(this.typesbox.length);
        })
        .catch(function(error) {
          this.errorMessage =
            "Oops that pokemon has not been discovered yet.. try another pokemon";
          this.error = true;
          this.showCard = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pokedex-body {
  margin: 0;
  background-color: #f0f0f0;
  padding: 0;
  box-sizing: border-box;
}
.pokemon-title {
  padding: 2em 0 2em 0;
  text-align: center;
  background-color: #b61111;
  color: white;
}
.pokemon-cards {
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: max-content;
  grid-column-gap: 10px;
  height: auto;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 88px 0 rgba(0, 0, 0, 0.1607843137254902);
}
.sprite {
  background-color: rgb(247, 225, 204);
  height: 200px;
  display: flex;
  width: 200px;
  margin: 0 auto;
}

.nav-bar {
  height: 100%;
  background-color: rgb(247, 225, 204);
}

.nav-bar li {
  max-width: auto;
  padding: 10px;
  height: auto;
  text-align: center;
  font-size: 1.2em;
  list-style-type: none;
  border-bottom: dotted 2px #050402;
}
.search {
  text-align: center;
  padding: 40px;
}
.errorPage {
  text-align: center;
}
.pokemon-name {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
  list-style-type: none;
  border-bottom: dotted 2px #d4be9b;
}
.pokemon-name p {
  margin-top: 0;
  margin-bottom: 0;
}
.pokemon-stats {
  padding: 0;
  width: 100%;
  text-align: start;
  background-color: rgb(247, 225, 204);
  list-style-type: none;
}

.moveset {
  font-size: 1.3em;
  text-align: center;
  background-color: rgb(247, 225, 204);
}

.type {
  background-color: rgb(224, 115, 71);
  margin-top: 10px;
  padding: 5px;
  border: 1px solid rgb(51, 2, 2);
  border-radius: 10px;
  font-size: 1.3em;
  text-align: center;
  max-width: max-content;
  margin: auto;
  margin-top: 10px;
}
</style>
