<script>
  import budgetStore from '../stores/budgets';

  export let toggleAddMode;

  let budgetTitle, budgetTotal, error;

  const addBudget = () => {
    if (!budgetTitle) {
      error = "Please enter the budget's title!";
      return;
    }

    if ($budgetStore.some(budget => budget.title === budgetTitle)) {
      error = 'Please choose a unique budget title';
      return;
    }

    budgetStore.addBudget({
      title: budgetTitle,
      total: budgetTotal || 0,
      value: budgetTotal || 0,
    });
    budgetTitle = undefined;
    budgetTotal = undefined;
  };
</script>

<form on:submit|preventDefault={addBudget}>
  <div
    class="w-full flex justify-between cursor-pointer title"
    on:click={toggleAddMode}>
    <h3 class="mb-3 text-lg font-bold transition-all duration-200 ease-in">
      Create Budget
    </h3>
    <span class="text-gray-500">Collapse</span>
  </div>
  <div class="block">
    <label for="title" class="text-gray-700">Title</label>
    <input
      type="text"
      id="title"
      placeholder="Enter the budget's title"
      bind:value={budgetTitle}
      class="form-input mt-1 block w-full" />
  </div>
  <div class="block mt-4">
    <label for="total" class="text-gray-700">Total</label>
    <input
      type="number"
      id="total"
      placeholder="Enter the available budget"
      bind:value={budgetTotal}
      class="form-input mt-1 block w-full" />
  </div>
  <button class="mt-4 btn btn-blue self-end">Create!</button>
</form>
