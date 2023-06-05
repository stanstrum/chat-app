<script lang="ts">
  export let href: string;
  export let selected = false;
  export let disabled = false;
</script>

<li>
  <a {href} class="
    flex items-center
    py-2 rounded-lg
    {
      disabled
        ? "dark:text-gray-600 cursor-default"
        : "dark:text-white"
    }
    text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700
    {
      selected ? "bg-gray-000 dark:bg-gray-700" : ""
    }">
     <span class="ml-3"><slot /></span>
  </a>
</li>
