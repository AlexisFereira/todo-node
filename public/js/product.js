const decreaseBtn = document.querySelector('#decrease-amount');
const amountVal = document.querySelector('#amount-printed');
const increaseBtn = document.querySelector('#increase-amount');
const productAmount = document.querySelector('#product-amount');
const productTotal = document.querySelector('#product-total');
const productPrice = document.querySelector('#product-total').value;
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
  fetch('/admin/deleteProduct/' + id, {method: 'DELETE'})
}
