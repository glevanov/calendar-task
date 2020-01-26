import { sampleTasks } from "@/store/sampleTasks";
import { Store } from "@/store/index";

const store = new Store(sampleTasks);

test('tasks are initialized', () => {
  expect(store.tasks.length).toBe(sampleTasks.length);
});

test('date is today by default', () => {
  const today = new Date().getDate().toString();
  expect(store.selectedDay).toBe(today);
});

const empty = new Store();

test('works without tasks', () => {
  expect(empty.tasks.length).toBe(0);
});
