const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const productElement = document.getElementById('product');
productElement.innerText = `PRODUCT #${id}`;
