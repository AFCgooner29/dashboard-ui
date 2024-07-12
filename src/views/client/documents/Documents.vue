<template>
  <VaForm ref="formRef" class="flex flex-col items-baseline gap-6" style="box-sizing: border-box; margin: 20px;">
    <h1 class="mb-4">Document Builder</h1>

    <!-- Enterprise ID Input -->
    <VaInput
      v-model="enterpriseId"
      class="mb-6"
      :messages="message"
      label="Enterprise ID:"
      placeholder="Enter Enterprise ID"
      style="margin-top: 6px; width: 80%"
    />

    <!-- Document Name Input -->
    <VaInput
      v-model="document.documentName"
      class="mb-6"
      :messages="message"
      label="Document Name:"
      placeholder="Enter Document Name:"
      style="margin-top: 6px; width: 80%"
    />
    <VaDivider />
    <!-- Chapters Section -->
    <div
      v-for="(chapter, chapterIndex) in document.chapters"
      :key="chapterIndex"
      id="chapterList"
      class="container-fluid"
      style="width: 70%"
    >
      <VaButton
        @click="removeChapter(chapterIndex)"
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
        :messages="message"
        label="Chaper name:"
        placeholder="Enter Chaper name"
        style="margin-top: 6px; width: 80%"
      />
      <!-- Section Area -->
      <div
        v-for="(section, sectionIndex) in chapter.sections"
        :key="sectionIndex"
        class="container-fluid"
        style="width: 70%"
      >
        <VaButton
          color="danger"
          class="mr-6 mb-2"
          @click="removeSection(chapterIndex, sectionIndex)"
          style="margin-top: 6px"
        >
          Delete Section Below
        </VaButton>
        <VaInput
          v-model="section.sectionName"
          class="mb-6"
          :messages="message"
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
          @change="section.enabled = !section.enabled"
        />
      </div>

      <VaButton
        @click="addSection(chapterIndex)"
        preset="primary"
        class="mr-6 mb-2"
        style="margin-top: 6px"
      >
        Add Section
      </VaButton>
    </div>

    <!-- Add Chapter Button -->
    <VaButton
      @click="addChapter"
      preset="primary"
      class="mr-6 mb-2"
      style="margin-top: 6px"
    >
      Add Chapter
    </VaButton>
    <div class="">
      <!-- Build Payload & Submit Button -->
      <VaButton @click="Submit" color="info" gradient class="mr-6 mb-2">
        Build Payload & Submit
      </VaButton>
    </div>
  </VaForm>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Required Field");

const enterpriseId = ref();
const document = ref({
  documentName: "",
  documentType: "",
  chapters: [
    {
      chapterName: "",
      sections: [
        {
          sectionName: "",
          sectionDocTextBody: "",
          enabled: false,
        },
      ],
    },
  ],
});

const addChapter = () => {
  document.value.chapters.push({
    chapterName: "",
    sections: [
      {
        sectionName: "",
        sectionDocTextBody: "",
        enabled: false,
      },
    ],
  });
};

const removeChapter = (chapterIndex) => {
  if (chapterIndex < document.value.chapters.length) {
    document.value.chapters.splice(chapterIndex, 1);
  }
};

const addSection = (chapterIndex) => {
  if (chapterIndex < document.value.chapters.length) {
    document.value.chapters[chapterIndex].sections.push({
      sectionName: "",
      sectionDocTextBody: "",
      enabled: true,
    });
  }
};

const removeSection = (chapterIndex, sectionIndex) => {
  if (
    chapterIndex < document.value.chapters.length &&
    sectionIndex < document.value.chapters[chapterIndex].sections.length
  ) {
    document.value.chapters[chapterIndex].sections.splice(sectionIndex, 1);
  }
};

// Apis to server.
const Submit = () => {
  console.log(document.value);
};
</script>

<style></style>
