let selectedSeverity = "";

document.querySelectorAll(".severity-buttons button").forEach(button => {
    button.addEventListener("click", () => {
        selectedSeverity = button.textContent.trim();
        document.querySelectorAll(".severity-buttons button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

const incidentForm = document.getElementById("incidentForm");

if (incidentForm) {
    incidentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const incidentType = document.getElementById("incident-type").value;
        const system = document.getElementById("system").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!name || !email || incidentType === "Select incident type" || !selectedSeverity || !system || !description) {
            alert("Please complete all incident details and choose severity");
            return;
        }

        try {
            const response = await fetch("/incidents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    incidentType,
                    severity: selectedSeverity,
                    system,
                    description
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Incident submitted successfully. ID: " + data.data.id);
                incidentForm.reset();
                selectedSeverity = "";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Could not submit incident");
        }
    });
}


/*
const form = document.querySelector(".report-form-card");
        const successScreen = document.getElementById("successScreen");

        const incidentIdInput = document.getElementById("incidentId");
        const generatedId = document.getElementById("generatedId");

        const randomId =
            "INC-2026-" +
            Math.floor(10000 + Math.random() * 90000);

        incidentIdInput.value = randomId;

        form.addEventListener("submit", function(e){

            e.preventDefault();

            generatedId.textContent = randomId;

            document.querySelector(".report-grid").style.display = "none";

            successScreen.style.display = "flex";
        });*/