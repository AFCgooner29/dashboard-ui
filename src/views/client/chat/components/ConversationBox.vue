<template>
  <VaScrollContainer
    class="max-h-[200px]"
    :color="chatStore.backgroundColor"
    vertical
    style="min-height: 350px; max-height: 350px"
  >
    <div
      v-for="message in chatStore.chat"
      :key="message.id"
      style="display: flex; flex-direction: column"
    >
      <div
        style="
          align-self: flex-end;
          display: flex;
          flex-direction: row-reverse;
          width: 60%;
        "
      >
        <VaAvatar size="small" class="mr-6" color="success"> A </VaAvatar>
        <p style="margin-right: 5px">
          {{ message.question }}
        </p>
      </div>
      <div
        style="
          align-self: flex-start;
          display: flex;
          flex-direction: row;
          width: 60%;
        "
      >
        <VaAvatar size="small" class="mr-6"> B </VaAvatar>
        <p style="margin-left: 5px">
          {{ message.response }}
        </p>
      </div>
    </div>
  </VaScrollContainer>
</template>

<script setup>
import { useChatStore } from "@/stores/client/ChatStore";
const chatStore = useChatStore();
</script>

<style></style>
