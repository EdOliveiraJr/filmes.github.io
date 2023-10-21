const base_url = 'https://api.themoviedb.org/3';
const api_key = 'api_key=be5484dd089336fe67ac9edc816f7583';
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;

function  getMovies(url) {
    axios.get(url)
        .then(response => {
            const data = response;
            console.log(data);
            render.textContent = JSON.stringify(data);
        })
        .catch(error => console.error(error));
}

getMovies(api_url);