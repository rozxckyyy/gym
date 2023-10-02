import Vuex from 'vuex'

import userData from './data/userData.js'
import adminData from './data/adminData.js';
import menu from './data/menu.js';

export default new Vuex.Store({
  modules: {
    userData,
    adminData,
    menu
  },
});
