<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    padding: 0;
  }

  .btn {
    @apply font-bold py-2 px-4 rounded border-0;
  }

  .btn-blue {
    @apply bg-blue-500 text-white;
  }

  .btn-blue:hover {
    @apply bg-blue-700;
  }

  .form {
    @apply bg-white shadow-md rounded px-6 py-4 mb-4 flex flex-col;
  }
</style>
