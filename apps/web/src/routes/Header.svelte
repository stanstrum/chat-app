<script>
  import { page } from "$app/stores";

  let hiddenMenu = true;

  function toggleNavbar() {
    hiddenMenu = !hiddenMenu;
  }

  /**
   * @typedef {Object} Route
   * @property {string} path
   * @property {string} name
   */
  /** @type {Array<[string, string]>} */
  const routes = [
    ["/", "Home"],
    ["/chat", "Chat"],
    ["/404", "404"]
  ];
</script>

<header>
  <nav class="border-gray-200 bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center">
        <!--- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />-->
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Chat</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" on:click={toggleNavbar}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden={hiddenMenu} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      <div class="{hiddenMenu ? "hidden" : ""} w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
          {#each routes as [path, name]}
            {#if path === $page.url.pathname}
              <li>
                <a href="{path}" class="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white md:text-blue-500" aria-current="page">{name}</a>
              </li>
            {:else}
              <li>
                <a href="{path}" class="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">{name}</a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  </nav>
</header>
