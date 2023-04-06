const dataProduct = document.querySelector('#dataProduct');
const titleField = document.querySelector('#title_field');
const descriptionField = document.querySelector('#description_field');
const imageField = document.querySelector('#image_field');
const priceField = document.querySelector('#price_field');
const stockField = document.querySelector('#stock_field');
const categoryField = document.querySelector('#category_field');
const subcategoryField = document.querySelector('#subcategory_field');
const formSelector = document.querySelector('#form_selector');

if (dataProduct) {
  formSelector.setAttribute('action', '/admin/editProduct');
  const data = JSON.parse(dataProduct.value);
  titleField.value = data.title ? data.title : '';
  descriptionField.value = data.description ? data.description : '';
  imageField.value = data.image ? data.image : '';
  priceField.value = data.price ? data.price : '';
  stockField.value = data.stock ? data.stock : '';
  categoryField.value = data.category ? data.category : '';
  subcategoryField.value = data.subcategory ? data.subcategory : '';
}
