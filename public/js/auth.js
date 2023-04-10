async function logOut() {
  const response = await fetch('http://localhost:8040/logout', {
    method: 'POST',
  });
  window.location.href = '/';
}
