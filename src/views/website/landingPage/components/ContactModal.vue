<template>
    <VaModal v-model:modelValue="localIsVisible" hide-default-actions size="medium">
        <template #header>
            <div class="modal-header">
                <h2>Let's take this forward</h2>
            </div>
        </template>
        <VaForm class="contact-form">
            <VaInput v-model="form.name" label="Your Name" placeholder="Enter your name" :error="nameError"
                error-messages="Name is required" />
            <VaInput v-model="form.email" label="Email" placeholder="Enter your email" type="email" :error="emailError"
                error-messages="Email is required" />
            <VaInput v-model="form.telephone" label="Contact No" placeholder="Enter your contact" type="tel" />
            <VaTextarea v-model="form.message" label="Message" placeholder="Enter your message" :error="messageError"
                error-messages="Message is required" />
        </VaForm>
        <template #footer>
            <VaButton color="primary" class="contact-sbt-btn" type="submit" @click="handleSubmit">Submit</VaButton>
            <VaButton class="contact-sbt-btn" color="primary" @click="closeModal">Close</VaButton>
        </template>
    </VaModal>
</template>

<script>
import { VaModal, VaInput, VaTextarea, VaButton, VaForm, VaAlert } from "vuestic-ui";

const apiPrefix = process.env.VUE_APP_API_PREFIX;
const demoApiKey = process.env.VUE_APP_DEMO_API_KEY;


export default {
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        messageText: {
            type: String,
            required: false,
            default: "",
        }
    },
    components: { VaModal, VaInput, VaTextarea, VaButton, VaForm, VaAlert },
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: this.messageText,
                telephone: "",
            },
            localIsVisible: this.modelValue, // Local reactive copy
            nameError: false,
            emailError: false,
            messageError: false,
            successMessage: "",
            errorMessage: "",
        };
    },
    watch: {
        modelValue(newValue) {
            this.localIsVisible = newValue;
        },
        localIsVisible(newValue) {
            this.$emit("update:modelValue", newValue);
        },
        messageText: {
            immediate: true,
            handler(newValue) {
                this.form.message = newValue;
            },
        },
    },
    methods: {
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        async handleSubmit() {
            // Reset error states
            this.nameError = !this.form.name;
            this.emailError = !this.form.email || !this.validateEmail(this.form.email);
            this.messageError = !this.form.message;

            // Check if the form is valid
            if (this.nameError || this.emailError || this.messageError) {
                alert("Required Fields are not filled");
                return;
            }

            try {
                const response = await fetch(apiPrefix + "auth/api/contact/submit", {
                    method: "POST",
                    headers: {
                        "API-KEY": demoApiKey,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.form),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Submitted Successfully")
                }
            } catch (error) {
                console.log(error);
            }
            this.resetForm();
            this.closeModal();
        },
        closeModal() {
            this.localIsVisible = false;
        },
        resetForm() {
            this.form = {
                name: "",
                email: "",
                message: "",
                telephone: "",
            };
        },
    },
};
</script>

<style scoped>
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
}

.contact-sbt-btn {
    margin-top: 1rem;
    margin-left: 2rem;
    align-self: center;
}

.mt-3 {
    margin-top: 1rem;
}
</style>
