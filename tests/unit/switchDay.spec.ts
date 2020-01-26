import { sampleTasks } from "@/store/sampleTasks";
import { Store } from "@/store/index";

const store = new Store(sampleTasks);

test('day is switched', () => {
  const currentDay = store.selectedDay;
  const newDay = parseInt(currentDay) - 1 > 0
    ? (parseInt(currentDay) - 1).toString()
    : (parseInt(currentDay) + 1).toString();
  store.switchDay(newDay);
  expect(store.selectedDay).toBe(newDay);
});
