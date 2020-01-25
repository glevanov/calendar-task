import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple';
import { Task } from '@/interfaces/interfaces'

import { Tasks } from "@/store/tasks";

Vue.use(Vuex);

const sampleTasks:Array<Task> = [
  {
    date: 3,
    text: 'Погладить кота',
    done: true
  },
  {
    date: 8,
    text: 'Не тупить целый день на Лепре',
    done: true
  },
  {
    date: 15,
    text: 'Купить хлеба',
    done: false
  },
  {
    date: 29,
    text: 'Позвонить Геннадию',
    done: false
  }
];

const instance = new Tasks(sampleTasks);

export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: []
});
