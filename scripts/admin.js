// Admin Script
const movieForm = document.getElementById('movie-form');
const storedMovies = document.getElementById('stored-movies');

// Load stored movies on page load
document.addEventListener('DOMContentLoaded', loadStoredMovies);

// Handle form submission
movieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const movie = {
        id: Date.now(), // Unique ID for each movie
        title: document.getElementById('title').value,
        poster: document.getElementById('poster').value,
        overview: document.getElementById('overview').value,
        releaseDate: document.getElementById('release-date').value,
        rating: parseFloat(document.getElementById('rating').value),
    };

    saveMovie(movie);
    movieForm.reset();
    loadStoredMovies();
});

// Save movie to localStorage
function saveMovie(movie) {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
}

// Load stored movies from localStorage
function loadStoredMovies() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    storedMovies.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <button onclick="deleteMovie(${movie.id})">Delete</button>
        </div>
    `).join('');
}

// Delete a movie
function deleteMovie(id) {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies = movies.filter(movie => movie.id !== id);
    localStorage.setItem('movies', JSON.stringify(movies));
    loadStoredMovies();
}
