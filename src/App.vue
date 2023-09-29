<template>
  <nav>
    <v-btn>dsads</v-btn>
  </nav>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './views/Login.vue';
import Reg from './views/Reg.vue';

export default {
  name: "App",
  components: {
    Login,
    Reg,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  height: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
