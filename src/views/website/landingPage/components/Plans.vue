<template>
    <div class="plans-section">
        <h2 class="plans-section__title">Choose Your Plan</h2>
        <div class="plans-cards">
            <va-card v-for="(plan, index) in plans" :key="index"
                :class="['plan-card', { 'plan-card--highlight': plan.isValueForMoney }]" outlined>
                <div class="plan-card__header">
                    <span class="plan-card__title">{{ plan.name }}</span>
                    <va-badge v-if="plan.isValueForMoney" color="orange" text="Great Value" />
                </div>
                <div class="plan-card__header" v-if="plan.subHeader">
                    <span class="plans-section__sub_title">{{ plan.subHeader }}</span>
                </div>
                <div class="plan-card__price">{{ plan.price }}</div>
                <ul class="plan-card__features">
                    <li v-for="(feature, idx) in plan.pinnedFeatures" :key="pinnedFeatures + '_' + idx">
                        <va-icon name='star' />
                        <span>{{ feature }}</span>
                    </li>
                    <li v-for="(feature, idx) in features" :key="idx">
                        <va-icon :name="plan.features.includes(feature) ? 'check' : 'close'" />
                        <span>{{ feature }}</span>
                    </li>
                </ul>
                <va-button color="primary" class="plan-card__button" @click="showModal(plan.name)">Choose
                    Plan</va-button>
            </va-card>
        </div>
    </div>
    <ContactModal v-model="showContactModal" :message-text="messageText" />
</template>
<script>
import ContactModal from '../components/ContactModal.vue';

export default {
    components: { ContactModal },
    data() {
        return {
            messageText: "",
            plans: [
                {
                    name: "Build",
                    price: "Free",
                    subHeader: "Start of something special",
                    pinnedFeatures: ["Data Upto 100 Documents", "Max 1 Index allowed"],
                    features: [
                        "Filtering & Faceting",
                    ],
                },
                {
                    name: "Grow",
                    price: "$199/month",
                    subHeader: "Leveling Up the Experience",
                    pinnedFeatures: ["Data Upto 5000 Documents", "Max 1 Index allowed", "Upto 5 Rules allowed", "Upto 5 Synonyms Allowed"],
                    features: [
                        "Context based Rules",
                        "Synonyms",
                        "Filtering & Faceting",
                        "Easy High Availability",
                    ],
                },
                {
                    name: "Establish",
                    price: "$999/month",
                    subHeader: "All the Features for your Establishment",
                    pinnedFeatures: ["Data Upto 100K Documents", "Max 3 Indexes allowed", "Upto 20 Rules allowed", "Upto 20 Synonyms Allowed"],
                    features: [
                        "Filtering & Faceting",
                        "Tunable Ranking",
                        "Context based Rules",
                        "Synonyms",
                        "Dynamic Sorting",
                        "Typo Tolerance",
                        "Easy High Availability",
                        "AI Generated Synonyms",
                        "AI Generated Rules",
                        "Relevance Pruning",
                    ],
                    isValueForMoney: true,
                },
                {
                    name: "Enterprise",
                    subHeader: "Sophisticated Service for your business",
                    price: "Contact for Pricing",
                    pinnedFeatures: ["Data Upto 1M Documents", "Max 5 Indexes allowed", "Upto 100 Rules allowed", "Upto 100 Synonyms Allowed"],
                    features: [
                        "Filtering & Faceting",
                        "Tunable Ranking",
                        "Context based Rules",
                        "Synonyms",
                        "Dynamic Sorting",
                        "Typo Tolerance",
                        "Easy High Availability",
                        "Browse API",
                        "Smart Filters",
                        "AI Generated Synonyms",
                        "AI Generated Rules",
                        "Relevance Pruning",
                    ],
                },
                {
                    name: "Professional",
                    subHeader: "All the tools to be global",
                    price: "Contact for Pricing",
                    pinnedFeatures: ["Data Upto 100M Documents", "Max 20 Indexes allowed", "Upto 1000 Rules allowed", "Upto 1000 Synonyms Allowed"],
                    features: [
                        "Typo Tolerance",
                        "Tunable Ranking",
                        "Context based Rules",
                        "Synonyms",
                        "Multi-tenant API Keys",
                        "Dynamic Sorting",
                        "Filtering & Faceting",
                        "Vector & Semantic Search",
                        "Easy High Availability",
                        "AI Generated Synonyms",
                        "AI Generated Rules",
                        "Browse API",
                        "Smart Filters",
                        "Smart Reranking",
                        "AI Generated Synonyms",
                        "AI Generated Rules",
                        "Relevance Pruning",
                    ],
                },
            ],
            features: [
                "Filtering & Faceting",
                "Easy High Availability",
                "Context based Rules",
                "Synonyms",
                "Relevance Pruning",
                "Typo Tolerance",
                "Dynamic Sorting",
                "Tunable Ranking",
                "AI Generated Synonyms",
                "AI Generated Rules",
                "Smart Filters",
                "Browse API",
                "Vector & Semantic Search",
                "Smart Reranking",
            ],
            showContactModal: false,
        };
    },
    methods: {
        showModal(planName) {
            this.messageText = `I want to transform my search experience on my application, and I am interested in ${planName} Plan, Can we schedule a Quick Meeting to discuss it further.`;
            this.showContactModal = true;
        },
    },
};
</script>

<style scoped>
.plans-section {
    text-align: center;
    padding: 2rem;
}

.plans-section__title {
    font-size: 2rem;
    margin-bottom: 2rem;
}

.plans-section__sub_title {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.plans-cards {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.plan-card {
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 10px;
    transition: transform 0.3s, border-color 0.3s;
}

.plan-card--highlight {
    border-color: orange;
    transform: scale(1.05);
}

.plan-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.plan-card__title {
    font-size: 1.5rem;
    font-weight: bold;
}

.plan-card__price {
    font-size: 1.25rem;
    margin: 1rem 0;
    font-weight: bold;
}

.plan-card__features {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
    text-align: left;
}

.plan-card__features li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.plan-card__features va-icon {
    margin-right: 0.5rem;
    color: green;
}

.plan-card__features va-icon[name="close"] {
    color: red;
}

.plan-card__button {
    width: 100%;
}
</style>