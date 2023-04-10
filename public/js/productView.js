async function sendComment() {
  const productoId = document.querySelector('#comment-pid');
  const text = document.querySelector('#comment-text');

  const data = {
    productId: productoId.value,
    text: text.value,
  };

  const response = await fetch('http://localhost:8040/admin/post-comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const dataresponse = await response.json();

  if (dataresponse) {
    window.location.reload();
  }
}
