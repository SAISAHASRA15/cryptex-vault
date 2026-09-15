const filterButtons =
document.querySelectorAll(".threat-filters button");

const threatCards =
document.querySelectorAll(".threat-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
        button.dataset.filter;

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        threatCards.forEach(card => {

            const severity =
            card.dataset.severity;

            if (
                filter === "all" ||
                severity === filter
            ) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

});