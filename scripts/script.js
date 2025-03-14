// Fetch Movies from API (e.g., TMDb)
const apiKey = 'YOUR_TMDB_API_KEY';
const movieList = document.getElementById('movie-list');

async function fetchMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    movieList.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <a href="movie-detail.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy">
                <h3>${movie.title}</h3>
            </a>
        </div>
    `).join('');
}

// Fetch Movie Details
const movieDetail = document.getElementById('movie-detail');

async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const data = await response.json();
    displayMovieDetails(data);
}

function displayMovieDetails(movie) {
    movieDetail.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
    `;
}

// Initialize
if (window.location.pathname.includes('movie-detail.html')) {
    fetchMovieDetails();
} else {
    fetchMovies();
}
