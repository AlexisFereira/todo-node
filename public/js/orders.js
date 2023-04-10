function getOrderDetail(id) {
  window.location.href = 'http://localhost:8040/orders/' + id;
}

async function changeState(state) {
  const orderId = document.querySelector('#orderId');
  const response = await fetch(
    `http://localhost:8040/orders/${orderId.value}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({state: state}),
    }
  );
  //console.log(await response.json());
  window.location.reload();
}
