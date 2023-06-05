<script>
	import SidebarItem from "./SidebarItem.svelte";
</script>

<aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-48 h-screen" aria-label="Sidebar">
  <div class="h-full py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 px-2">
    <ul class="space-y-2 font-medium">
      <SidebarItem href="#channel" selected>#chat</SidebarItem>
      <SidebarItem href="#channel" disabled>#chat</SidebarItem>
      <SidebarItem href="#channel" disabled>#chat</SidebarItem>
      <SidebarItem href="#channel" disabled>#chat</SidebarItem>
      <SidebarItem href="#channel" disabled>#chat</SidebarItem>
      <SidebarItem href="#channel" disabled>#chat</SidebarItem>
    </ul>
  </div>
</aside>

<slot />
