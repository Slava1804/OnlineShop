const miniCatalogItems = [
  {
    id: 1,
    title: 'Jacket',
    cost: 1999,
    imageUrl: 'https://cdn.finnflare.com/upload/resize_cache/full_size/FAC/501/800_1200_2/FAC23004_501_20.jpg?cdn=1660894546',
  },
  {
    id: 2,
    title: 'Jacket',
    cost: 1999,
    imageUrl: 'https://cdn.finnflare.com/upload/resize_cache/full_size/FAC/501/800_1200_2/FAC23004_501_20.jpg?cdn=1660894546',
  },
  {
    id: 3,
    title: 'Jacket',
    cost: 1999,
    imageUrl: 'https://cdn.finnflare.com/upload/resize_cache/full_size/FAC/501/800_1200_2/FAC23004_501_20.jpg?cdn=1660894546',
  },
  {
    id: 4,
    title: 'Jacket',
    cost: 1999,
    imageUrl: 'https://cdn.finnflare.com/upload/resize_cache/full_size/FAC/501/800_1200_2/FAC23004_501_20.jpg?cdn=1660894546',
  },
];

function openCatalog(id = undefined) {
  location.href = 'catalog';
}

function openItem(id) {
  location.href = `product?id=${id}`;
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

    const itemElement = document.createElement('div');
    itemElement.classList.add('catalog-item');
    itemElement.appendChild(itemImageElement);
    itemElement.appendChild(itemTitleElement);
    itemElement.appendChild(itemCostElement);

    miniCatalog.appendChild(itemElement);
  }
}

drawMiniCatalog();
