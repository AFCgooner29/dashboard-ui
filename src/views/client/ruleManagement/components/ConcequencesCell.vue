<template>
    <div v-for="(consequence, index) in rowData[fieldKey].slice(0, 2)" :key="index">
    {{ consequence["attributeName"] }} <VaIcon name="arrow_forward" /> {{ storedToDisplayMapping[consequence["consequenceType"]] }} <VaIcon name="arrow_forward" /> {{ consequence["attributeValue"] }}
    </div>
    <span v-if="rowData[fieldKey].length > 2">...</span>
</template>

<script>
export default {
  props: ['rowData', 'fieldKey', 'storedToDisplayMapping'],
};
</script>