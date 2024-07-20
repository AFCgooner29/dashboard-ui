<template>
  <VaForm
    ref="formRef"
    class="flex flex-col items-baseline gap-6"
    style="box-sizing: border-box; margin: 50px; margin-top: 100px"
  >
    <h1 class="mb-4">Document Builder</h1>

    <!-- Enterprise ID Input -->
    <DocBuilderHeader />
    <VaDivider />

    <!-- Chapters Section -->
    <ChapterSection />
    <!-- Add Chapter Button -->
    <VaButton
      @click="documentBuilderStore.addChapter"
      preset="primary"
      class="mr-6 mb-2"
      style="margin-top: 6px"
    >
      Add Chapter
    </VaButton>
    <div>
      <!-- Build Payload & Submit Button -->
      <VaButton @click="documentBuilderStore.Submit" color="info" gradient class="mr-6 mb-2">
        Build Payload & Submit
      </VaButton>
    </div>
  </VaForm>
</template>

<script setup>
import { useDocumentBuilder } from "@/stores/client/DocumentBuilderStore";
import DocBuilderHeader from "./components/DocBuilderHeader.vue";
import ChapterSection from "./components/ChapterSection.vue";
const documentBuilderStore = useDocumentBuilder();


// Apis to server.
</script>

<style></style>
