<script>
  import Header from "../routes/Header.svelte";
  import Footer from "../routes/Footer.svelte";
</script>

<div class="grid">
  <Header />

  <main class="px-5 py-7 max-w-[75%] justify-self-center">
    <slot />
  </main>
</div>

<Footer />
