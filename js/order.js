function getOrders() {
  const loadingModal = document.getElementById('loadingModal');
  loadingModal.style.display = 'block';

  const url = 'https://6526dad7917d673fd76d1b74.mockapi.io/orders';
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
      throw new Error('Failed to fetch orders');
    })
    .then((orders) => {
      console.log(orders);
      setOrders(orders);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingModal.style.display = 'none';
    });
}

function orderComponent(index, order) {
  return `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${order.productName}</td>
      <td>${order.quantity}</td>
      <td>$${order.price}</td>
      <td>$${order.total}</td>
    </tr>
  `;
}

function setOrders(orders) {
  const elmTableBody = document.getElementById('table-order-body');
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    elmTableBody.innerHTML += orderComponent(i, order);
  }
}

getOrders();
