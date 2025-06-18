document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    // Recuperare date salvate (dacă există)
    loadSavedData();

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previne trimiterea automată a formularului

        // Preluarea valorilor din input-uri
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const cvFile = document.querySelector('input[type="file"]').files[0];

        // Expresii regulate pentru validare
        const phoneRegex = /^\+373\d{8}$/; // Format +373XXXXXXXX
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format e-mail standard

        let errors = [];

        // Validare nume
        if (name === "") {
            errors.push("Numele este obligatoriu.");
        }

        // Validare vârstă (minim 18 ani)
        if (age === "" || isNaN(age) || parseInt(age) < 18) {
            errors.push("Trebuie să aveți cel puțin 18 ani.");
        }

        // Validare telefon
        if (!phoneRegex.test(phone)) {
            errors.push("Numărul de telefon trebuie să fie în format +373XXXXXXXX.");
        }

        // Validare email
        if (!emailRegex.test(email)) {
            errors.push("Introduceți un e-mail valid.");
        }

        // Validare încărcare CV (opțional, dar poate fi necesar)
        if (!cvFile) {
            errors.push("Vă rugăm să încărcați CV-ul.");
        } else {
            const allowedExtensions = ["pdf", "doc", "docx"];
            const fileSizeLimit = 2 * 1024 * 1024; // 2MB
            const fileExtension = cvFile.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                errors.push("Format invalid. Încărcați un fișier PDF, DOC sau DOCX.");
            }

            if (cvFile.size > fileSizeLimit) {
                errors.push("Fișierul trebuie să aibă maximum 2MB.");
            }
        }

        // Afișarea erorilor sau trimiterea formularului
        if (errors.length > 0) {
            alert("⚠️ Erori în formular:\n\n" + errors.join("\n"));
        } else {
            // Salvare date în LocalStorage
            saveData(name, age, phone, email);

            alert("✅ Formular trimis cu succes! Veți fi contactat în curând.");
            form.reset(); // Curăță formularul după trimitere
            localStorage.removeItem("angajareData"); // Șterge datele după trimitere
        }
    });

    // Funcție pentru salvarea datelor în LocalStorage
    function saveData(name, age, phone, email) {
        const formData = {
            name: name,
            age: age,
            phone: phone,
            email: email
        };

        localStorage.setItem("angajareData", JSON.stringify(formData));
    }

    // Funcție pentru încărcarea datelor salvate
    function loadSavedData() {
        const savedData = localStorage.getItem("angajareData");

        if (savedData) {
            const formData = JSON.parse(savedData);

            document.getElementById("name").value = formData.name;
            document.getElementById("age").value = formData.age;
            document.getElementById("phone").value = formData.phone;
            document.getElementById("email").value = formData.email;
        }
    }
});
