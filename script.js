const inputField = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");
const resultCard = document.getElementById("result-card");
const clearBtn = document.getElementById("clear-btn");

const render = (data) => {
     console.log(data);
     const h2 = document.createElement("h2");
     h2.textContent = `${data.results[0].title}`;
     h2.className = "h2-element";
     resultCard.appendChild(h2);
     const p = document.createElement("p");
     p.className = "bio";
     p.textContent = `${data.results[0].overview}`;
     resultCard.appendChild(p);
     const img = document.createElement("img");
     img.src = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
     resultCard.appendChild(img);
     const p2 = document.createElement("p");
     p2.textContent = `Rlease Date: ${data.results[0].release_date}`;
     p2.className = "release-date";
     resultCard.appendChild(p2);
     const p3 = document.createElement("p");
     p3.className = "popularity";
     p3.textContent = `Popularity: ${data.results[0].popularity}`;
     resultCard.appendChild(p3);
};

const searchMovie = async () => {
     try {
        resultCard.innerHTML = "";
          const value = inputField.value.trim().toLowerCase();
          const res = await fetch(
               `https://api.themoviedb.org/3/search/movie?api_key=db0e76a2eafe58723affa37dd9a5bc7e&query=${value}`
          );
          if (!res.ok) {
               throw new Error("Network response was not ok");
          }
          const data = await res.json();
          if (data.results.length === 0) {
               resultCard.innerHTML = `<p>No results found</p>`;
               return;
          }
          render(data);
     } catch (error) {
          console.error("Error fetching movie data:", error);
          resultCard.innerHTML =
               "<p>Something went wrong. Please try again later.</p>";
     }
};
searchBtn.addEventListener("click", searchMovie);
clearBtn.addEventListener("click", clearFunct);
const clearFunct = () => {
    resultCard.innerHTML = "";
    inputField.value = "";
};
