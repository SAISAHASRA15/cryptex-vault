document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const contactData = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        date: new Date().toLocaleString()
    };

    const response = await fetch("/submit-contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    });

    if (response.ok) {
        localStorage.setItem("contactEmail", contactData.email);
        localStorage.setItem("contactName", contactData.fullname);

        window.location.href = "thankyou.html";
    } else {
        alert("Failed to submit request.");
    }
});