document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Preluare date
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;

        // Resetare mesaje de eroare
        document.getElementById("emailError").textContent = "";
        document.getElementById("passwordError").textContent = "";

        let isValid = true;

        // Validare email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById("emailError").textContent = "Introdu un email valid!";
            alert("⚠️ Introdu un email valid!");
            isValid = false;
        }

        // Validare parolă (minim 8 caractere)
        if (password.length < 8) {
            document.getElementById("passwordError").textContent = "Parola trebuie să aibă minim 8 caractere!";
            alert("⚠️ Parola trebuie să aibă minim 8 caractere!");
            isValid = false;
        }

        if (!isValid) return;

        // Obține utilizatorii salvați din localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Caută utilizatorul
        let foundUser = users.find(user => user.email === email);

        if (!foundUser) {
            alert("⚠️ Email-ul introdus nu există sau nu este înregistrat!");
            document.getElementById("emailError").textContent = "Email sau parolă incorectă!";
            return;
        }

        if (foundUser.password !== password) {
            alert("⚠️ Parola introdusă este incorectă!");
            document.getElementById("passwordError").textContent = "Parola incorectă!";
            return;
        }

        alert("✅ Autentificare reușită! Bine ai revenit, " + foundUser.nume + " " + foundUser.prenume + "!");
        window.location.href = "MeliPizza_home.html";
    });
});
