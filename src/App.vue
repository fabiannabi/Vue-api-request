<template>
  <div>
    <pokedex-card></pokedex-card>
    <pokedex-body></pokedex-body>
  </div>
</template>

<script>
import pokedexBody from "./components/pokedex-body.vue";
import pokedexCards from "./components/pokedex-card.vue";

export default {
  components: {
    "pokedex-body": pokedexBody,
    "pokedex-card": pokedexCards
  },
  name: "app",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
