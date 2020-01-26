import { sampleTasks } from "@/store/sampleTasks";
import { Store } from "@/store/index";

const store = new Store(sampleTasks);

test('done status is toggled', () => {
  const task = sampleTasks[0];
  const id = task.id;
  const status = task.done;
  store.toggleTask(id);
  expect(task.done).toBe(!status);
});
