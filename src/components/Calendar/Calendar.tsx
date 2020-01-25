import { Component } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useStore } from 'vuex-simple';

import styles from './Calendar.css?module';
import { Store } from "@/store/index";

dayjs.locale('ru');

interface Props {
}
@Component
export default class Calendar extends VueComponent<Props> {
  public store:Store = useStore(this.$store);

  private now = dayjs();
  private daysInWeek:number = 7;
  private daysInMonth:number = this.now.daysInMonth();
  private weekDaysNames:Array<string> = new Array(this.daysInWeek)
    .fill('')
    .map((day, index) => this.now.day(index === 0 ? 1 : index + 1)
      .format('dd')
    );
  private monthName:string = this.now.format('MMMM');
  private monthStart:number = this.switchStartToMonday(this.now.startOf('month').day());
  private monthEnd:number = this.switchStartToMonday(this.now.endOf('month').day());
  private monthDates = new Array(this.daysInMonth)
    .fill(0)
    .map((it, index) => `${index + 1}`);
  private weeksCount:number = Math.ceil((this.daysInMonth + this.monthStart) / this.daysInWeek);
  private year:string = this.now.format('YYYY');

  private switchStartToMonday(index:number) {
    return index === 0
      ? this.daysInWeek - 1
      : index - 1;
  }

  private onDateClick(day:string) {
    if (day === '') {
      return;
    }
    this.store.switchDay(day);
  }

  private getMonth() {
    const fillWeeks = (index:number) => {
      if (index === 0) {
        const leftPad = new Array(this.monthStart).fill('');
        return [
          ...leftPad,
          ...this.monthDates.slice(0, this.daysInWeek - this.monthStart)
        ];
      }
      const last = this.weeksCount - 1;
      if (index === last) {
        const rightPad = new Array(this.daysInWeek - this.monthEnd - 1).fill('');
        return [
          ...this.monthDates.slice(this.daysInWeek * last - this.monthStart),
          ...rightPad
        ];
      }
      return this.monthDates.slice(
        this.daysInWeek * index - this.monthStart,
        this.daysInWeek * (index + 1) - this.monthStart
      );
    };

    return new Array(this.weeksCount)
      .fill([])
      .map((day, index) => fillWeeks(index));
  }

  private get busyDays() {
    return this.store.busyDays;
  }

  private get selected() {
    return this.store.selectedDay;
  }

  render() {
    const monthData = this.getMonth();
    const month = monthData.map((week, index) =>
      <tr key={index}>
        { week.map((day, index) =>
          <td
            key={index}
            class={`
              ${styles.cell}
              ${day === this.selected.toString() ? styles.selected : ''}
              ${this.busyDays.has(parseInt(day)) ? styles.tasks : ''}
            `}
            onclick={this.onDateClick.bind(this, day)}
          >
            {day}
          </td>) }
      </tr>);

    return (
      <section class={styles.wrapper}>
        <table class={styles.table}>
          <thead>
            <tr>
              <th colspan={this.daysInWeek} class={styles.heading}>
                { this.monthName } {this.year}
              </th>
            </tr>
            <tr>
              { this.weekDaysNames.map(day =>
                <th key={day} class={`${styles.day} ${styles.cell}`}>{day}</th>)
              }
            </tr>
          </thead>
          <tbody>
            { month }
          </tbody>
        </table>
      </section>
    )
  }
}
