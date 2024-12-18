<template>
    <div class="plans-section">
        <h2 class="plans-section__title">Choose Your Plan</h2>
        <div class="plans-cards">
            <va-card v-for="(plan, index) in plans" :key="index"
                :class="['plan-card', { 'plan-card--highlight': plan.isValueForMoney }]" outlined>
                <div class="plan-card__header">
                    <span class="plan-card__title">{{ plan.name }}</span>
                    <va-badge v-if="plan.isValueForMoney" color="orange" text="Great Value" />
                    <va-badge v-if="plan.isGreatStarter" color="orange" text="Good to Start" />
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
                    pinnedFeatures: [
                        "Index Size Upto 1 GB",
                        "Max 1 Index allowed",
                        "No Support Plan included",
                        "Inactivity Limit 30 Days",
                        "Limited to 3 Requests Per Second",
                        "Hosting Locations - APAC South"],
                    features: [
                        "Filtering & Faceting",
                    ],
                },
                {
                    name: "Grow",
                    price: "$599/month (excl Taxes)",
                    subHeader: "Leveling Up the Experience",
                    pinnedFeatures: [
                        "Index Size Upto 15 GB",
                        "Max 1 Index allowed",
                        "Upto 30 Rules allowed",
                        "Upto 100 Smart Synonyms Allowed",
                        "Standard Support Plan included",
                        "Limited to 10 Requests Per Second",
                        "Hosting Locations - APAC South"],
                    features: [
                        "Context based Rules",
                        "Smart Synonyms",
                        "Filtering & Faceting",
                        "Easy High Availability",
                        "Relevance Pruning",
                    ],
                    isGreatStarter: true,
                },
                {
                    name: "Establish",
                    price: "$4499/month (excl Taxes)",
                    subHeader: "All the Features for your Establishment",
                    pinnedFeatures: [
                        "Index Size Upto 30 GB",
                        "Max 3 Indexes allowed",
                        "Upto 100 Rules allowed",
                        "Upto 800 Smart Synonyms Allowed",
                        "Record max size 50KB",
                        "Extended Support Plan included",
                        "Limited to 100 Requests Per Second",
                        "Hosting Locations - APAC South"
                    ],
                    features: [
                        "Context based Rules",
                        "Smart Synonyms",
                        "Filtering & Faceting",
                        "Easy High Availability",
                        "Relevance Pruning",
                        "Dynamic Sorting",
                        "Typo Tolerance"
                    ],
                    isValueForMoney: true,
                },
                {
                    name: "Enterprise",
                    subHeader: "Sophisticated Service for your business",
                    price: "Contact for Pricing",
                    pinnedFeatures: [
                        "Index Size Upto 60 GB",
                        "Max 5 Indexes allowed",
                        "Upto 500 Rules allowed",
                        "Upto 2000 Smart Synonyms Allowed",
                        "Record max size 50KB",
                        "Extended Support Plan included",
                        "Limited to 300 Requests Per Second",
                        "Hosting Locations - Global"],
                    features: [
                        "Filtering & Faceting",
                        "Tunable Ranking",
                        "Context based Rules",
                        "Smart Synonyms",
                        "Dynamic Sorting",
                        "Typo Tolerance",
                        "Easy High Availability",
                        "Browse API",
                        "Smart Filters",
                        "Relevance Pruning",
                    ],
                },
                {
                    name: "Professional",
                    subHeader: "All the tools to be global",
                    price: "Contact for Pricing",
                    pinnedFeatures: [
                        "Index Size Upto 100 GB",
                        "Max 20 Indexes allowed",
                        "Upto 3000 Rules allowed",
                        "Upto 10000 Smart Synonyms Allowed",
                        "Record max size 50KB",
                        "Extended Support Plan included",
                        "Limited to 500 Requests Per Second",
                        "Hosting Locations - Global"],
                    features: [
                        "Typo Tolerance",
                        "Tunable Ranking",
                        "Context based Rules",
                        "Smart Synonyms",
                        "Multi-tenant API Keys",
                        "Dynamic Sorting",
                        "Filtering & Faceting",
                        "Vector & Semantic Search",
                        "Easy High Availability",
                        "AI Generated Smart Synonyms",
                        "AI Generated Rules",
                        "Browse API",
                        "Smart Filters",
                        "Smart Reranking",
                        "AI Generated Smart Synonyms",
                        "AI Generated Rules",
                        "Relevance Pruning",
                    ],
                },
            ],
            features: [
                "Filtering & Faceting",
                "Easy High Availability",
                "Context based Rules",
                "Smart Synonyms",
                "Relevance Pruning",
                "Typo Tolerance",
                "Dynamic Sorting",
                "Tunable Ranking",
                "Smart Filters",
                "Browse API",
                "AI Generated Smart Synonyms",
                "AI Generated Rules",
                "Vector & Semantic Search",
                // "Smart Reranking",
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
    width: 18%;
    height: 100%;
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
@media (max-width: 768px) {

.plan-card {
    width: 80%;
}

}
</style>