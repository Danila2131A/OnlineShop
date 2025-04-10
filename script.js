'use strict';

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById("product-list");
        const cartItems = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");
        const toggleCartButton = document.getElementById("toggle-cart");
        let totalPrice = 0;

        productList.innerHTML = ""; // Clear existing content

        for (let productName in products) {
            const productData = products[productName];

            // Create a new product item
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            // Add product details with an image
            productItem.innerHTML = `
                <img src="images/${productData.model.toLowerCase().replace(/ /g, "_")}.jpg" alt="${productName}" class="product-image">
                <h3>${productName}</h3>
                <p>Цена: ${productData.price} руб.</p>
                <button class="add-to-cart">Добавить в корзину</button>
            `;

            // Add event listener to the button
            const addToCartButton = productItem.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", () => {
                const cartItem = document.createElement("li");
                cartItem.textContent = `${productName} - ${productData.price} руб.`;
                cartItems.appendChild(cartItem);

                totalPrice += productData.price;
                totalPriceElement.textContent = `Итого: ${totalPrice} руб.`;
            });

            productList.appendChild(productItem);
        }

        // Add toggle functionality for the cart
        toggleCartButton.addEventListener("click", () => {
            if (cartItems.style.display === "none") {
                cartItems.style.display = "block";
                toggleCartButton.textContent = "Скрыть корзину";
            } else {
                cartItems.style.display = "none";
                toggleCartButton.textContent = "Показать корзину";
            }
        });
    })
    .catch(error => console.error("Ошибка загрузки данных:", error));

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a");
    const toggleCartButton = document.getElementById("toggle-cart");
    const cartItems = document.getElementById("cart-items");

    // Установить начальное состояние корзины
    cartItems.style.display = "none";
    toggleCartButton.textContent = "Показать корзину";

    // Добавить плавный скроллинг для всех ссылок навигации
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Отключить стандартное поведение ссылки
            const targetId = link.getAttribute("href").substring(1); // Получить ID цели
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth" // Плавный скроллинг
                });
            }
        });
    });

    const backToTopButton = document.getElementById("back-to-top");

    // Показать кнопку при прокрутке вниз
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Прокрутка наверх при нажатии
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});