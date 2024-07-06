<template>
  <h1>Client chat page</h1>
  <div class="chat-container">
    <sidebar />
    <div class="conversation-area">
      <ConversationBox />
      <ChatInput />
    </div>
  </div>
</template>

<script setup>
import ChatInput from "./components/ChatInput.vue";
import ConversationBox from "./components/ConversationBox.vue";
import Sidebar from "./components/Sidebar.vue";

</script>

<style>

</style>