const apiKey = 'ad7277c80ee8e0cd4be17ac0d59f2d39';
const baseUrl = 'https://api.themoviedb.org/3'
const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=pl-PL?&api_key='
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const searchUrl = baseUrl + '/search/movie?language=pl-PL?&api_key=' + apiKey;
const url=apiUrl+apiKey;

const main = document.getElementById("main");
const form = document.getElementById("szukaj");
const search = document.getElementById("search");




function getMovies(api){
    fetch(api).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

getMovies(url);


function getColor(value){
    if (value >= 7.5){
        return 'green';
    } else if(value >= 4){
        return 'orange';
    } else{
        return 'red';
    }
}


function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        
    const movieEl = document.createElement('div');
    const {title, poster_path, vote_average, overview} = movie;
    movieEl.classList.add('movie')
    movieEl.innerHTML=`
    <img src="${imgUrl+poster_path}" alt="image">
        
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${Math.round(vote_average * 10)/10}</span>
    </div>

    <div class="overview">
        <h3>Opis</h3>
        ${overview}
    </div>
    `

    main.appendChild(movieEl);

    })
}

if(form){
    addEventListener('submit', (e) => {
        e.preventDefault(form);
        let value=search.value;
        getMovies(searchUrl+'&query='+value)
        
    });
} else{
    getMovies(url);
}
