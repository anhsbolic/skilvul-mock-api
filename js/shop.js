function getProducts() {
  const loadingModal = document.getElementById('loadingModal');
  loadingModal.style.display = 'block';

  const url = 'https://6526dad7917d673fd76d1b74.mockapi.io/products';
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
      throw new Error('Failed to fetch products');
    })
    .then((products) => {
      console.log(products);
      setProducts(products);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingModal.style.display = 'none';
    });
}

function productComponent(product) {
  return `
    <div class="card" style="width: 200px;">
      <img src="${product.image}" class="card-img-top product-img" alt="...">
      <div class="card-body product-info">
          <hs class="card-title">${product.name}</hs>
          <p class="card-text">${product.description}</p>
          <p class="card-text">$${product.price}</p>
          <a href="buy.html?product_id=${product.id}" class="btn btn-primary mt-2 float-right">Buy Now</a>
      </div>
    </div>
  `;
}

function setProducts(products) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  products.forEach((product) => {
    const productHtml = productComponent(product);
    productsContainer.innerHTML += productHtml;
  });
}

getProducts();
