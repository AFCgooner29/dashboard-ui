<template>
    <div v-if="rowData[fieldKey]" v-for="(ruleCondition, index) in rowData[fieldKey].slice(0, 2)" :key="index">
    {{ storedToDisplayMapping[ruleCondition["operator"]] }} <VaIcon name="arrow_forward" /> {{ ruleCondition["value"] }}
    </div>
    <span v-if="rowData[fieldKey] && rowData[fieldKey].length > 2">...</span>
</template>

<script>
export default {
  props: ['rowData', 'fieldKey', 'storedToDisplayMapping'],
};
</script>