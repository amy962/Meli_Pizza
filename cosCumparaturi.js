document.addEventListener("DOMContentLoaded", function () {
    let cart = loadCart();

    const addToCartButtons = document.querySelectorAll(".menu-button");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const menuItem = button.closest(".menu-item");
            const productName = menuItem.querySelector("h3").textContent;
            const productPrice = parseInt(menuItem.querySelector(".price").textContent);

            // Verificăm dacă există suplimente selectate
            const selectedSupplements = [];
            const supplementButtons = menuItem.querySelectorAll(".supplement-button.selected");
            supplementButtons.forEach(supp => {
                selectedSupplements.push({
                    name: supp.dataset.name,
                    price: parseFloat(supp.dataset.price)
                });
            });

            const basePrice = productPrice;
            const supplementsTotal = selectedSupplements.reduce((sum, s) => sum + s.price, 0);
            const totalPrice = basePrice + supplementsTotal;

            const existingProduct = cart.find(item =>
                item.name === productName &&
                JSON.stringify(item.supplements) === JSON.stringify(selectedSupplements)
            );

            if (existingProduct) {
                existingProduct.quantity++;
                existingProduct.totalPrice = (basePrice + supplementsTotal) * existingProduct.quantity;
            } else {
                cart.push({
                    name: productName,
                    basePrice: basePrice,
                    supplements: selectedSupplements,
                    quantity: 1,
                    totalPrice: totalPrice
                });
            }

            saveCart();
            updateCartIcon();
        });
    });

    const cartIcon = document.querySelector(".cart");
    const cartModal = document.createElement("div");
    cartModal.classList.add("cart-modal");
    document.body.appendChild(cartModal);

    cartIcon.addEventListener("click", function () {
        showCartModal();
    });

    function showCartModal() {
        cartModal.innerHTML = "";
        let cartContent = `<button class="close-top-right">✖</button>`;

        if (cart.length === 0) {
            cartContent += `<h2>Coșul este gol</h2>`;
        } else {
            let total = 0;
            cartContent += `<h2>Coș de cumpărături</h2><div class="cart-items-wrapper"><ul>`;

            cart.forEach(item => {
                total += item.totalPrice;
                const supplementsHTML = item.supplements && item.supplements.length > 0 
                    ? `<br><small>+ ${item.supplements.map(s => s.name).join(", ")}</small>` 
                    : "";

                cartContent += `
                    <li class="cart-item-line">
                        <span class="product-name">${item.name}${supplementsHTML}</span>
                        <div class="item-actions">
                            <div class="quantity-controls">
                                <button class="decrease-qty" data-name="${item.name}" data-supplements='${JSON.stringify(item.supplements)}'>−</button>
                                <span>${item.quantity}</span>
                                <button class="increase-qty" data-name="${item.name}" data-supplements='${JSON.stringify(item.supplements)}'>+</button>
                            </div>
                            <button class="remove-item" data-name="${item.name}" data-supplements='${JSON.stringify(item.supplements)}'>✖</button>
                        </div>
                    </li>
                `;
            });

            cartContent += `</ul></div><h3>Total: ${total.toFixed(2)} MDL</h3>`;
            cartContent += `<button id="buy-now">Cumpără acum</button>`;
        }

        cartModal.innerHTML = cartContent;
        cartModal.style.display = "block";

        cartModal.querySelector(".close-top-right")?.addEventListener("click", () => cartModal.style.display = "none");

        cartModal.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                removeFromCart(button.getAttribute("data-name"), button.getAttribute("data-supplements"));
            });
        });

        cartModal.querySelectorAll(".increase-qty").forEach(button => {
            button.addEventListener("click", function () {
                const name = button.getAttribute("data-name");
                const supplements = JSON.parse(button.getAttribute("data-supplements"));
                const product = cart.find(item => item.name === name && JSON.stringify(item.supplements) === JSON.stringify(supplements));
                if (product) {
                    product.quantity++;
                    product.totalPrice = (product.basePrice + (product.supplements?.reduce((sum, s) => sum + parseFloat(s.price), 0) || 0)) * product.quantity;
                    saveCart();
                    showCartModal();
                    updateCartIcon();
                }
            });
        });

        cartModal.querySelectorAll(".decrease-qty").forEach(button => {
            button.addEventListener("click", function () {
                const name = button.getAttribute("data-name");
                const supplements = JSON.parse(button.getAttribute("data-supplements"));
                const product = cart.find(item => item.name === name && JSON.stringify(item.supplements) === JSON.stringify(supplements));
                if (product && product.quantity > 1) {
                    product.quantity--;
                    product.totalPrice = (product.basePrice + (product.supplements?.reduce((sum, s) => sum + parseFloat(s.price), 0) || 0)) * product.quantity;
                } else {
                    cart = cart.filter(item => !(item.name === name && JSON.stringify(item.supplements) === JSON.stringify(supplements)));
                }
                saveCart();
                showCartModal();
                updateCartIcon();
            });
        });

        const buyNowButton = document.getElementById("buy-now");
        if (buyNowButton) {
            buyNowButton.addEventListener("click", function () {
                buyNowButton.textContent = "⏳ Procesare...";
                buyNowButton.disabled = true;
                buyNowButton.style.background = "#ffa726";

                setTimeout(() => {
                    alert("Mulțumim pentru comandă! 🛒");
                    cart = [];
                    saveCart();
                    showCartModal();
                    updateCartIcon();
                }, 1500);
            });
        }
    }

    function removeFromCart(productName, supplementsJSON) {
        const supplements = JSON.parse(supplementsJSON);
        cart = cart.filter(item => !(item.name === productName && JSON.stringify(item.supplements) === JSON.stringify(supplements)));
        saveCart();
        showCartModal();
        updateCartIcon();
    }

    function updateCartIcon() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        let existingCount = document.querySelector(".cart-count");

        if (!existingCount) {
            existingCount = document.createElement("span");
            existingCount.classList.add("cart-count");
            document.querySelector(".cart").appendChild(existingCount);
        }

        existingCount.textContent = totalItems;
    }

    function saveCart() {
        localStorage.setItem("meliCart", JSON.stringify(cart));
    }

    function loadCart() {
        const saved = localStorage.getItem("meliCart");
        return saved ? JSON.parse(saved) : [];
    }

    updateCartIcon();
});
