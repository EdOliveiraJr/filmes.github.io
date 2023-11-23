const base_url = "https://api.themoviedb.org/3";
const api_key = "api_key=be5484dd089336fe67ac9edc816f7583";
const api_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const img_url = "https://image.tmdb.org/t/p/w300";

const main = document.getElementById("main");

function getMovies(url) {
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      console.log(data.results);
      showMovies(data.results);
    })
    .catch((error) => console.error(error));
}

function addToFavorites(movieId) {
  const usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioLogado"));

  // Verificar se o filme já está na lista
  const isFavorite = checkIfFavorite(movieId);

  // verifica se esta logado
  if (!localStorage.getItem("usuarioLogado")) {
    window.location.href = "./login/login.html";
    alert("Você precisa estar logado!");
    return;
  }

  // Verifica se o filme já está na lista de favoritos
  let newFavoriteMovies = [];
  if (!isFavorite) {
    // Adiciona o filme à lista de favoritos
    newFavoriteMovies = usuarioAutenticado.favoriteMovies;
    newFavoriteMovies.push(movieId);
  } else {
    // Remove o filme da lista de favoritos
    usuarioAutenticado.favoriteMovies.filter((id) => id !== movieId);

    // Remove o filme da lista de favoritos
    newFavoriteMovies = usuarioAutenticado.favoriteMovies.filter(
      (id) => id !== movieId
    );
  }

  // Atualiza o localStorage
  localStorage.setItem(
    "usuarioLogado",
    JSON.stringify({ ...usuarioAutenticado, favoriteMovies: newFavoriteMovies })
  );

  // atualiza a lista de users
  const localUsers = JSON.parse(localStorage.getItem("usuarios"));
  const newUserList = localUsers.filter(
    (usuario) => usuario.email !== usuarioAutenticado.email
  );
  localStorage.setItem(
    "usuarios",
    JSON.stringify([...newUserList, usuarioAutenticado])
  );

  // Recarrega a página
  window.location.reload();
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    const isFavorite = checkIfFavorite(id);
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <a href="./detalhes/detalhes.html?id=${id}">
                <img src="${img_url + poster_path}" alt="${title}">
            </a>   
            <div class="infos">
                <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
                <span class="material-symbols-outlined ${
                  isFavorite ? "favorite" : "not-favorited"
                }" onclick="addToFavorites(${id})">
                    favorite
                </span>
            </div>
            <div class="overview">
                <h5>Sinopse</h5>
                <p>${overview}<p>
            </div>
            </div>    
        `;

    main.appendChild(movieEl);
  });
}

function checkIfFavorite(movieId) {
  //checagem se o filme está na lista de favoritos
  const usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioLogado"));
  return usuarioAutenticado
    ? usuarioAutenticado.favoriteMovies.includes(movieId)
    : false;
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

getMovies(api_url);
