document.addEventListener('DOMContentLoaded', function() {
    // При загрузке страницы отображаем соответствующую иконку для каждого элемента в корзине
    updateCartIcons();

    document.querySelectorAll('.cart-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное действие кнопки отправки формы

            // Получаем ссылку на изображение иконки корзины
            let cartIcon = this.querySelector('img');

            // Получаем productId товара, который пользователь добавил в корзину
            let productId = this.parentElement.querySelector('input[name="product_id"]').value;

            // Проверяем, добавлен ли товар в корзину
            let isAdded = cartIcon.getAttribute('data-added') === 'true';

            // Обновляем состояние иконки на странице
            if (isAdded) {
                // Удаляем товар из корзины
                cartIcon.src = "/static/assets/icons/icon_cart_outline.svg";
                // Удаляем атрибут для иконки
                cartIcon.removeAttribute('data-added');
                // Удаляем товар из Local Storage
                removeFromLocalStorage(productId);
            } else {
                // Добавляем товар в корзину
                cartIcon.src = "/static/assets/icons/icon_cart.svg";
                // Устанавливаем атрибут для иконки
                cartIcon.setAttribute('data-added', 'true');
                // Добавляем товар в Local Storage
                addToLocalStorage(productId);
            }
        });
    });
});

// Функция добавления товара в Local Storage
function addToLocalStorage(productId) {
    console.log('TEST')
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    cartItems[productId] = true;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Функция удаления товара из Local Storage
function removeFromLocalStorage(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    delete cartItems[productId];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Функция обновления иконок корзины при загрузке страницы
function updateCartIcons() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    let buttons = document.querySelectorAll('.cart-button');
    if (buttons) {
        buttons.forEach(button => {
            let productIdInput = button.querySelector('input[name="product_id"]');
            if (productIdInput) {
                let productId = productIdInput.value;
                let cartIcon = button.querySelector('img');
                if (productId in cartItems) {
                    cartIcon.src = "/static/assets/icons/icon_cart.svg";
                    cartIcon.setAttribute('data-added', 'true');
                } else {
                    cartIcon.src = "/static/assets/icons/icon_cart_outline.svg";
                    cartIcon.removeAttribute('data-added');
                }
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    displayCartItemsInBasket();
});

function displayCartItemsInBasket() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    let basketContainer = document.getElementById('basketContainer');

    // Очищаем содержимое корзины перед отображением новых товаров
    basketContainer.innerHTML = '';

    if (Object.keys(cartItems).length === 0) { // Проверяем, пуста ли корзина
        // Если корзина пуста, добавляем сообщение "Корзина пуста"
        let emptyBasketMessage = document.createElement('div');
        emptyBasketMessage.classList.add('empty-basket-catalog-title');
        emptyBasketMessage.textContent = 'Корзина пуста';
        basketContainer.appendChild(emptyBasketMessage);
    } else {
        // Создаем сообщение "Корзина"
        let basketMessage = document.createElement('div');
        basketMessage.classList.add('basket-catalog-title');
        basketMessage.textContent = 'Корзина';
        basketContainer.appendChild(basketMessage);

        // Проходимся по товарам в корзине и отображаем каждый товар
        for (let productId in cartItems) {
            fetch('/get_product_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product_id: productId })
            })
            .then(response => response.json())
            .then(productInfo => {
                // Создаем карточку товара на основе полученной информации
                let productCard = document.createElement('div');
                productCard.classList.add('product-container', 'product-info');
        
                let productTitle = document.createElement('div');
                productTitle.classList.add('product-title');
                productTitle.textContent = productInfo.title;
        
                let productPrice = document.createElement('div');
                productPrice.classList.add('product-price');
                productPrice.textContent = 'Цена: ' + productInfo.price;
        
                let productImageurl = document.createElement('img');
                productImageurl.classList.add('product-image');
                productImageurl.src = productInfo.imageurl;
        
                // Добавляем элементы карточки товара в контейнер корзины
                productCard.appendChild(productTitle);
                productCard.appendChild(productPrice);
                productCard.appendChild(productImageurl);
                basketContainer.appendChild(productCard);
            })
            .catch(error => console.error('Ошибка при получении информации о товаре:', error));
        }
    }
}
