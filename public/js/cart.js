async function removeProduct(id) {
  await fetch('http://localhost:8040/remove-product/' + id, {
    method: 'DELETE',
  })
    .then(data => data.json())
    .then(data => {
      window.location.reload();
    });
}

async function handlerQuantityProduct(id, increase) {
  await fetch('http://localhost:8040/cart/change-quantity', {
    method: 'PUT',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({type: increase ? 'increase' : 'decrease', id}),
  })
    .then(data => data.json())
    .then(data => {
      window.location.reload();
    });
}

function goPurchase(id){
  window.location.href = '/cart/purchase/' + id;
}
