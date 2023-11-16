let emailInput = document.getElementById("inputLogin");
let senhaInput = document.getElementById("inputPassord");
let emailError = document.getElementById("inputLoginError");
let senhaError = document.getElementById("inputPassordError");

function autenticarUsuario(email, senha) {
  const usuariosString = localStorage.getItem('usuarios');
  const usuarios = usuariosString ? JSON.parse(usuariosString) : [];

  const usuarioAutenticado = usuarios.find(usuario => usuario.email === email);

  if (usuarioAutenticado && usuarioAutenticado.senha === senha) {
    return true; 
  } else {
    return false; 
  }
}

function validarEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function login () {
  let emailValido = validarEmail(emailInput.value);
  
  if(!emailValido) {
    emailError.innerHTML = 'O Email não é válido !'
  } else {
    emailError.innerHTML = '';
  }

  if(senhaInput.value.length < 4) {
    senhaError.innerHTML = 'Senha precisa ser maior que 4 dígitos'
  } else {
    senhaError.innerHTML = ''
  }

  if(autenticarUsuario(emailInput.value, senhaInput.value)) {
    window.location.href = "../index.html";
  } else {
    alert("E-mail ou senha incorretos. Tente novamente.");
  }
}