<template>
  <VaTextarea
    :value="props.input"
    label="Your Question"
    counter
    style="width: 100%; margin-top: 6px"
  />
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  input: String,
});

</script>

<style></style>
