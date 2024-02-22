const miniCatalogItems = [
  {
    id: 1,
    title: 'Жакет из вискозы',
    cost: 5599,
    imageUrl: '/static/assets/images/product_1.jpg',
  },
  {
    id: 2,
    title: 'Брюки палаццо',
    cost: 4599,
    imageUrl: '/static/assets/images/product_2.jpg',
  },
  {
    id: 3,
    title: 'Пиджак из вискозы',
    cost: 5599,
    imageUrl: '/static/assets/images/product_3.jpg',
  },
  {
    id: 4,
    title: 'Пиджак из вискозы',
    cost: 5599,
    imageUrl: '/static/assets/images/product_4.jpg',
  },
];

let basketItems = [];

function openCatalog(id = undefined) {
  location.href = 'catalog';
}

function openItem(id) {
  location.href = `product?id=${id}`;
}

function addToBasket(itemId) {
  if (!basketItems.includes(itemId)) {
    // Добавляем товар в корзину
    basketItems.push(itemId);
    console.log(`Item ${itemId} added to basket!`);
  } else {
    console.log(`Item ${itemId} is already in basket!`);
  }
}

function removeFromBasket(itemId) {
  // Проверяем, что товар присутствует в списке избранных
  const index = basketItems.indexOf(itemId);
  if (index !== -1) {
    // Удаляем товар из списка избранных
    basketItems.splice(index, 1);
    console.log(`Item ${itemId} removed from favorites!`);
  } else {
    console.log(`Item ${itemId} is not in favorites!`);
  }
}

function drawMiniCatalog() {
  const miniCatalog = document.getElementById('miniCatalog');

  for (const item of miniCatalogItems) {
    const itemImageElement = document.createElement('img');
    itemImageElement.classList.add('item-image');
    itemImageElement.src = item.imageUrl;

    const itemTitleElement = document.createElement('div');
    itemTitleElement.classList.add('item-title');
    itemTitleElement.innerText = item.title;
    itemTitleElement.addEventListener('click', openItem.bind(null, item.id))

    const itemCostElement = document.createElement('div');
    itemCostElement.classList.add('item-cost');
    itemCostElement.innerText = `${item.cost} р`;

    const cartSVG = document.createElement('img');
    cartSVG.classList.add('cart-icon')
    cartSVG.src = '/static/assets/icons/icon_cart_outline.svg';
    cartSVG.addEventListener('click', function() {
      if (cartSVG.classList.contains('full')) {
        cartSVG.src = '/static/assets/icons/icon_cart_outline.svg';
        cartSVG.classList.remove('full');
        removeFromBasket(item.id);
      } else {
        cartSVG.src = '/static/assets/icons/icon_cart.svg';
        cartSVG.classList.add('full');
        addToBasket(item.id);
      }
    });


    const itemElement = document.createElement('div');
    itemElement.classList.add('catalog-item');
    itemElement.appendChild(itemImageElement);
    itemElement.appendChild(itemTitleElement);
    itemElement.appendChild(itemCostElement);
    itemElement.appendChild(cartSVG); // Добавляем изображение сердца в элемент товара



    miniCatalog.appendChild(itemElement);
  }
}

drawMiniCatalog();

