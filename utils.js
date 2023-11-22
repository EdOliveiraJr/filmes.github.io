function logOut(){
  localStorage.setItem('usuarioLogado', '');
  window.location.href = "./login/login.html";
}