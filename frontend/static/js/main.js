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

let favoriteItems = [];

function openCatalog(id = undefined) {
  location.href = 'catalog';
}

function openItem(id) {
  location.href = `product?id=${id}`;
}

function addToFavorites(itemId) {
  if (!favoriteItems.includes(itemId)) {
    // Добавляем товар в список избранных
    favoriteItems.push(itemId);
    console.log(`Item ${itemId} added to favorites!`);
  } else {
    console.log(`Item ${itemId} is already in favorites!`);
  }
}

function removeFromFavorites(itemId) {
  // Проверяем, что товар присутствует в списке избранных
  const index = favoriteItems.indexOf(itemId);
  if (index !== -1) {
    // Удаляем товар из списка избранных
    favoriteItems.splice(index, 1);
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

    const heartSVG = document.createElement('img');
    heartSVG.classList.add('heart-icon');
    heartSVG.src = '/static/assets/icons/favorite.svg'; // Замените 'path/to/heart.svg' на путь к вашему SVG-изображению
    heartSVG.addEventListener('click', function() {
      if (heartSVG.classList.contains('favorited')) {
        heartSVG.src = '/static/assets/icons/favorite.svg';
        heartSVG.classList.remove('favorited');
        removeFromFavorites(item.id);
      } else {
        heartSVG.src = '/static/assets/icons/favoriteFill.svg';
        heartSVG.classList.add('favorited');
        addToFavorites(item.id);
      }
    });
    

    const itemElement = document.createElement('div');
    itemElement.classList.add('catalog-item');
    itemElement.appendChild(itemImageElement);
    itemElement.appendChild(itemTitleElement);
    itemElement.appendChild(itemCostElement);
    itemElement.appendChild(heartSVG); // Добавляем изображение сердца в элемент товара


    miniCatalog.appendChild(itemElement);
  }
}

drawMiniCatalog();

