<template>
  <VaTextarea
    v-model="chatStore.input"
    @keyup.enter="handleKeyupEnter"
    :value="chatStore.input"
    label="Your Question"
    counter
    style="width: 100%; margin-top: 6px"
  />
</template>

<script setup>
import { useChatStore } from "@/stores/client/ChatStore";

const chatStore = useChatStore();
const handleKeyupEnter = (event)=>{
  if(!event.shiftKey){
    chatStore.sendMessage();
  }
}

</script>

<style></style>
