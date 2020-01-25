import Vue from 'vue'
import Vuex from 'vuex'
import {createVuexStore, Mutation, State} from 'vuex-simple';
import { Task } from '@/interfaces/interfaces'

import { sampleTasks } from "@/store/sampleTasks";

Vue.use(Vuex);

export class Store {
  @State()
  public tasks: Array<Task>;

  constructor(tasks: Array<Task>) {
    this.tasks = tasks;
  }

  @Mutation()
  public addTask(task: Task) {
    this.tasks.push(task);
  }
}

const store = new Store(sampleTasks);

export default createVuexStore(store, {
  strict: false,
  modules: {},
  plugins: []
});
