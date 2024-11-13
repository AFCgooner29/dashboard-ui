<template>
    <va-card class="table-card">
        <div class="header">
            <h2>Customer Management</h2>
            <VaButton v-if="isPlatformAdmin" class="mr-6 mb-2" ><RouterLink :to="{ name: 'onboard-customer' }" style="color:white; text-decoration:none;">Onboard New Customer</RouterLink></VaButton>
        </div>

        <VaDataTable :items="customers" :columns="fields" striped>
            <template v-if="isPlatformAdmin" #cell(actions)="{ rowIndex }">
                <VaButton
                    preset="plain"
                    icon="edit"
                    @click="openModalToEditItemById(rowIndex)"
                    label="Edit"
                />
                <VaButton
                    preset="plain"
                    icon="cancel"
                    class="ml-3"
                    @click="deleteItemById(rowIndex)"
                    label="Disable"
                />
            </template>
        </VaDataTable>
    </va-card>
</template>

<script>
import { VaDataTable, VaButton } from 'vuestic-ui';

export default {
    components: { VaDataTable, VaButton },
    data() {
        return {
            fields: [
                { key: 'customerId', label: 'Customer ID' },
                { key: 'name', label: 'Name' },
                { key: 'customerAddress', label: 'Address' },
                { key: 'subscriptionTypeId', label: 'Subscription Type' },
                { key: 'enabled', label: 'Status' },
                { key: 'actions', label: 'Actions' },
            ],
            customers: [],
        };
    },
    computed: {
        isPlatformAdmin() {
            return true;
        },
    },
    methods: {
        fetchCustomers() {
            // API call to fetch the list of customers
            // fetch('/auth/admin/manage/customer/list')
            //     .then((response) => response.json())
            //     .then((data) => (this.customers = data));
            this.customers = [
                {
                    "customerId" : "123",
                    "name" : "Dukaan",
                    "customerAddress" : "Ludhiana",
                    "subscriptionTypeId" : "1234",
                    "enabled" : true,
                },
                {
                    "customerId" : "123",
                    "name" : "Dukaan",
                    "customerAddress" : "Ludhiana",
                    "subscriptionTypeId" : "1234",
                    "enabled" : true,
                },
            ]
        },
        disableCustomer(customerId) {
            // API call to disable a customer
            fetch(`/auth/admin/manage/customer/disable/${customerId}`, {
                method: 'PUT',
            }).then(() => this.fetchCustomers());
        },
        upgradeCustomer(customerId) {
            const subscriptionTypeId = prompt("Enter new subscription type ID:");
            if (subscriptionTypeId) {
                // API call to upgrade a customer's subscription
                fetch(`/auth/admin/manage/customer/upgrade/${customerId}?subscriptionTypeId=${subscriptionTypeId}`, {
                    method: 'GET',
                }).then(() => this.fetchCustomers());
            }
        },
        goToOnboardCustomer() {
            this.$router.push('/onboard-customer');
        },
    },
    mounted() {
        this.fetchCustomers();
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>