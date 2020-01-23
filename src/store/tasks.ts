import { Mutation, State } from 'vuex-simple';
import { Task } from '@/interfaces/interfaces';

export class Tasks {
  @State()
  public tasks: Array<Task>;

  constructor(tasksProp: Array<Task>) {
    this.tasks = tasksProp;
  }

  @Mutation()
  public addTask(task: Task) {
    this.tasks.push(task);
  }
}
