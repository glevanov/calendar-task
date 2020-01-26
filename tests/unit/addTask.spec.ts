import { Store } from "@/store/index";

const store = new Store([]);

test('task length is incremented', () => {
  store.addTask('Testing');
  expect(store.tasks.length).toBe(1);
});
