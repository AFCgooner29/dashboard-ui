<template>
  <div style="display: flex; height: 100%;"> 
    <ClientSidebar style="display: block"/>
    <!-- Interaction with AI here -->
    <div style="box-sizing: border-box; height: 100%; width:100%" >
      <div class="border p-3">
        <h5>Enable AI Chatbot</h5>
        <ConversationBox />
        <VaCheckbox v-model="chatStore.isNewTopic" @update:dirty="chatStore.toggleNewTopic()" class="mb-6" label="Start new topic" style="margin-top: 6px"  />
        <ChatInput />
        <VaButton @click="chatStore.sendMessage" preset="primary" class="mr-6 mb-2" style="margin-top: 6px; margin-right: 6px">Send</VaButton>
        <VaButton @click="chatStore.createNewChat()" color="danger" gradient class="mr-6 mb-2" style="margin-top: 6px; margin-right: 6px">New Chat</VaButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ClientSidebar from "../components/ClientSidebar.vue";
import ChatInput from "./components/ChatInput.vue";
import ConversationBox from "./components/ConversationBox.vue";
import { useChatStore } from "@/stores/client/ChatStore";

const chatStore = useChatStore();

onMounted(() => chatStore.createEmptyChat());
</script>

