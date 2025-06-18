document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Preluare date
    let nume = document.getElementById("nume").value.trim();
    let prenume = document.getElementById("prenume").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefon = document.getElementById("telefon").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Resetare mesaje de eroare
    let errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.textContent = "");

    let isValid = true;
    let errorMsg = "";

    // Validare nume
    if (nume.length < 2) {
        document.getElementById("numeError").textContent = "Numele trebuie să aibă cel puțin 2 caractere!";
        errorMsg += "- Numele trebuie să aibă cel puțin 2 caractere.\n";
        isValid = false;
    }

    // Validare prenume
    if (prenume.length < 2) {
        document.getElementById("prenumeError").textContent = "Prenumele trebuie să aibă cel puțin 2 caractere!";
        errorMsg += "- Prenumele trebuie să aibă cel puțin 2 caractere.\n";
        isValid = false;
    }

    // Validare email (regex standard)
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Introdu un email valid!";
        errorMsg += "- Introdu un email valid!\n";
        isValid = false;
    }

    // Validare telefon (format românesc: 07XXXXXXXX)
    let telefonRegex = /^0\d{8}$/;
    if (!telefonRegex.test(telefon)) {
        document.getElementById("telefonError").textContent = "Numărul de telefon trebuie să fie în formatul 0XXXXXXXX!";
        errorMsg += "- Numărul de telefon trebuie să fie în formatul 0XXXXXXXX!\n";
        isValid = false;
    }

    // Validare parolă (minim 8 caractere, cel puțin o literă mare, un număr și un caracter special)
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById("passwordError").textContent = 
            "Parola trebuie să aibă minim 8 caractere, o literă mare, un număr și un caracter special!";
        errorMsg += "- Parola trebuie să aibă minim 8 caractere, o literă mare, un număr și un caracter special!\n";
        isValid = false;
    }

    // Verificare confirmare parolă
    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Parolele nu coincid!";
        errorMsg += "- Parolele nu coincid!\n";
        isValid = false;
    }

    if (!isValid) {
        alert("⚠️ Eroare la înregistrare:\n" + errorMsg);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificare email existent
    let emailExists = users.some(user => user.email === email);
    if (emailExists) {
        document.getElementById("emailError").textContent = "Acest email este deja folosit!";
        alert("⚠️ Acest email este deja folosit! Te rugăm să folosești un alt email.");
        return;
    }

    // Salvare utilizator
    let newUser = { nume, prenume, email, telefon, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Înregistrare reușită! Acum te poți autentifica.");
    window.location.href = "logare.html";
});
