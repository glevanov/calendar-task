import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import { Store } from "@/store/index";
import { useStore } from 'vuex-simple';

import styles from './TaskList.css?module';

interface Props {}
@Component
export default class TaskList extends VueComponent<Props> {
  public store:Store = useStore(this.$store);
  private newTask:string = '';

  private get tasks() {
    return this.store.dayTasks;
  }

  private onTaskAdd(evt:any) {
    evt.preventDefault();
    if (this.newTask.trim() === '') {
      this.newTask = '';
      return;
    }
    this.store.addTask(this.newTask);
    this.newTask = '';
  }

  private onInput(evt:any) {
    this.newTask = evt.target.value;
  }

  private onCheck(id:string) {
    this.store.toggleTask(id);
  }

  render() {
    const tasks = this.tasks.map(task =>
      <li class={styles.item}>
        <label class={styles.group}>
          <input
            type="checkbox"
            checked={task.done}
            class={styles.input}
            onchange={this.onCheck.bind(this, task.id)}
          />
          <span class={styles.checkbox} />
          <span>{task.text}</span>
        </label>
      </li>
    );

    const noTasks = <li class={styles.item}>
      <p class={styles.vacant}>На сегодня ничего не запланировано.</p>
    </li>;

    return (
      <section class={styles.wrapper}>
        <h2 class={styles.heading}>События</h2>

        <ul class={styles.list}>
          {this.tasks.length ? tasks : noTasks}
        </ul>

        <form class={styles.form} onsubmit={this.onTaskAdd}>
          <input
            type="text"
            class={styles.submit}
            value={this.newTask}
            oninput={this.onInput}
          />
        </form>
      </section>
    );
  }
}
