document.addEventListener("DOMContentLoaded", function () {
    const minusButton = document.querySelector(".quantity-group .quantity:first-child");
    const plusButton = document.querySelector(".quantity-group .quantity:last-child");
    const quantitySpan = document.querySelector(".quantity-group span");
    const orderValue = document.querySelector(".order-value strong");
    const addToCartButton = document.querySelector(".add-to-cart");
    const options = document.querySelectorAll(".option");

    const basePrice = 120;
    let quantity = 1;
    let selectedSupplements = [];

    function updateOrderValue() {
        const supplementsCost = selectedSupplements.reduce((sum, supp) => sum + parseFloat(supp.price), 0);
        const total = (basePrice + supplementsCost) * quantity;
        orderValue.textContent = `${total} mdl`;
    }

    minusButton.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            updateOrderValue();
            saveState();
        }
    });

    plusButton.addEventListener("click", () => {
        quantity++;
        quantitySpan.textContent = quantity;
        updateOrderValue();
        saveState();
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            const name = option.dataset.name;
            const price = option.dataset.price;

            if (option.classList.contains("selected")) {
                option.classList.remove("selected");
                selectedSupplements = selectedSupplements.filter(s => s.name !== name);
            } else {
                option.classList.add("selected");
                selectedSupplements.push({ name, price });
            }

            updateOrderValue();
            saveState();
        });
    });

    addToCartButton.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("meliCart")) || [];

        const product = {
            name: "Pizza Pepperoni",
            quantity: quantity,
            basePrice: basePrice,
            supplements: selectedSupplements,
            totalPrice: (basePrice + selectedSupplements.reduce((sum, s) => sum + parseFloat(s.price), 0)) * quantity
        };

        cart.push(product);
        localStorage.setItem("meliCart", JSON.stringify(cart));

        alert(`✔️ ${quantity} x Pizza Pepperoni adăugat(ă) în coș!`);
        updateCartIcon();
        resetForm();
    });

    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem("meliCart")) || [];
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        let existingCount = document.querySelector(".cart-count");
        if (!existingCount) {
            existingCount = document.createElement("span");
            existingCount.classList.add("cart-count");
            document.querySelector(".cart").appendChild(existingCount);
        }

        existingCount.textContent = totalItems;
    }

    function saveState() {
        const state = {
            quantity,
            selectedSupplements,
        };
        localStorage.setItem("pizzaState_pepperoni", JSON.stringify(state));
    }

    function loadState() {
        const state = JSON.parse(localStorage.getItem("pizzaState_pepperoni"));
        if (state) {
            quantity = state.quantity;
            quantitySpan.textContent = quantity;
            selectedSupplements = state.selectedSupplements;

            options.forEach(option => {
                const name = option.dataset.name;
                if (selectedSupplements.find(s => s.name === name)) {
                    option.classList.add("selected");
                }
            });

            updateOrderValue();
        }
    }

    function resetForm() {
        quantity = 1;
        quantitySpan.textContent = quantity;
        selectedSupplements = [];
    
        options.forEach(option => {
            option.classList.remove("selected");
        });
    
        updateOrderValue();
    
        // Șterge și starea salvată
        localStorage.removeItem("pizzaState_pepperoni");
    }

    updateCartIcon();
    loadState();
});
