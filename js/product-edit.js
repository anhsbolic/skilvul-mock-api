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
  const elmImgPreview = document.getElementById('preview');
  elmImgPreview.setAttribute('src', product.image);
  elmImgPreview.style.display = 'block';

  const elmInputName = document.getElementById('input-name');
  elmInputName.setAttribute('value', product.name);

  const elmInputDescription = document.getElementById('input-description');
  elmInputDescription.innerText = product.description;

  const elmInputPrice = document.getElementById('input-price');
  elmInputPrice.setAttribute('value', product.price);
}

getProductDetail(productId);

function previewImage() {
  const preview = document.querySelector('#preview');
  const file = document.querySelector('#file').files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    function () {
      preview.src = reader.result;
      preview.style.display = 'block';
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  handleFormData(formData);
});

async function handleFormData(formData) {
  const data = formDataToJson(formData);
  const files = document.querySelector('#file').files;
  if (files && files.length > 0) {
    const image = files[0];
    const imageBase64 = await imageToBase64(image);
    data.image = imageBase64;
  } else {
    const elmImgPreview = document.getElementById('preview');
    data.image = elmImgPreview.getAttribute('src');
  }
  delete data.file;
  console.log(data);
  putEditProduct(data);
}

function putEditProduct(data) {
  const loadingModal = document.getElementById('loadingModal');
  loadingModal.style.display = 'block';

  const url = `https://6526dad7917d673fd76d1b74.mockapi.io/products/${productId}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = 'product.html';
      }
      throw new Error('Failed to create product');
    })
    .catch((error) => {
      console.log(error);
      loadingModal.style.display = 'none';
    });
}
