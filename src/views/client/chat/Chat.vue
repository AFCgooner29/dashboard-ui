<template>
  <div class="client-conatainer" style="display: flex; height: 100%;">
    <ClientSidebar :content="previousChats"/>
    <div class="" style="box-sizing: border-box; height: 100%; width:100%" >
      <div class="chat-container border p-3" id="chatContainer">
        <h5>Chatbot</h5>
        <VaScrollContainer
          class="max-h-[200px]"
          :color="currentColor"
          vertical
          style="min-height: 300px; max-height: 300px"
        >
          <div
            v-for="message in chatHistory"
            :key="message.id"
            style="display: flex; flex-direction: column"
          >
          <div style="align-self: flex-end; display: flex; flex-direction: row-reverse; width:60%">
            <VaAvatar size="small" class="mr-6" color="success"> A </VaAvatar>
            <p style="margin-right: 5px;">
              {{ message.question }}
            </p>
          </div>
          <div style="align-self: flex-start; display: flex; flex-direction: row; width: 60%;">
            <VaAvatar size="small" class="mr-6"> B </VaAvatar>
            <p style="margin-left: 5px;">
              {{ message.response }}
            </p>
          </div>
          </div>
        </VaScrollContainer>

        <VaCheckbox
          v-model="value"
          class="mb-6"
          color="primary"
          label="Start new topic"
          style="margin-top: 6px"
        />

        <VaTextarea
          v-model="input"
          label="Your Question"
          counter
          style="width: 100%; margin-top: 6px"
        />
        <VaButton
          @click="sendMessage"
          preset="primary"
          class="mr-6 mb-2"
          style="margin-top: 6px; margin-right: 6px"
        >
          Send
        </VaButton>
        <VaButton
          @click="clearChat"
          color="danger"
          gradient
          class="mr-6 mb-2"
          style="margin-top: 6px; margin-right: 6px"
        >
          Clear Chat
        </VaButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ClientSidebar from "../components/ClientSidebar.vue";

const defaultResponse = ["Hello how are you", "Hi there!", "Looking forward"];
const chatIcon = 'history';
const previousChats = [
  { title: "History of India", icon: chatIcon },
  { title: "Give me Business Ideas", icon: chatIcon, active: true },
  { title: "American Civil war", icon: chatIcon },
];

const input = ref("");
const chatHistory = ref([]);

const sendMessage = () => {
  const inputvalue = input.value;
  if (inputvalue) {
    setTimeout(() => {
      chatHistory.value.push({
        id: chatHistory.value.length + 1,
        question: inputvalue,
        response:
          defaultResponse[
            Math.floor(Math.random() * defaultResponse.length)
          ],
      });
    }, 1000);
    input.value = "";
  }
};
const clearChat = () => {
  chatHistory.value = [];
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
</script>

<style></style>
