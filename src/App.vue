<template>
  <nav :class="isMenu ? 'jce' : 'jcs'">
    <template v-if="!isMenu">
      <v-btn variant="plain" class="text-blue" @click="goBack">
        Назад
      </v-btn>
    </template>
    <router-link class="text-blue text-decoration-none profile" to="/profile">
      Профиль
    </router-link>
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
  },
  computed: {
    isMenu() {
      return (this.$route.path === '/menu' ||
      this.$route.path === '/login' ||
      this.$route.path === '/reg')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
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
  display: flex;
  .profile {
    border: 2px solid;
    border-radius: 5%;
    padding: 5px 10px;
  }
}
.jce {
  justify-content: end;
}
.jcs {
  justify-content: space-between;
}
a {
  text-decoration: none;
}
</style>
