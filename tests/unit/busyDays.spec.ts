import { sampleTasks } from "@/store/sampleTasks";
import { Store } from "@/store/index";

const store = new Store(sampleTasks);

test('matches with sample data', () => {
  const sample = JSON.stringify(Array.from(new Set([3, 8, 15, 26])));
  const result = JSON.stringify(Array.from(store.busyDays));
  expect(result).toBe(sample);
});

const empty = new Store();

test('works with empty store', () => {
  const sample = JSON.stringify(Array.from(new Set()));
  const result = JSON.stringify(Array.from(empty.busyDays));
  expect(result).toBe(sample);
});
