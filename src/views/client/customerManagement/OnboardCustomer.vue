<template>
    <va-card>
        <h2>Onboard New Customer</h2>
        <form @submit.prevent="onboardCustomer">
            <va-input v-model="customer.name" label="Name" required />
            <va-input v-model="customer.customerAddress" label="Address" required />
            <va-input v-model="customer.subscriptionTypeId" label="Subscription Type ID" required />
            <va-input v-model="customer.subscriptionStart" label="Subscription Start" type="date" required />
            <va-input v-model="customer.subscriptionEnds" label="Subscription End" type="date" required />
            <va-button type="submit" color="primary">Submit</va-button>
        </form>
    </va-card>
</template>

<script>
import { VaInput, VaButton } from 'vuestic-ui';

export default {
    components: { VaInput, VaButton },
    data() {
        return {
            customer: {
                name: '',
                customerAddress: '',
                subscriptionTypeId: '',
                subscriptionStart: '',
                subscriptionEnds: '',
            },
        };
    },
    methods: {
        onboardCustomer() {
            fetch('/auth/admin/manage/customer/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.customer),
            }).then(() => {
                this.$router.push('/customer-management'); // Redirect back to customer list
            });
        },
    },
};
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>