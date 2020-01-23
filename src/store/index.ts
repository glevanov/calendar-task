import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple';

import { Tasks } from "@/store/tasks";

Vue.use(Vuex);

const instance = new Tasks([]);

export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: []
});
