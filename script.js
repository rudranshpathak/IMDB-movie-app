const apiKeyInput = document.getElementById('apiKey');
const movieTitleInput = document.getElementById('movieTitle');
const searchBtn = document.getElementById('searchBtn');
const loader = document.getElementById('loader');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', () => {
    const apiKey = '6b2afcf';
    const movieTitle = movieTitleInput.value.trim();

    if (apiKey === '' || movieTitle === '') {
        alert('Please fill in both fields.');
        return;
    }

    loader.style.display = 'block';
    resultsContainer.innerHTML = '';

    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            if (data.Response === 'True') {
                const movies = data.Search;
                movies.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.className = 'movie-card';

                    const poster = document.createElement('img');
                    poster.src = movie.Poster === 'N/A' ? 'https://www.google.com/search?sca_esv=556275851&rlz=1C1CHBF_enIN988IN988&sxsrf=AB5stBggGdT4-GIu3KojoXPbv6WoiRo7ig:1691838702942&q=Jurassic+Park&stick=H4sIAAAAAAAAAONgFuLWz9U3MDQwqrIoSFbiAHEyKkwqtaSyk6300zJzcsFEfHFqUWZqsRWIXbyIldertCixuDgzWSEgsSgbABYQWUhFAAAA&sa=X&ved=2ahUKEwjTtp-n_taAAxWiUGwGHfhaBD0Q9OUBegQIHxAD' : movie.Poster;
                    poster.alt = movie.Title;

                    const title = document.createElement('div');
                    title.className = 'movie-title';
                    title.textContent = movie.Title;

                    const year = document.createElement('div');
                    year.textContent = movie.Year;

                    const moreDetails = document.createElement('div');
                    moreDetails.className = 'more-details';
                    moreDetails.textContent = 'More Details';
                    moreDetails.addEventListener('click', () => {
                        window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank');
                    });

                    movieCard.appendChild(poster);
                    movieCard.appendChild(title);
                    movieCard.appendChild(year);
                    movieCard.appendChild(moreDetails);

                    resultsContainer.appendChild(movieCard);
                });
            } else {
                alert('No movies found. Please try again.');
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Error fetching data:', error);
            alert('An error occurred. Please check your API key and try again.');
        });
});
