const base_url = 'https://api.themoviedb.org/3';
const api_key = 'api_key=be5484dd089336fe67ac9edc816f7583';
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
const img_url = 'https://image.tmdb.org/t/p/w300';

const main = document.getElementById('main')

function  getMovies(url) {
    axios.get(url)
        .then(response => {
        const data = response.data;
            console.log(data.results);
            showMovies(data.results);
        })
        .catch(error => console.error(error));
}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('mb-4');
        movieEl.innerHTML = `
            <div class="card h-100 filmes">
            <img src="${img_url+poster_path}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${overview}"</p>
            </div>   
            </div> 
        `;

        main.appendChild(movieEl);
    });
}

function getColor(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

getMovies(api_url)