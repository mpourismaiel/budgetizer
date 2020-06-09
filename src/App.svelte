<script>
  import Tailwindcss from './Tailwindcss.svelte';
  import budgetStore from './stores/budgets';
  import Budget from './components/Budget.svelte';
  import CreateBudget from './components/CreateBudget.svelte';

  let editingBudget = null,
    addMode = $budgetStore.length === 0;
</script>

<svelte:options immutable={true} />
<Tailwindcss />
<main class="bg-gray-200">
  <div class="container mx-auto">
    <h1 class="mb-4 text-2xl font-bold">Budgetizer!</h1>
    <div class="clear-both budgetizer" class:add-mode={addMode}>
      <div
        class="create-budget-form float-left block mr-4 form transition-all
        duration-200 ease-in">
        <CreateBudget toggleAddMode={() => (addMode = !addMode)} />
      </div>
      <div
        class="float-left block flex-grow bg-white shadow-md rounded px-6 py-4
        mb-4 transition-all duration-200 ease-in budgets">
        <h3 class="mb-3 text-lg font-bold">Budgets</h3>
        {#if $budgetStore.length > 0}
          <ul>
            {#each $budgetStore as budget (budget.title)}
              <Budget {budget} {editingBudget} />
            {/each}
          </ul>
        {:else}
          <p class="text-gray-600 mb-0">
            You haven't assigned any budgets yet.
          </p>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  main {
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
  }

  .budgetizer.add-mode .create-budget-form {
    width: 400px;
  }

  .budgetizer:not(.add-mode) .create-budget-form {
    width: 50px;
    height: 156px;
    @apply p-2;
  }

  .budgetizer:not(.add-mode)
    .create-budget-form
    :global(*:not(form):not(.title):not(h3)) {
    display: none;
  }

  .budgetizer:not(.add-mode) .create-budget-form :global(h3) {
    transform: rotateZ(90deg);
    transform-origin: left;
    margin: 0 1rem;
    min-width: 11ch;
  }

  .budgetizer.add-mode .budgets {
    width: calc(100% - 400px - 1rem);
  }

  .budgetizer:not(.add-mode) .budgets {
    width: calc(100% - 50px - 1rem);
  }
</style>
