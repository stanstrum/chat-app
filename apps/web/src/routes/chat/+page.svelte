<svelte:head>
  <title>Chat</title>
</svelte:head>

<script lang="ts">
  import type { Socket } from "socket.io-client";
  import { io } from "socket.io-client";

	import Message from "./Message.svelte";

  import type * as ApiInterface from "interface";
	import { afterUpdate } from "svelte";

  import { PUBLIC_WEB_WS_LOCATION } from "$env/static/public"

  let messagesElement: HTMLDivElement;

  /** @todo move this to an ENV for development and production environments */
  const socket: Socket<
    ApiInterface.ServerToClientEvents,
    ApiInterface.ClientToServerEvents
  > = io(PUBLIC_WEB_WS_LOCATION);

  let messages: Array<{
    message: ApiInterface.Message,
    pending?: boolean
  }
  > = [];

  socket.on("message", message => {
    messages.push({ message });
    messages = messages;
  });

  async function sendMessage(e: SubmitEvent) {
    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    const content = formData.get("content") as string;

    if (!content) return;
    target.reset();

    const messageStatus = {
      message: {
        username: socket.id,
        content,
      },
      pending: true
    };

    const messageNo = messages.push(messageStatus) - 1;
    messages = messages;

    socket.emit("message", messageStatus.message, () => {
      console.log("ack'd");

      messages[messageNo].pending = false;
    });
  }

  let messagesLen: number;
  $: messagesLen = messages.length;

  afterUpdate(() => {
    messagesElement.scroll({ top: messagesElement.scrollHeight, behavior: 'smooth' });
  });
</script>

<div class="
  h-screen bg-gray-950
  ml-48
  p-4
  overflow-y-scroll
">
  <div><p class="text-white">Header Here</p></div>
  <div bind:this={messagesElement} class="justify-items-end">
    {#each messages as status}
      <Message {...status.message} pending={status.pending} />
    {/each}
  </div>
  <form on:submit|preventDefault={sendMessage}>
    <div class="
      flex items-center
      border rounded-lg border-gray-400
      py-2
    ">
      <input class="
          appearance-none bg-transparent
          border-none w-full text-white
          mr-3 py-1 px-2  leading-tight
          focus:outline-none
        "
        type="text"
        name="content"
        placeholder="Message #chat"
      >
      <button class="
          flex-shrink-0 bg-blue-500
          hover:bg-blue-700 border-blue-500
          hover:border-blue-700 text-sm
          border-4 text-white py-1 px-2 mr-2
          rounded
        "
        type="submit"
      >Send {messagesLen}</button>
    </div>
  </form>
</div>
