let inputNome = document.getElementById("inputNome");
let inputNomeError = document.getElementById("inputNomeError");
let inputEmail = document.getElementById("inputEmail");
let inputEmailError = document.getElementById("inputEmailError");
let inputSenha = document.getElementById("inputSenha");
let inputSenhaError = document.getElementById("inputSenhaError");

function limparForm() {
  inputNome.value = "";
  inputEmail.value = "";
  inputSenha.value = "";
}

function validarEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validaCampos() {
  let isValid = true;
  if (inputNome.value.length < 3) {
    inputNomeError.innerHTML = "Nome muito curto !";
    isValid = false;
  } else {
    inputNomeError.innerHTML = "";
  }

  let emailValido = validarEmail(inputEmail.value);

  if (!emailValido) {
    inputEmailError.innerHTML = "Email inválido !";
    isValid = false;
  } else {
    inputEmailError.innerHTML = "";
  }

  if (inputSenha.value.length < 4) {
    inputSenhaError.innerHTML = "A senha precisa conter 4 dígitos !";
    isValid = false;
  } else {
    inputSenhaError.innerHTML = "";
  }

  return isValid;
}

function verificaEmail(email) {
  const usuariosString = localStorage.getItem("usuarios");
  const usuarios = usuariosString ? JSON.parse(usuariosString) : [];

  return usuarios.some((usuario) => usuario.email === email);
}

function cadastrar() {
  let isValidForm = validaCampos();
  let emailEmUso = verificaEmail(inputEmail.value);

  if (emailEmUso) {
    alert("Este email já esta em uso, deseja realizar login ?");
    return;
  }

  if (isValidForm) {
    const nome = inputNome.value;
    const email = inputEmail.value;
    const senha = inputSenha.value;
    const fotoUrl = "";

    const novoUsuario = {
      id: Math.random().toString(),
      nome,
      email,
      senha,
      fotoUrl,
      favoriteMovies: [],
    };

    const usuariosString = localStorage.getItem("usuarios");
    const usuarios = usuariosString ? JSON.parse(usuariosString) : [];
    usuarios.push(novoUsuario);

    const usuariosStringNova = JSON.stringify(usuarios);
    localStorage.setItem("usuarios", usuariosStringNova);

    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    limparForm();
    window.location.href = "../index.html";
  }
}
