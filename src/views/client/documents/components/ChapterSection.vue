<template>
  <div
    v-for="(chapter, chapterIndex) in documentBuilderStore.document.chapters"
    :key="chapterIndex"
    id="chapterList"
    class="container-fluid"
    style="width: 70%"
  >
    <VaButton
      @click="documentBuilderStore.removeChapter(chapterIndex)"
      color="danger"
      gradient
      class="mr-6 mb-2"
      style="margin-top: 6px"
    >
      Remove Chapter Below </VaButton
    ><br />
    <VaInput
      v-model="chapter.chapterName"
      class="mb-6"
      :messages="documentBuilderStore.message"
      label="Chaper name:"
      placeholder="Enter Chaper name"
      style="margin-top: 6px; width: 80%"
    />
    <!-- Section Area -->
    <SectionInput :chapter="chapter" :chapterIndex="chapterIndex" />

    <VaButton
      @click="documentBuilderStore.addSection(chapterIndex)"
      preset="primary"
      class="mr-6 mb-2"
      style="margin-top: 6px"
    >
      Add Section
    </VaButton>
  </div>
</template>

<script setup>
import SectionInput from "./SectionInput.vue";
import { useDocumentBuilder } from "@/stores/client/DocumentBuilderStore";
const documentBuilderStore = useDocumentBuilder();

</script>

<style></style>
