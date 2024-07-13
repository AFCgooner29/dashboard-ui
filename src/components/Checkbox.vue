<template>
  <VaCheckbox
    class="mb-6"
    color="primary"
    :label="props.label"
    style="margin-top: 6px"
    @change="handleChange"
  />
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({ label: String, toggler: Function });
const handleChange = () => {
  // Call the parent toggler function
  props.toggler();
};
</script>
