// get product id from query params
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product_id');

// get product detail
function getProductDetail(productId) {
  const loadingModal = document.getElementById('loadingModal');
  loadingModal.style.display = 'block';

  const url = `https://6526dad7917d673fd76d1b74.mockapi.io/products/${productId}`;
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to fetch product');
    })
    .then((product) => {
      console.log(product);
      setProduct(product);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingModal.style.display = 'none';
    });
}

function setProduct(product) {
  const elmProductImage = document.getElementById('product-img');
  elmProductImage.src = product.image;

  const elmProductTitle = document.getElementById('product-title');
  elmProductTitle.innerText = product.name;

  const elmProductDescription = document.getElementById('product-description');
  elmProductDescription.innerText = product.description;

  const elmProductPrice = document.getElementById('input-price');
  elmProductPrice.setAttribute('value', product.price);
}

// on input quantity change
function onQuantityChange() {
  const elmPrice = document.getElementById('input-price');
  const elmTotal = document.getElementById('input-total');

  const quantity = parseInt(elmQuantity.value);
  const price = parseInt(elmPrice.value);

  elmTotal.setAttribute('value', parseInt(quantity * price));
}

const elmQuantity = document.getElementById('input-quantity');
elmQuantity.addEventListener('input', onQuantityChange);

// run
getProductDetail(productId);

// on button click
function buyProduct() {
  const loadingModal = document.getElementById('loadingModal');
  loadingModal.style.display = 'block';

  const elmProductTitle = document.getElementById('product-title');
  const elmQuantity = document.getElementById('input-quantity');
  const elmPrice = document.getElementById('input-price');

  const productName = elmProductTitle.innerText;
  const quantity = parseInt(elmQuantity.value);
  const price = parseInt(elmPrice.value);
  const total = parseInt(quantity * price);

  const url = `https://6526dad7917d673fd76d1b74.mockapi.io/orders`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productName: productName,
      quantity: quantity,
      price: price,
      total: total,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to buy product');
    })
    .then((order) => {
      console.log(order);
      window.location.href = 'order.html';
    })
    .catch((error) => {
      console.log(error);
      loadingModal.style.display = 'none';
    });
}

const elmBtnBuy = document.getElementById('btn-buy');
elmBtnBuy.addEventListener('click', buyProduct);
