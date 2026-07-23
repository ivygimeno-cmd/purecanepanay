document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const submitButton = document.getElementById("contact-submit");
    const submitText = submitButton?.querySelector(".contact-submit-text");
    const statusMessage = document.getElementById("contact-form-status");

    if (!contactForm) {
        console.error("EmailJS: Contact form was not found.");
        return;
    }

    if (!submitButton) {
        console.error("EmailJS: Submit button was not found.");
        return;
    }

    if (!statusMessage) {
        console.error("EmailJS: Status message element was not found.");
        return;
    }

    if (typeof emailjs === "undefined") {
        console.error("EmailJS library failed to load.");
        return;
    }

    emailjs.init({
        publicKey: "4qH_bk_U3udcmaTcZ"
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitButton.disabled = true;

        if (submitText) {
            submitText.textContent = "Sending...";
        }

        statusMessage.textContent = "Sending your inquiry...";
        statusMessage.className = "contact-form-status is-sending";

        try {
            const response = await emailjs.sendForm(
                "service_7yefj7h",
                "template_cnkwfyz",
                contactForm
            );

            console.log(
                "Email sent successfully:",
                response.status,
                response.text
            );

            statusMessage.textContent =
                "Your inquiry was sent successfully. We will contact you soon.";

            statusMessage.className =
                "contact-form-status is-success";

            contactForm.reset();
        } catch (error) {
            console.error("EmailJS sending error:", error);

            let errorMessage =
                "Your inquiry could not be sent. Please try again.";

            if (error?.text) {
                errorMessage += ` Error: ${error.text}`;
            }

            statusMessage.textContent = errorMessage;
            statusMessage.className =
                "contact-form-status is-error";
        } finally {
            submitButton.disabled = false;

            if (submitText) {
                submitText.textContent = "Send Inquiry";
            }
        }
    });
});