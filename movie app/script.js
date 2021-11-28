const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const form = document.getElementById("form");
   getMovies(APIURL);


    async function getMovies(url){
        const resp = await fetch(url);
        const respData = await resp.json();
        
        showMovies(respData.results);
    }

    const main = document.querySelector('.images');
    function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average,overview} = movie;

         const movieEl = document.createElement("div");
         movieEl.classList.add("column");
       
       movieEl.innerHTML = `
       
            <div class="card">
                <div class="img">
               
                 <img src="${IMGPATH + poster_path}" alt="${title}">
                </div>
                <footer class="card-footer" style="background-color: #396EB0;">
                      <p  style="color:white ;">${title}</p>
                    <p class="card-footer-item">
                       <h1 style="padding-left:20px ;" class="${getClassByRate(
                        vote_average
                    )}">${vote_average}</h1>
                      </p>
                      
                </footer>  
            
                <p class="info">Info: ${overview}</p>
                </div>
        `;
        
      main.appendChild(movieEl);
    });

}


function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const searchTerm = search.value;
    
        if (searchTerm) {
            getMovies(SEARCHAPI + searchTerm);
    
            search.value = "";
        }
    });