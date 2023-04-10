
const decreaseBtn = document.querySelector('#decrease-amount');
const amountVal = document.querySelector('#amount-printed');
const increaseBtn = document.querySelector('#increase-amount');
const productAmount = document.querySelector('#product-amount');
const productTotal = document.querySelector('#product-total');
const productPrice = document.querySelector('#product-total').value || 0;
const printTotal = document.querySelector('#print-total');

decreaseBtn.addEventListener('click', function () {
  let amount = parseInt(amountVal.innerHTML);
  if (amount === 1) {
    decreaseBtn.setAttribute('disabled', true);
    return;
  }
  amount--;
  productAmount.value = amount;
  productTotal.value = productPrice * amount;
  printTotal.innerHTML = productPrice * amount;
  amountVal.innerHTML = amount;
});

increaseBtn.addEventListener('click', function () {
  let amount = parseInt(amountVal.innerHTML);
  amount++;
  decreaseBtn.removeAttribute('disabled');
  productAmount.value = amount;
  amountVal.innerHTML = amount;
  productTotal.value = productPrice * amount;
  printTotal.innerHTML = productPrice * amount;
});

function editProduct(id) {
  window.location.href = '/admin/edit/' + id;
}

function deleteProduct(id) {
  const inputData = document.getElementById(id);
  const data = JSON.parse(inputData.value);
  const img = document.getElementById('img-preview');
  const title = document.getElementById('title-preview');
  const idToDelete = document.getElementById('id-todelete');
  img.setAttribute('src', './img/products/' + data.image + '.jpeg');
  title.innerText = data.title;
  idToDelete.value = id;
}

async function confirmDelete() {
  const idToDelete = document.getElementById('id-todelete').value;
  await fetch('http://localhost:8040/admin/deleteProduct/' + idToDelete, {
    method: 'DELETE',
  })
    .then(data => data.json())
    .then(data => {
      window.location.reload();
    });
}
