<template>
  <div class="client-conatainer" style="display: flex; height: 100%;"> 
    <ClientSidebar :content="previousChats" style="display: block"/>
    <div class="" style="box-sizing: border-box; height: 100%; width:100%" >
      <div class="chat-container border p-3" id="chatContainer">
        <h5>Chatbot</h5>
        <ConversationBox :chat="chat" />
        <VaCheckbox v-model="isNewTopic" class="mb-6" :label="checkBoxLabel" style="margin-top: 6px" @update:dirty="toggleNewTopic" />
        <ChatInput v-model="input" :input="input"/>
        <VaButton @click="sendMessage" preset="primary" class="mr-6 mb-2" style="margin-top: 6px; margin-right: 6px">Send</VaButton>
        <VaButton @click="clearChat" color="danger" gradient class="mr-6 mb-2" style="margin-top: 6px; margin-right: 6px">Clear Chat</VaButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFetch } from '../../../util/useFetch';
import ClientSidebar from "../components/ClientSidebar.vue";
import ChatInput from "./components/ChatInput.vue";
import ConversationBox from "./components/ConversationBox.vue";

// Variables
let apiKey = 'd4b719f6-02b9-4ae1-bc0a-1b4d83eedba2';
const chatIcon = 'history';
const previousChats = [];

// Stateful Variables
const checkBoxLabel = ref("Start new topic");
const input = ref("");
const chat = ref([]);
const isNewTopic = ref(false);
const discussionId = ref(null);

// Component methods
const toggleNewTopic = ()=>{
  console.log("is new topic: " + isNewTopic.value);
  isNewTopic.value = !isNewTopic.value;
}

// Api methods
const sendMessage = () => {
  const inputvalue = input.value;
  if (inputvalue) {
    let response = null;
    if (discussionId === null || isNewTopic) {
        response = initiateDiscussion(inputvalue);
        if(response.ok)
          discussionId = response.data.discussionId;
    } else {
        response = continueDiscussion(inputvalue, isNewTopic);
    }
    if(response){
      chat.value.push(
        {
          question: inputvalue,
          response: response,
        }
      )
    }
    input.value = "";
  }
};

async function initiateDiscussion(inputvalue) {
  const requestObj = new Request('/auth/api/v1/discuss/initiate',{
      method: 'POST',
      headers: {
          'API_KEY': apiKey,
          'Content-Type': 'application/json'
      },
      data: JSON.stringify({
          requesterId: 'user2',
          question: inputvalue,
          isNewTopic: true
      }),
    }
  )
  try {
    const response = await useFetch(requestObj);
    return response;
  } 
  catch (error) {
    console.error('Failed to initiate discussion.', error);
    throw new Error('Failed to initiate discussion.');
  }
}

async function continueDiscussion(inputvalue, isNewTopic){
  const requestObj = new Request(`/auth/api/v1/discuss/${discussionId}/converse`, {
    method: 'POST',
    headers: {
      'API_KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        requesterId: 'user2',
        question: inputvalue,
        isNewTopic: isNewTopic
    })
  });

  try {
    const response = await useFetch(requestObj);
    return response;
  } 
  catch (error) {
    console.error('Failed to continue discussion.', error);
    throw new Error('Failed to continue discussion.');
  }
}


const clearChat = () => {
  chat.value = [];
};

// Lifecycle methods
</script>

<style></style>
