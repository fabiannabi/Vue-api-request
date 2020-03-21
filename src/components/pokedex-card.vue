<template>
  <div class="pokedex-body">
    <h1 class="pokemon-title">Pokemon Card generator</h1>
    <div v-show="error" class="errorPage">
      <h1>{{ errorMessage }}</h1>
    </div>
    <div class="search">
      <!-- general v for -->
      <select v-model="pokemonTypeSelected">
        <option v-for="types in pokemonSearched" :key="types.id">{{types}}</option>
      </select>
      <button @click="GenerateACard">Add Pokemon</button>
    </div>
    <div class="pokemon-grid">
      <div
        v-show="showCard"
        class="pokemon-cards"
        v-for="current in pokemonCards"
        :key="current.id"
      >
        <!-- section for name and sprite-->
        <div class="pokemon-card">
          <img class="sprite" v-bind:src="current.sprite" alt="Pokemon Not Found" />
          <div class="pokemon-name">
            <p>{{current.name}}</p>
          </div>
          <div class="type">
            <li>
              <div>{{current.typeone}}</div>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      pokemonTypeSelected: "",
      pokemonSearched: [
        "Normal",
        "Poison",
        "Psichic",
        "Grass",
        "Ground",
        "Ice",
        "Fire",
        "Rock",
        "Dragon",
        "Water",
        "Bug",
        "Dark",
        "Fighting",
        "Ghost",
        "Steel",
        "Flying",
        "Electric",
        "Fairy"
      ],
      moveset: [],
      showCard: false,
      error: false,
      errorMessage: "",
      pokemonCards: []
    };
  },

  computed: {},

  methods: {
    GenerateACard() {
      this.$http
        .get(
          "https://pokeapi.co/api/v2/pokemon/" +
            Math.floor(Math.random() * 800).toString() +
            "/"
        )
        .then(function(data) {
          this.pokemonCards.push({
            name: data.body.name,
            id: data.body.id,
            sprite: data.body.sprites.front_default,
            typeone: data.body.types[0].type.name
          }),
            (this.showCard = true),
            (this.error = false);
          console.log(data.body.types[0].type.name);
          console.log(this.pokemonCards);
        })
        .catch(function(error) {
          this.errorMessage =
            "Oops that pokemon has not been discovered yet.. try another pokemon";
          this.error = true;
          this.showCard = false;
        });
    }
  },
  created() {}
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
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 88px 0 rgba(0, 0, 0, 0.1607843137254902);
}
.pokemon-grid {
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  height: auto;
  margin: auto;
  grid-auto-rows: max-content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
.pokemon-card {
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
