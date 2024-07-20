import { defineStore } from "pinia";

export const DocumentBuilderStore = defineStore("documentBuilder",() => {
//   import { ref } from "vue";
//   import { useFetch } from "../../../util/useFetch";

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

  const toggleSection = (section) => {
    section.value.enabled = !section.value.enabled;
  };

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

  const Submit = () => {
    const requestObj = new Request("/auth/admin/ingest/v1/relevance/doc", {
      method: "POST",
      headers: {
        API_KEY: "d4b719f6-02b9-4ae1-bc0a-1b4d83eedba2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    });

    try {
      const response = useFetch(requestObj);
      if (response) {
        alert("Document submitted");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { message, enterpriseId, document }
});
