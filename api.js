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
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${img_url+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}<p>
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