<template>
    <va-dialog v-model="isVisible" persistent>
        <template #title>
            Unauthorized
        </template>
        <template #default>
            <div>You are not authorized to view or modify this data.</div>
        </template>
        <template #footer>
            <va-button @click="close" color="primary">Close</va-button>
        </template>
    </va-dialog>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false,
        };
    },
    methods: {
        close() {
            this.isVisible = false;
        },
        showModal() {
            this.isVisible = true;
        },
    },
};
</script>