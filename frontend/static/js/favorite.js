// Функция для получения списка избранных товаров из локального хранилища или сервера
function getFavoriteProducts() {
    // Ваш код для получения списка избранных товаров
    // Например, если вы используете локальное хранилище браузера:
    const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    return favoriteProducts;
}

// Функция для отрисовки карточек избранных товаров
function renderFavoriteProducts() {
    const favoriteProducts = getFavoriteProducts();

    const favoriteProductsContainer = document.getElementById('favoriteProducts');

    // Очищаем контейнер перед добавлением новых карточек
    favoriteProductsContainer.innerHTML = '';

    // Проходимся по списку избранных товаров и создаем для каждого карточку
    favoriteProducts.forEach(product => {
        const productCard = createProductCard(product);
        favoriteProductsContainer.appendChild(productCard);
    });
}

// Функция для создания карточки товара
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    // Создаем элементы карточки: изображение, название, цена и т.д.
    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.title;
    card.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = product.title;
    card.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `${product.cost} р`;
    card.appendChild(price);

    return card;
}

// После загрузки страницы вызываем функцию для отрисовки избранных товаров
document.addEventListener('DOMContentLoaded', function() {
    renderFavoriteProducts();
});