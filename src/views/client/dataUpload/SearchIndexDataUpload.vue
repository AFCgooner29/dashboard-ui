<template>
    <va-card>
        <h3>Manage Search Index Data Upload</h3>

        <!-- Template Download Section -->
        <section>
            <div class="form-group">
                <va-select v-model="selectedType" :options="fileTypes" label="Select Template Type"
                    placeholder="Select file type for template" />
            </div>
            <div class="form-group">
                <VaSelect v-model="indexName" :options="indexNames" label="Index"
                    placeholder="Select an option" />
            </div>
            <div class="form-group">
                <va-button @click="downloadTemplate" color="primary" :loading="isDownloading">
                    Download Template
                </va-button>
            </div>
        </section>

        <va-divider />

        <!-- File Upload Section -->
        <section>
            <div class="form-group">
                <va-file-upload v-model="file" label="Select File" accept=".csv, .xlsx"
                    placeholder="Choose a CSV or Excel file" style="z-index: 0;" />
            </div>
            <div class="form-group">
                <VaSelect v-model="uploadIndexName" :options="indexNames" label="Index"
                    placeholder="Select an option" />

            </div>
            <div class="form-group">
                <va-button @click="uploadFile" color="primary" :loading="isUploading">
                    Process
                </va-button>
            </div>
        </section>
    </va-card>
</template>

<script>
import { ref } from 'vue';
import { VaSelect } from 'vuestic-ui/web-components';
import { useFetch } from "../../../util/useFetch.js";


const apiPrefix = process.env.VUE_APP_API_PREFIX;


export default {
    setup() {
        const indexName = ref('');
        const uploadIndexName = ref('');
        const selectedType = ref('csv');
        const file = ref([]);
        const isDownloading = ref(false);
        const isUploading = ref(false);
        const indexNames = ref([]);

        const fileTypes = [
            { value: 'CSV', text: 'csv' },
            { value: 'Excel', text: 'excel' },
        ];
        indexNames.value = localStorage.getItem('userIndexes').split(",");
        const downloadTemplate = async () => {
            if (!indexName.value) {
                alert('Please enter an index name.');
                return;
            }
            isDownloading.value = true;
            const url = apiPrefix + `auth/admin/manage/searchIndex/upload/${indexName.value}/download-template?type=${selectedType.value}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('userSession')}` }, // Add auth token if required
                });
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${indexName.value}_template.${selectedType.value === 'excel' ? 'xlsx' : 'csv'}`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (error) {
                alert('Failed to download template.');
            } finally {
                isDownloading.value = false;
            }
        };

        const uploadFile = async () => {
            if (!uploadIndexName.value || !file.value) {
                alert('Please enter an index name and select a file.');
                return;
            }
            isUploading.value = true;
            const formData = new FormData();
            formData.append('file', file.value[0]);

            try {
                const data = await fetch(new Request(
                    apiPrefix + `auth/admin/manage/searchIndex/upload/${uploadIndexName.value}/upload`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('userSession')}`
                        },
                        body: formData,
                    }
                ));
                if (data.ok) {
                    alert('Upload complete');
                } else {
                    alert('Upload Failed Index and file not matching');
                }
            } catch (error) {
                alert('File upload failed. Please check the file type and try again.');
                console.error(error);
            } finally {
                isUploading.value = false;
            }
        };

        return {
            indexName,
            uploadIndexName,
            selectedType,
            file,
            fileTypes,
            isDownloading,
            isUploading,
            downloadTemplate,
            uploadFile,
            indexNames,
        };
    },
};
</script>
<style lang="css" scoped>
.form-group {
    margin-bottom: 1em;
}

.multi-entry-group {
    margin-top: 1em;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.multi-entry-item {
    padding: 1em;
    border: 1px solid #ddd;
    margin-bottom: 1em;
    border-radius: 4px;
}

.nested-field {
    padding-left: 1em;
    margin-bottom: 0.5em;
}
</style>