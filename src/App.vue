<template>
  <nav :class="isMenu ? 'jce' : 'jcs'">
    <template v-if="!isMenu">
      <div class="btns">
        <v-btn variant="plain" class="text-blue" @click="goBack"> Назад </v-btn>
        <v-btn variant="plain" class="text-blue" @click="goMenu"> Меню </v-btn>
      </div>
    </template>
    <div class="btns">
      <template v-if="isAdmin">
        <v-btn variant="plain" class="text-blue" @click="goAdmin"> Админ панель </v-btn>
      </template>
      <router-link class="text-blue text-decoration-none profile" to="/profile">
        Профиль
      </router-link>
    </div>
  </nav>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './views/Login.vue';
import Reg from './views/Reg.vue';
import { authMe } from './api/user.js';


export default {
  name: 'App',
  components: {
    Login,
    Reg,
  },
  computed: {
    isMenu() {
      return (
        this.$route.path === '/menu' || this.$route.path === '/login' || this.$route.path === '/reg'
      );
    },
    user: {
      get() {
        return this.$store.getters.getUser;
      },
      set(value) {
        return this.$store.dispatch('saveUser', value);
      },
    },
    isAdmin() {
      return this.user.type === 'admin';
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMenu() {
      this.$router.push('/menu');
    },
    goAdmin() {
      this.$router.push('/admin');
    },
    isAuth() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login');
      } else {
        authMe().then((res) => {
          this.$store.dispatch('saveUser', res.data);
        });
      }
    },
  },
  created() {
    this.isAuth()
  }
};
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

  .btns {
    display: flex;
    gap: 10px;
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
