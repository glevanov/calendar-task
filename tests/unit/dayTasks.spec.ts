import { sampleTasks } from "@/store/sampleTasks";
import { Store } from "@/store/index";

const store = new Store(sampleTasks);

test('gets todays tasks', () => {
  store.switchDay('26');
  const expected = JSON.stringify(
    sampleTasks.slice().filter(task => task.date === 26)
  );
  const result = JSON.stringify(store.dayTasks);
  expect(result).toBe(expected);
});
