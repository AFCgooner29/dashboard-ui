<template>
  <VaModal v-model="isModalOpen" title="Enter API Key" class="api-key-modal">
    <p :class="messageClass">{{ message }}</p>
  </VaModal>
</template>

<script setup>
import { ref, watch } from 'vue';

// Modal open state
const isModalOpen = ref(false);

// Props to pass message and type
const props = defineProps({
  show: Boolean,
  message: {
    type: String,
    required: true,
  },
  messageType: {
    type: String,
    default: 'default', // 'default', 'error', or 'warning'
  },
});

// Watch the prop 'show' to control when to open/close the modal
watch(
  () => props.show,
  (newVal) => {
    isModalOpen.value = newVal;
  }
);

// Determine message class based on type
const messageClass = computed(() => {
  switch (props.messageType) {
    case 'error':
      return 'error-message';
    case 'warning':
      return 'warning-message';
    default:
      return 'default-message';
  }
});
</script>

<style scoped>
/* Modal styles */
.api-key-modal {
  margin-top: 60px;
  text-align: left;
}

/* Message styles */
.default-message {
  color: black;
}

.error-message {
  color: red;
  font-weight: bold;
}

.warning-message {
  color: orange;
  font-weight: bold;
}

/* Optional: Add specific styles for the form if necessary */
.api-key-modal-form {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.api-key-modal-form VaButton {
  width: 100%;
}
</style>
