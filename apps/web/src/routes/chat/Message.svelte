<script lang="ts">
  export let username: string;
  export let content: string;
  export let pending: boolean = false;
</script>


<div class="pb-6 text-xl dark:text-white">
  <p class="underline">{username}</p>
  <p class={pending ? "text-red-900" : ""}>{content}</p>
</div>
