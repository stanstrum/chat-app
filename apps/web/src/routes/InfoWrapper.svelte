<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<div class="grid">
  <Header />

  <main class="px-5 py-7 max-w-[75%] justify-self-center">
    <slot />
  </main>
</div>

<Footer />
