import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/Calendar/Calendar';
import TaskList from "@/components/TaskList/TaskList";

import styles from './App.css?module';

@Component
export default class App extends Vue {
  render() {
    return (
      <div
        id="app"
        class={`${styles.app} ${styles.wrapper}`}
      >
        <Calendar />
        <TaskList class={styles.tasks} />
      </div>
    )
  }
}
