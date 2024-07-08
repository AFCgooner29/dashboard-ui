<template>
  <!-- <h1>Client chat page</h1>
  <div class="chat-container">
    <sidebar />
    <div class="conversation-area">
      <ConversationBox />
      <ChatInput />
    </div>
  </div> -->
  <div class="container mt-5">
    <div class="chat-container border p-3" id="chatContainer">
      <h5>Chatbot</h5>
      <div class="mb-3" style="max-height: 300px; overflow-y: auto">
        <div v-for="message in chatHistory" :key="message.id">
          <!-- Chat messages will appear here -->
          <p><strong>You:</strong> {{ message.question }}</p>
          <p><strong>Bot:</strong> {{ message.response }}</p>
        </div>
      </div>
      <div class="form-group">
        <label for="question">Your Question:</label>
        <textarea
          v-model="input"
          class="form-control"
          id="question"
          rows="3"
          placeholder="Ask your question..."
        ></textarea>
      </div>
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="isNewTopic" />
        <label class="form-check-label" for="isNewTopic">Start new topic</label>
      </div>
      <button
        @click="sendMessage"
        type="button"
        class="btn btn-primary"
        id="sendButton"
      >
        Send
      </button>
      <button type="button" class="btn btn-danger m-4" @click="clearChat">
        Clear Chat
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChatInput from "./components/ChatInput.vue";
import ConversationBox from "./components/ConversationBox.vue";
import Sidebar from "./components/Sidebar.vue";

const input = ref("");

const defaultResponse = "Hello how are you";
const chatHistory = ref([
  {
    id: 1,
    question: "What is the weather like today?",
    response: "The weather is sunny with a high of 25°C.",
  },
  {
    id: 2,
    question: "Tell me a joke.",
    response:
      "Why don't scientists trust atoms? Because they make up everything!",
  },
]);
const sendMessage = () => {
  const inputvalue = input.value;
  if (inputvalue) {
    setTimeout(() => {
      chatHistory.value.push({
        id: chatHistory.value.length + 1,
        question: inputvalue,
        response: defaultResponse,
      });
    }, 1000);
    input.value = "";
  }
};
// Real api.
// const sendMessage = async () => {
//   const inputvalue = input.value;
//   if (inputvalue) {
//     const fetchResponse = await fetch(url + "/auth/api/v1/discuss/" + discussionId + '/converse',
//       headers:{}
//     );
//     const 
//     input.value = "";
//   }
// };

const clearChat = () => {
  console.log("button click");
  chatHistory.value = [];
};
</script>

<style></style>
