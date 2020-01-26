import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore, Mutation, State } from 'vuex-simple';
import dayjs from 'dayjs';
import nanoid from 'nanoid';
import { Task } from '@/interfaces/interfaces';

import { sampleTasks } from "@/store/sampleTasks";

Vue.use(Vuex);

export class Store {
  @State()
  public tasks:Array<Task>;
  public selectedDay:string;

  constructor(tasks: Array<Task>) {
    this.tasks = tasks;
    this.selectedDay = dayjs().date().toString();
  }

  @Mutation()
  public addTask(text:string) {
    this.tasks.push({
      date: parseInt(this.selectedDay),
      text,
      done: false,
      id: nanoid()
    });
  }

  @Mutation()
  public switchDay(day:string) {
    this.selectedDay = day;
  }

  get busyDays() {
    const acc = new Set();
    this.tasks.forEach(task => acc.add(task.date));
    return acc;
  }
}

const store = new Store(sampleTasks);

export default createVuexStore(store, {
  strict: false,
  modules: {},
  plugins: []
});
