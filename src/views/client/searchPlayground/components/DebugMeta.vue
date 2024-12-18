<template>
    <div class="debug-meta-container">
        <!-- Section for Synonyms -->
        <section class="synonyms-section" v-if="debugMeta">
            <h3>Synonyms Included in Query</h3>
            <ul v-if="debugMeta.synonymIncludedTerms?.length">
                <li v-for="(term, index) in debugMeta.synonymIncludedTerms" :key="index">
                    {{ term }}
                </li>
            </ul>
            <p v-else>No synonyms included.</p>
        </section>

        <!-- Section for Rules -->
        <section class="rules-section" v-if="debugMeta">
            <h3>Rule Information</h3>
            <div v-if="debugMeta.rule">
                <p><strong>Rule ID:</strong> {{ debugMeta.rule.ruleId }}</p>
                <p><strong>Conditions:</strong></p>
                <ul>
                    <li v-for="(condition, index) in debugMeta.rule.ruleConditions" :key="index">
                        {{ storedToDisplayMapping[condition.operator] }} <VaIcon name="arrow_forward" /> {{ condition.value }}
                        <div>
                            Typos Allowed : {{ condition.allowTypos }}
                        </div>
                    </li>
                </ul>
                <p><strong>Consequences:</strong></p>
                <ul>
                    <li v-for="(consequence, index) in debugMeta.rule.consequences" :key="index">
                        {{  consequence.attributeName }} <VaIcon name="arrow_forward" /> {{ storedToDisplayMapping[consequence.consequenceType] }} <VaIcon name="arrow_forward" /> {{ consequence.attributeValue }}
                    </li>
                </ul>
            </div>
            <p v-else>No rule information available.</p>
        </section>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

// Accept the debugMeta prop
defineProps({
    debugMeta: {
        type: Object,
        required: true
    },
    storedToDisplayMapping: {
        type: Object,
        required: true
    }
});
</script>
<style scoped>
.debug-meta-container {
    font-family: Arial, sans-serif;
    padding: 1rem;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
}

section {
    margin-bottom: 1.5rem;
}

h3 {
    margin-bottom: 0.5rem;
    color: #333;
}

ul {
    list-style-type: disc;
    padding-left: 20px;
}

p {
    color: #555;
}
</style>