<script>
  import SortableList from 'svelte-sortable-list';

  import Tailwindcss from './Tailwindcss.svelte';
  import Budget from './components/Budget.svelte';
  import CreateBudget from './components/CreateBudget.svelte';
  import budgetStore from './stores/budgets';
  import { formatPrice } from './utils/number';

  let editingBudget = null,
    addMode = $budgetStore.length === 0;
</script>

<svelte:options immutable={true} />
<Tailwindcss />
<main>
  <div class="container mx-auto">
    <h1 class="my-4 text-2xl font-bold">Budgetizer!</h1>
    <div class="clear-both budgetizer" class:add-mode={addMode}>
      <div
        class="create-budget-form md:float-left md:mr-4 block form
        transition-all duration-200 ease-in">
        <CreateBudget toggleAddMode={() => (addMode = !addMode)} />
      </div>
      <div
        class="md:float-left block flex-grow bg-white shadow-md rounded px-6
        py-4 mb-4 transition-all duration-200 ease-in budgets">
        <h3 class="pb-3 text-lg font-bold border-b border-gray-200">Budgets</h3>
        {#if $budgetStore.length > 0}
          <SortableList
            list={$budgetStore}
            key="title"
            on:sort={e => budgetStore.set(e.detail)}
            let:item>
            <Budget budget={item} {editingBudget} />
          </SortableList>
          <div
            class="budget w-full pl-4 pr-2 py-2 border-gray-200 overflow-hidden
            transition-all duration-200 ease-in">
            <div class="flex items-center">
              <h4 class="ml-5 flex-grow text-gray-400 font-medium">Total</h4>
              <h5 class="font-medium">
                <span class="text-gray-600">
                  {formatPrice($budgetStore.reduce((tmp, b) => tmp + b.value, 0))}
                </span>
                <span class="text-gray-300">/</span>
                <span class="text-gray-500">
                  {formatPrice($budgetStore.reduce((tmp, b) => tmp + b.total, 0))}
                </span>
              </h5>
            </div>
          </div>
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
  @screen md {
    .budgetizer {
      --create-budget-form-size: 50px;
    }

    .budgetizer.add-mode {
      --create-budget-form-size: 300px;
    }

    .budgetizer .budgets {
      width: calc(100% - var(--create-budget-form-size) - 1rem);
    }

    .create-budget-form {
      width: var(--create-budget-form-size);
    }

    .budgetizer:not(.add-mode) .create-budget-form {
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
  }
</style>
