function logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/index.html';
}