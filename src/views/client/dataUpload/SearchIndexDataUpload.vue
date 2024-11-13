<template>
    <va-card>
        <h3>Manage Search Index Data Upload</h3>

        <!-- Template Download Section -->
        <section>
            <va-select v-model="selectedType" :options="fileTypes" label="Select Template Type"
                placeholder="Select file type for template" />
            <va-input v-model="indexName" label="Index Name" placeholder="Enter index name" />
            <va-button @click="downloadTemplate" color="primary" :loading="isDownloading">
                Download Template
            </va-button>
        </section>

        <va-divider />

        <!-- File Upload Section -->
        <section>
            <va-file-upload v-model="file" label="Upload File" accept=".csv, .xlsx"
                placeholder="Choose a CSV or Excel file" />
            <va-input v-model="uploadIndexName" label="Index Name" placeholder="Enter index name" />
            <va-button @click="uploadFile" color="primary" :loading="isUploading">
                Upload File
            </va-button>
        </section>
    </va-card>
</template>

<script>
import { ref } from 'vue';
import { useAxios } from '@vueuse/integrations/useAxios';

export default {
    setup() {
        const indexName = ref('');
        const uploadIndexName = ref('');
        const selectedType = ref('csv');
        const file = ref(null);
        const isDownloading = ref(false);
        const isUploading = ref(false);

        const fileTypes = [
            { label: 'CSV', value: 'csv' },
            { label: 'Excel', value: 'excel' },
        ];

        const downloadTemplate = async () => {
            if (!indexName.value) {
                alert('Please enter an index name.');
                return;
            }
            isDownloading.value = true;
            const url = `/auth/admin/manage/searchIndex/upload/${indexName.value}/download-template?type=${selectedType.value}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer your-token-here' }, // Add auth token if required
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
            formData.append('file', file.value);

            try {
                const { data } = await useAxios().post(
                    `/auth/admin/manage/searchIndex/upload/${uploadIndexName.value}/upload`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer your-token-here' } }
                );
                alert(data);
            } catch (error) {
                alert('File upload failed. Please check the file type and try again.');
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
        };
    },
};
</script>