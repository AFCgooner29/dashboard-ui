<template>
    <va-card>
        <va-card-title>Privacy Policy</va-card-title>
        <va-card-content>
            <section>
                <h2>Introduction</h2>
                <p>
                    Welcome to Liberta Tech. We are committed to protecting your privacy
                    and ensuring that your personal information is handled in a safe and
                    responsible manner.
                </p>
            </section>

            <section>
                <h2>Information We Collect</h2>
                <p>
                    When you interact with us through our website, we may collect the
                    following information:
                </p>
                <ul>
                    <li>Your name</li>
                    <li>Your email address</li>
                    <li>Your phone number</li>
                    <li>Details about your interests or inquiries</li>
                </ul>
            </section>

            <section>
                <h2>How We Use Your Information</h2>
                <p>
                    We use the information you provide to:
                </p>
                <ul>
                    <li>Contact you during working hours to discuss your interests or inquiries</li>
                    <li>Provide information about our services</li>
                    <li>Improve our website and services</li>
                </ul>
            </section>

            <section>
                <h2>Sharing Your Information</h2>
                <p>
                    We do not sell, trade, or rent your personal information to third
                    parties. Your information is used solely for the purposes outlined in
                    this policy.
                </p>
            </section>

            <section>
                <h2>Data Security</h2>
                <p>
                    We take appropriate measures to ensure that your personal information
                    is stored securely and protected from unauthorized access or disclosure.
                </p>
            </section>

            <section>
                <h2>Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal
                    information. If you wish to exercise these rights, please contact us
                    at <a href="mailto:founder.office@liberta.co.in">founder.office@liberta.co.in</a>.
                </p>
            </section>

            <section>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul>
                    <li>Email: <a href="mailto:founder.office@liberta.co.in">founder.office@liberta.co.in</a></li>
                    <li>Phone: +91-9988342911</li>
                </ul>
            </section>

            <section>
                <h2>Updates to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Please check this
                    page periodically for updates.
                </p>
            </section>
        </va-card-content>
    </va-card>
</template>

<script>
export default {
    name: "PrivacyPolicyPage",
};
</script>

<style scoped>
va-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

va-card-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

section {
    margin-bottom: 20px;
}

section h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

section p,
section ul {
    font-size: 16px;
    line-height: 1.6;
}
</style>