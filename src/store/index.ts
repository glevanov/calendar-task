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
  public toggleTask(id:string) {
    const task = this.tasks.find(task => task.id === id);
    if (task !== undefined) {
      task.done = !task.done;
    }
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

  get dayTasks() {
    return this.tasks.filter(task => task.date.toString() === this.selectedDay);
  }
}

const store = new Store(sampleTasks);

export default createVuexStore(store, {
  strict: false,
  modules: {},
  plugins: []
});
