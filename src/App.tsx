import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/Calendar';

import styles from './App.css?module';

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app" class={styles.app}>
        <Calendar />
      </div>
    )
  }
}
