const search = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
search.addEventListener("click", function () {
  function getMovie(url, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          success(xhr.responseText);
        } else if (this.status === 404) {
          error();
        }
      }
    };
    xhr.open("get", url, true);
    xhr.send();
  }
  getMovie(
    `http://www.omdbapi.com?apikey=c295e890&s=${searchInput.value}`,
    (result) => {
      const movie = JSON.parse(result);
      const data = movie.Search;
      // console.log(data);
      let movieList = '';
      data.forEach(function (m) {
        movieList += `
        <div class="col-md-3">
        <div class="card mb-3">
        <img class="card-img-top" src="${m.Poster}">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="card-link card-detail" data-toggle="modal" data-target="#exampleModalCenter" data-id="${m.imdbID}">Show Details</a>
        </div>
        </div>
        </div>
        `;
      });
      document.querySelector('.movie-list').innerHTML = movieList;
      const cartDetail = document.querySelectorAll('.card-detail');
      cartDetail.forEach(function(btn){
        btn.addEventListener('click', function () {
          function getcard(url, sucess, eror) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
              if (this.readyState === 4) {
                if (this.status === 200) {
                  sucess(xhr.responseText);
                } else if (this.status === 404) {
                  eror();
                }
              }
            }
            xhr.open("get", url, true);
            xhr.send();
          };
          getcard(`http://www.omdbapi.com?apikey=c295e890&i=${this.dataset.id}`, result => {
            const movies = JSON.parse(result);
            // console.log(movies);
            let cards = '';
            cards += `
              <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${movies.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <h4>${movies.Title} ${movies.Year}</h4>
                    </li>
                    <li class="list-group-item"><strong>Director : </strong>${movies.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${movies.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${movies.Writer}</li>
                    <li class="list-group-item"><strong>Plot</strong><br>${movies.Plot}</li>
                  </ul>
                </div>
              </div>
              </div>
              `;
            // movies.forEach(function (m) {
              
            // });
            document.querySelector('.modal-body').innerHTML = cards;
          }, () => {
  
          });
        });
      });
    },
    () => { }
  );
});