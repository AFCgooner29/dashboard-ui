<template>
  <VaInput
      v-model="documentBuilderStore.enterpriseId"
      class="mb-6"
      :messages="documentBuilderStore.message"
      label="Enterprise ID:"
      placeholder="Enter Enterprise ID"
      style="margin-top: 6px; width: 80%"
    />

    <!-- Document Name Input -->
    <VaInput
      v-model="documentBuilderStore.document.documentName"
      class="mb-6"
      :messages="documentBuilderStore.message"
      label="Document Name:"
      placeholder="Enter Document Name:"
      style="margin-top: 6px; width: 80%"
    />
</template>

<script setup>
import { useDocumentBuilder } from "@/stores/client/DocumentBuilderStore";
const documentBuilderStore = useDocumentBuilder();
</script>

<style>

</style>