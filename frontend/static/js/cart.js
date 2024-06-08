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
    displayCheckoutForm();
    updateCartIcons;
});

function displayCheckoutForm() {
    let basketContainer = document.getElementById('basketContainer');

    // Создаем форму оформления заказа
    let checkoutForm = document.createElement('div');
    checkoutForm.classList.add('checkout-form');

    // 1. Способ доставки (варианты выбора)
    let deliveryMethodLabel = document.createElement('label');
    deliveryMethodLabel.textContent = 'Способ доставки:';
    let deliveryMethodSelect = document.createElement('select');
    deliveryMethodSelect.name = 'deliveryMethod';
    let deliveryOptions = ['Курьером', 'Почтой', 'Пункт самовывоза', 'Забрать из магазина'];
    deliveryOptions.forEach(option => {
        let deliveryOption = document.createElement('option');
        deliveryOption.value = option;
        deliveryOption.textContent = option;
        deliveryMethodSelect.appendChild(deliveryOption);
    });
    checkoutForm.appendChild(deliveryMethodLabel);
    checkoutForm.appendChild(deliveryMethodSelect);

    // Разделительная линия
    let separatorLine1 = document.createElement('hr');
    checkoutForm.appendChild(separatorLine1);

    // 2. Адрес доставки (пользователь заполняет)
    let addressLabel = document.createElement('label');
    addressLabel.textContent = 'Адрес доставки:';
    let addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.name = 'address';
    checkoutForm.appendChild(addressLabel);
    checkoutForm.appendChild(addressInput);

    // Разделительная линия
    let separatorLine2 = document.createElement('hr');
    checkoutForm.appendChild(separatorLine2);

    // 3. Получатель (пользователь заполняет)
    let recipientLabel = document.createElement('label');
    recipientLabel.textContent = 'Получатель:';
    let recipientInput = document.createElement('input');
    recipientInput.type = 'text';
    recipientInput.name = 'recipient';
    checkoutForm.appendChild(recipientLabel);
    checkoutForm.appendChild(recipientInput);

    // Разделительная линия
    let separatorLine3 = document.createElement('hr');
    checkoutForm.appendChild(separatorLine3);

    // 4. Способ оплаты (варианты выбора)
    let paymentMethodLabel = document.createElement('label');
    paymentMethodLabel.textContent = 'Способ оплаты:';
    let paymentMethodSelect = document.createElement('select');
    paymentMethodSelect.name = 'paymentMethod';
    let paymentOptions = ['Банковской картой', 'При получении', 'Подарочный сертификат'];
    paymentOptions.forEach(option => {
        let paymentOption = document.createElement('option');
        paymentOption.value = option;
        paymentOption.textContent = option;
        paymentMethodSelect.appendChild(paymentOption);
    });
    checkoutForm.appendChild(paymentMethodLabel);
    checkoutForm.appendChild(paymentMethodSelect);

    // Кнопка "Оформить заказ"
    let submitOrderButton = document.createElement('button');
    submitOrderButton.textContent = 'Оформить заказ';
    submitOrderButton.id = 'submitOrder';
    submitOrderButton.addEventListener('click', function() {
    });
    checkoutForm.appendChild(submitOrderButton);

    // Добавляем форму в контейнер корзины
    basketContainer.appendChild(checkoutForm);
}

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

                // Изображение товара
                let productImageurl = document.createElement('img');
                productImageurl.classList.add('product-image');
                productImageurl.src = productInfo.imageurl;
                productCard.appendChild(productImageurl);

                // Описание товара
                let productDescription = document.createElement('div');
                productDescription.classList.add('product-description');

                // Название товара
                let productTitle = document.createElement('div');
                productTitle.classList.add('product-title');
                productTitle.textContent = productInfo.title;
                productDescription.appendChild(productTitle);

                // Цена товара
                let productPrice = document.createElement('div');
                productPrice.classList.add('product-price');
                productPrice.textContent = 'Цена: ' + productInfo.price;
                productDescription.appendChild(productPrice);

                let productActions = document.createElement('div');
                productActions.classList.add('product-actions');

                let quantityInput = document.createElement('input');
                quantityInput.classList.add('quantity-selector')
                quantityInput.type = 'number';
                quantityInput.value = 1;
                quantityInput.min = 1;
                productActions.appendChild(quantityInput);

                let sizeSelect = document.createElement('select');
                sizeSelect.classList.add('size-selector')
                sizeSelect.innerHTML = '<option value="XS">XS</option><option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option>';
                productActions.appendChild(sizeSelect);

                let deleteIcon = document.createElement('img');
                deleteIcon.src = '/static/assets/icons/delete.svg';
                deleteIcon.classList.add('delete-button');

                deleteIcon.addEventListener('click', function() {
                    // Получаем ID товара, который нужно удалить
                    let productIdToDelete = productInfo.id;
                    
                    // Удаляем товар из корзины
                    deleteItemFromCart(productId);
                    
                    // Удаляем товар из Local Storage
                    removeFromLocalStorage(productId);
                    
                    // Удаляем карточку товара из корзины на странице
                    console.log('товар удален')
                    productCard.remove();

                });

                // Функция удаления товара из корзины
                function deleteItemFromCart(productId) {
                    // Получаем текущий список товаров из Local Storage
                    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
                
                    // Проверяем, существует ли товар с указанным productId в корзине
                    if (cartItems.hasOwnProperty(productId)) {
                        // Удаляем товар с указанным productId из объекта корзины
                        delete cartItems[productId];
                
                        // Обновляем данные в Local Storage
                        localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                        // Возвращаем true, чтобы показать, что товар успешно удален из корзины
                        return true;
                    } else {
                        // Если товар с указанным productId не найден в корзине, возвращаем false
                        return false;
                    }
                }

                // Функция удаления товара из Local Storage
                function removeFromLocalStorage(productId) {
                    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
                    delete cartItems[productId];
                    console.log('товар удален из local storage')

                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                }

                // Добавляем элементы карточки товара в контейнер корзины
                productCard.appendChild(productDescription);
                productCard.appendChild(productActions);
                productCard.appendChild(deleteIcon)
                basketContainer.appendChild(productCard);
            })
            .catch(error => console.error('Ошибка при получении информации о товаре:', error));
        }
    }
}

// Нумерация страниц
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы с классом 'page-number'
    const pageNumbers = document.querySelectorAll('.page-number');

    // Добавляем обработчик событий для каждого элемента
    pageNumbers.forEach(pageNumber => {
        pageNumber.addEventListener('click', function() {
            // Удаляем класс 'active' у всех номеров страниц
            pageNumbers.forEach(page => {
                page.classList.remove('active');
            });

            // Добавляем класс 'active' только для текущего номера страницы
            this.classList.add('active');
        });
    });
});

function openCatalog(id = undefined) {
    location.href = 'catalog';
}