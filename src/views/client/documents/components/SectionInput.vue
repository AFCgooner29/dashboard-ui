<template>
  <div
    v-for="(section, sectionIndex) in props.chapter.sections"
    :key="sectionIndex"
    class="container-fluid"
    style="width: 70%"
  >
    <VaButton
      color="danger"
      class="mr-6 mb-2"
      @click="documentBuilderStore.removeSection(chapterIndex, sectionIndex)"
      style="margin-top: 6px"
    >
      Delete Section Below
    </VaButton>
    <VaInput
      v-model="section.sectionName"
      class="mb-6"
      :messages="documentBuilderStore.message"
      label="Section name:"
      placeholder="Enter Section name"
      style="margin-top: 6px; width: 80%"
    />
    <VaTextarea
      v-model="section.sectionDocTextBody"
      max-length="200"
      label="Section text"
      counter
      required-mark
      :rules="[
        (v) => (v && v.length > 5) || 'Min length 5',
        (v) => (v && v.length < 200) || 'Max length 200',
      ]"
      style="display: block"
    />
    <VaCheckbox
      v-model="section.enabled"
      label="Enabled"
      style="display: block"
      @change="toggleSection(section)"
    />
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import { useDocumentBuilder } from "@/stores/client/DocumentBuilderStore";
const documentBuilderStore = useDocumentBuilder();

const props = defineProps(['chapter', 'chapterIndex']);
</script>

<style></style>
