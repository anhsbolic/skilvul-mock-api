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
  const image = document.querySelector('#file').files[0];
  const imageBase64 = await imageToBase64(image);
  data.image = imageBase64;
  delete data.file;
  console.log(data);
  postCreateProduct(data);
}

function postCreateProduct(data) {
  const loadingModal = document.getElementById('loadingModal');
  loadingModal.style.display = 'block';

  const url = 'https://6526dad7917d673fd76d1b74.mockapi.io/products';
  fetch(url, {
    method: 'POST',
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
