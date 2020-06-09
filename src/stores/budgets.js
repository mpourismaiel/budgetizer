import { get, writable } from 'svelte/store';

const key = 'BUDGETIZER_BUDGETS';

const createBudgetStore = () => {
  const { set, update, subscribe } = writable([]);
  const json = localStorage.getItem(key);

  // use the value from localStorage if it exists
  if (json) {
    set(JSON.parse(json));
  }

  subscribe(data => localStorage.setItem(key, JSON.stringify(data)));

  return {
    subscribe,
    addBudget: budget =>
      update(data => [
        ...data.filter(({ title }) => title !== budget.title),
        { ...budget, order: data.length },
      ]),
    removeBudget: budget =>
      update(data => data.filter(({ title }) => title !== budget.title)),
    updateBudget: budget =>
      update(data =>
        data.map(prevBudget =>
          prevBudget.title === budget.title ? budget : prevBudget,
        ),
      ),
  };
};

export default createBudgetStore();
