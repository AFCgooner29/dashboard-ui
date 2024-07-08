<template>
  <div class="container mt-5">
    <h1 class="mb-4">Document Builder</h1>

    <!-- Enterprise ID Input -->
    <div class="form-group">
      <label for="customerId">Enterprise ID:</label>
      <input type="text" class="form-control" id="customerId" />
    </div>

    <!-- Document Name Input -->
    <div class="form-group">
      <label for="documentName">Document Name:</label>
      <input type="text" class="form-control" id="documentName" />
    </div>

    <!-- Chapters Section -->
    <div
      v-for="(chapter, chapterIndex) in document.chapter"
      :key="chapterIndex"
      id="chapterList"
    >
      <label for="chapterName">Chaper name</label>
      <input type="text" class="form-control" />

      <!-- Section Area -->
      <div v-for="section in sectionCount" :key="section" class="sectionList">
        <label for="sectionName">Section name</label>
        <input type="text" class="form-control" />
      </div>

      <button @click="sectionCount++" class="btn btn-success m-2">
        Add section
      </button>
      <button class="btn btn-primary m-2">Save chapter</button>
      <button @click="chapterCount--" class="btn btn-danger m-2">
        remove chapter
      </button>
    </div>

    <!-- Add Chapter Button -->
    <button @click="chapterCount++" type="button" class="btn btn-primary m-3">
      Add Chapter
    </button>

    <!-- Build Payload & Submit Button -->
    <button type="button" class="btn btn-success m-3">
      Build Payload & Submit
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const chapter = {
  chapterName: "",
  sections: [],
};

const section = {
  sectionName: "",
  sectionDocTextBody: "",
  enabled: "",
};

const EnterpriseId = ref("");
const document = reactive({
  documentName: "",
  documentType: "",
  chapters: [
    {
      chapterName: "",
      sections: [
        {
          sectionName: "",
          sectionDocTextBody: "",
          enabled: true,
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
        enabled: true,
      },
    ],
  });
};

const addSection = (chapterIndex) => {
  if (chapterIndex < document.chapter.length) {
    document.value.chapters[chapterIndex].section.push({
      sectionName: "",
      sectionDocTextBody: "",
      enabled: true,
    });
  }
};
</script>

<style></style>
