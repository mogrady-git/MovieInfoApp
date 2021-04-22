// Here is your key: 1a265945
//  Please append it to all of your API requests,
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=1a265945
// Click the following URL to activate your key: http://www.omdbapi.com/apikey.aspx?VERIFYKEY=e40a8e99-f7a2-4674-be76-1936657cb409
// If you did not make this request, please disregard this email.


// Title: the saint year: 1997
// http://www.omdbapi.com/?t=the+saint&y=1997&plot=full&apikey=1a265945

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=1a265945')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId + '&plot=full' + '&apikey=1a265945')
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Year:</strong> ${movie.Year}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
              <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>
              <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
              <li class="list-group-item"><strong>imdbRating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>imdbVotes:</strong> ${movie.imdbVotes}</li>
              <li class="list-group-item"><strong>imdbID:</strong> ${movie.imdbID}</li>
              <li class="list-group-item"><strong>Type:</strong> ${movie.Type}</li>
              <li class="list-group-item"><strong>DVD:</strong> ${movie.DVD}</li>
              <li class="list-group-item"><strong>BoxOffice:</strong> ${movie.BoxOffice}</li>
              <li class="list-group-item"><strong>Production:</strong> ${movie.Production}</li>
              <li class="list-group-item"><strong>Website:</strong> ${movie.Website}</li>
              <li class="list-group-item"><strong>Response:</strong> ${movie.Response}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}