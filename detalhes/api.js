const base_url = 'https://api.themoviedb.org/3';
const api_key = 'be5484dd089336fe67ac9edc816f7583';
const img_url = 'https://image.tmdb.org/t/p/w300';

// Função para obter o ID do filme da URL
function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchMovieDetails(movieId) {
    try {
      axios.get(`${base_url}/movie/${movieId}?api_key=${api_key}`)
      .then(response => {
        const data = response.data;
        console.log(data);
        displayMovieDetails(data)
      }).catch(error => console.error(error));
    } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error.message);
    }
}

function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = `
    
    <div class="card-container" id="movieDetails">
        <div class="image-container">
          <a href="../index.html">
              <span class="material-symbols-outlined">
                  arrow_back
              </span>
          </a>
          <img src="${img_url+movie.poster_path}" alt="${movie.title} class="card-image" id="moviePoster">
        </div>
        <div class="movie-details">
          <div class="movie-details-top">
            <h2 class="card-title" id="movieTitle">${movie.title}</h2>
            <h5>Genres: ${movie.genres.map(genre => genre.name)}</h5>
            <p class="card-description" id="movieOverview">
              ${movie.overview} 
              ${movie.homepage && `Mais informações <a href="${movie.homepage}">aqui.</a>`}
            </p>
          </div>
          <div class="movie-details-botton">
            <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
            <p  id="movieRating"><strong>Nota:</strong> ${movie.vote_average}</p>
          </div>
        </div>
    </div>
    `;
}

// Obtém o ID do filme da URL e exibe os detalhes
const movieId = getMovieIdFromUrl();
if (movieId) {
    fetchMovieDetails(movieId);
} else {
    console.error('ID do filme não encontrado na URL.');
}
