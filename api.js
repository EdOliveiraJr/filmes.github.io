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
  // Verifica se já existem filmes favoritos no localStorage
  let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  // Verificar se o filme já está na lista
  const isFavorite = checkIfFavorite(movieId);

  // Verifica se o filme já está na lista de favoritos
  if (!isFavorite) {
    // Adiciona o filme à lista de favoritos
    favoriteMovies.push(movieId);
    // Atualiza o localStorage com a nova lista de favoritos
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

    console.log(`Filme ${movieId} adicionado aos favoritos`);
  } else {
    // Remove o filme da lista de favoritos
    favoriteMovies = favoriteMovies.filter((id) => id !== movieId);
    // Atualiza o localStorage com a nova lista de favoritos
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

    console.log(`Filme ${movieId} removido dos favoritos`);
  }
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    const isFavorite = checkIfFavorite(id);
    movieEl.classList.add("movie");

    // Cria um link para a página de detalhes do filme com o ID do filme como parâmetro
    movieEl.addEventListener(
      "click",
      () => (window.location.href = `detalhes/detalhes.html?id=${id}`)
    );
    movieEl.innerHTML = `
            <img src="${img_url + poster_path}" alt="${title}">
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
  const favoriteMovieIds =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  return favoriteMovieIds.includes(movieId);
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
