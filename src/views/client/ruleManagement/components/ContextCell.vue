<template>
    <div>
      <div v-if="rowData[fieldKey]" v-for="(context, index) in rowData[fieldKey].slice(0, 2)" :key="index">
        {{ context.key }} <VaIcon name="arrow_forward" /> {{ context.value }}
      </div>
      <span v-if="rowData[fieldKey] && rowData[fieldKey].length > 2">...</span>
    </div>
  </template>
  
  <script>
  export default {
    props: ['rowData', 'fieldKey'],
  };
  </script>
  