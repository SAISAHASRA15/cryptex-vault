document.getElementById("check-strength").addEventListener("click", () => {
    const password = document.getElementById("password").value;
    const strengthText = document.getElementById("strength-text");
    const strengthFill = document.querySelector(".strength-fill");
    const message = document.querySelector(".strength-message");

    let score = 0;

    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (password.length === 0) {
        strengthText.textContent = "--";
        strengthFill.style.width = "0%";
        message.textContent = "Enter a password to check its strength.";
    } else if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthFill.style.width = "35%";
        message.textContent = "Weak password. Add length, numbers, uppercase letters and symbols.";
    } else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthFill.style.width = "70%";
        message.textContent = "Good start. Make it longer and more unique for better security.";
    } else {
        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
        message.textContent = "Strong password. Avoid reusing it on other accounts.";
    }
});