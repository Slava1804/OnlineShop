document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    // Получение информации о товаре
    fetch('/get_product_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: productId })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('product-title').innerText = data.title;
      document.getElementById('product-price').innerText = `Цена: ${data.price}р`;
      document.getElementById('product-image').src = data.imageurl;
    })
    .catch(error => console.error('Ошибка получения информации о товаре:', error));
  
    // Обработка нажатия кнопки "Добавить в корзину"
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
      // Получаем текущее содержимое корзины из локального хранилища
      let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {};
  
      // Проверяем, есть ли уже такой товар в корзине
      if (productId in cartItems) {
        // Если товар уже есть в корзине, увеличиваем количество
        cartItems[productId] += 1;
      } else {
        // Если товара еще нет в корзине, добавляем его
        cartItems[productId] = 1;
      }
  
      // Сохраняем обновленное содержимое корзины в локальном хранилище
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
      // Оповещение пользователя об успешном добавлении товара в корзину
      // alert('Товар успешно добавлен в корзину');
      document.getElementById('success-message').style.display = 'block'
      setTimeout(function() {
        document.getElementById('success-message').style.display = 'none';
    }, 3000); // Скрываем сообщение через 3 секунды (3000 миллисекунд)
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const sizeLabels = document.querySelectorAll('.size-label');
    sizeLabels.forEach(function(label) {
      label.addEventListener('click', function() {
        sizeLabels.forEach(function(label) {
          label.classList.remove('selected');
        });
        label.classList.add('selected');
      });
    });
  });
  