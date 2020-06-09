<script>
  import budgetStore from '../stores/budgets';
  import { formatPrice } from '../utils/number';

  export let budget,
    editingBudget = null,
    error;

  const editBudget = () =>
    editingBudget
      ? (editingBudget = null)
      : (editingBudget = Object.assign({}, budget));

  const updateBudget = () => {
    if (!editingBudget.title) {
      error = "Please enter the budget's title!";
      return;
    }

    budgetStore.updateBudget(editingBudget);
    editingBudget = null;
  };
</script>

<li
  class="budget w-full px-2 py-2 border-b border-gray-200 overflow-hidden
  transition-all duration-200 ease-in hover:bg-gray-100"
  class:editing={editingBudget && editingBudget.title === budget.title}
  class:low={budget.value / budget.total < 0.2}>
  <div class="flex items-center">
    <svg
      class="order mr-2 hover:text-gray-800 text-gray-400 w-5 h-5 transition-all
      duration-200 ease-in cursor-move"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <h4 class="flex-grow text-blue-900 font-medium">{budget.title}</h4>
    <h5 class="font-medium mr-2">{formatPrice(budget.value)}</h5>
    <svg
      class="modify w-5 h-5 transition-all duration-200 ease-in cursor-pointer"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      on:click|stopPropagation={editBudget}>
      <path
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0
        110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  </div>
  <div
    class="flex flex-col mt-3"
    class:hidden={!editingBudget || editingBudget.title !== budget.title}>
    {#if editingBudget && editingBudget.title === budget.title}
      <form on:submit|preventDefault={updateBudget} class="flex flex-col mb-2">
        <div class="block">
          <label for="edit-title" class="text-gray-700">Title</label>
          <input
            type="text"
            id="edit-title"
            placeholder="Enter the budget's title"
            bind:value={editingBudget.title}
            class="form-input mt-1 block w-full" />
        </div>
        <div class="flex items-end clear-both mt-3">
          <div class="block float-left mr-4">
            <label for="edit-total" class="text-gray-700">Total</label>
            <input
              type="number"
              id="edit-total"
              placeholder="Enter the total budget"
              bind:value={editingBudget.total}
              class="form-input mt-1 block w-full" />
          </div>
          <div class="block float-left mr-4">
            <label for="edit-value" class="text-gray-700">Remaining</label>
            <input
              type="number"
              id="edit-value"
              placeholder="Enter the remaining budget"
              bind:value={editingBudget.value}
              class="form-input mt-1 block w-full" />
          </div>
          <button class="mt-4 btn btn-blue">Update!</button>
        </div>
      </form>
    {/if}
  </div>
</li>

<style>
  .budget:first-child {
    @apply border-t;
  }

  .budget.low h5 {
    @apply text-red-500;
  }

  .budget .modify {
    margin-right: calc(-20px - 0.5rem);
  }

  .budget:hover .modify,
  .budget.editing .modify {
    margin-right: 0;
  }
</style>
