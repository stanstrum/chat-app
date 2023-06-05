<script>
	import InfoWrapper from "../components/InfoWrapper.svelte";

  import { page } from "$app/stores";

  const status = $page.status;

  /**
   * @typedef {object} Note
   * @property {string} message
   * @property {string} submessage
   */
  /**
   * @type {Record<number, Note>}
   * @todo move this to another file -- just figure out where it
   * should go.
   */
  const errorNotes = {
    404: {
      message: "Page not found",
      submessage: "Sorry, we coulnd't find the page you're looking for."
    },
    500: {
      message: "An internal server error occured",
      submessage: "Please try again later."
    }
  };

  /** @type {Note} */
  const note = errorNotes[status] || {
    message: "An unknown error ocurred",
    submessage: "Please try again later."
  };
</script>

<InfoWrapper>
  <div class="text-center">
    <p class="text-base font-semibold text-indigo-600">{status}</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{note.message}</h1>
    <p class="mt-6 text-base leading-7 text-gray-600">{note.submessage}</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
    </div>
  </div>
</InfoWrapper>
