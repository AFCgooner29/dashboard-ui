<template>
  <VaSidebar hoverable minimized-width="64px" style="height: 80vh">
    <VaSidebarItem
      v-for="item in chatStore.conversations"
      :key="item.id"
      :active="chatStore.activeChat"
      @click="handleClick(item.id)"
    >
      <VaSidebarItemContent>
        <VaIcon :name="item.icon" />
        <VaSidebarItemTitle>
          {{ item.title }}
        </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
  </VaSidebar>
</template>

<script setup>
import { useChatStore } from "@/stores/client/ChatStore";
const chatIcon = "history";
const chatStore = useChatStore();

function handleClick(item) {
  chatStore.visitPreviousChat(item);
}
</script>

<style></style>
