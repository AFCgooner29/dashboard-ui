<template>
  <VaModal v-model="isModalOpen" title="Enter API Key" class="api-key-modal">
    <VaForm @submit="handleFormSubmit" class="api-key-modal-form">
      <VaInput
        v-model="apiKey"
        label="API Key"
        placeholder="Enter your API key"
        required
      />
      <VaButton type="submit" color="primary">Submit</VaButton>
    </VaForm>
  </VaModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { VaButton, VaInput } from 'vuestic-ui';

const apiKey = ref('');
const isModalOpen = ref(false);

// Emit event to notify the parent component that the API key has been added
const emit = defineEmits(['api-key-added']);

// Watch the prop 'show' to control when to open/close the modal
const props = defineProps({
  show: Boolean,
});

watch(
  () => props.show,
  (newVal) => {
    isModalOpen.value = newVal;
  }
);

// Handle form submission
const handleFormSubmit = () => {
  if (apiKey.value) {
    localStorage.setItem('api-key', apiKey.value);
    emit('api-key-added', apiKey.value); // Notify parent with the new API key
    isModalOpen.value = false; // Close the modal
  }
};
</script>

<style scoped>
/* Add your custom styles here */
.api-key-modal {
  margin-top: 60px;
  text-align: left;
}

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
