const base_url = "https://api.themoviedb.org/3";
const api_key = "api_key=be5484dd089336fe67ac9edc816f7583";
const img_url = "https://image.tmdb.org/t/p/w300";

const main = document.getElementById("main");

async function showFavorites() {
  const favoriteMovieIds =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  if (favoriteMovieIds.length === 0) {
    main.innerHTML =
      '<div class="empty">Você ainda não adicionou nenhum filme aos favoritos.</div>';
    return;
  }

  try {
    const movieDetails = [];
    for (const movieId of favoriteMovieIds) {
      try {
        const url = `${base_url}/movie/${movieId}?${api_key}`;
        const response = await axios.get(url);
        movieDetails.push(response.data);
      } catch (error) {
        console.error(
          `Erro ao obter detalhes do filme com ID ${movieId}:`,
          error
        );
      }
    }
    const favoriteMovies = movieDetails.map((movie) => {
      const { id, title, poster_path, vote_average, overview } = movie;
      return `
                <div class="movie" onclick="redirectToDetails(${id})">
                    <img src="${img_url + poster_path}" alt="${title}">
                    <div class="infos">
                        <div class="movie-info">
                            <h3>${title}</h3>
                            <span class="${getColor(
                              vote_average
                            )}">${vote_average}</span>
                        </div>
                        <div class="overview">
                            <h5>Sinopse</h5>
                            <p>${overview}</p>
                        </div>
                    </div>
                </div>
            `;
    });
    main.innerHTML = favoriteMovies.join("");
  } catch (error) {
    console.error(error);
    main.innerHTML =
      '<div class="error">Ocorreu um erro ao carregar os filmes favoritos.</div>';
  }
}

function redirectToDetails(movieId) {
  window.location.href = `detalhes/detalhes.html?id=${movieId}`;
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

showFavorites();
