// Load Movies from localStorage
function loadMovies() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    displayMovies(movies);
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <a href="movie-detail.html?id=${movie.id}">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <h3>${movie.title}</h3>
            </a>
        </div>
    `).join('');
}

// Load Movie Details from localStorage
function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const movie = movies.find(m => m.id === movieId);

    if (movie) {
        displayMovieDetails(movie);
    }
}

function displayMovieDetails(movie) {
    const movieDetail = document.getElementById('movie-detail');
    movieDetail.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>
    `;
}

// Initialize
if (window.location.pathname.includes('movie-detail.html')) {
    loadMovieDetails();
} else {
    loadMovies();
}
