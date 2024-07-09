const genrelist = document.querySelector(".category-list");
const picksLoader = document.querySelector(".picks-loader") 
// used in getAnimeData() and updateTitles()

async function getRecommendation() {
  const url = "https://api.jikan.moe/v4/anime/1/recommendations";
  const recommendations = document.querySelector(".recommendations-viewer");
  const recommendationLoader = document.querySelector(".recommendation-loader")
  recommendationLoader.style.display = "flex";
  recommendations.style.display = "none"
  let newData;
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Reponse status: ${response.status}`);
    }
    const json = await reponse.json();
    let data = json.data;
    newData = data.slice(55,65);
  } catch (error) {
    console.error(error.message);
  }

  newData.forEach((item) => {
    recommendations.innerHTML += `<div
          class="recommendation"
          style="background: linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.6)), url('${item.entry.images.webp.large_image_url}')" onclick="newPage(${item.entry.mal_id})">
          <h1>${item.entry.title}</h1>
        </div>`;
  });
  recommendationLoader.style.display = "none";
  recommendations.style.display = "flex"
}

let genreArr = [];

async function getGenres() {
  const url = "https://api.jikan.moe/v4/genres/anime";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    genreArr = json.data;
    console.log(genreArr);
  } catch (error) {
    console.error(error.message);
  }
}

const inputEl = document.getElementById("category-input");
inputEl.addEventListener("input", onInputText);

function onInputText(e) {
  const value = e.target.value.toLowerCase();
  let filteredGenres = [];

  if (value.length === 0) {
    return createGenreDropDown(filteredGenres);
  }

  genreArr.forEach((item) => {
    if (item.name.substr(0, value.length).toLowerCase() === value)
      filteredGenres.push(item.name);
  });
  createGenreDropDown(filteredGenres);
}

function createGenreDropDown(list) {
  let html = "";
  genrelist.style.display = 'block';
  list.forEach((item) => {
    html += `
    <li onclick="autoComplete('${item}')">${item}</li>`;
  });
  genrelist.innerHTML = html;
}

function autoComplete(category) {
  inputEl.value = category;
}

async function getAnimeData() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=bypopularity";
  const popularPicks = document.querySelector(".popular-picks");
  const titleName = document.querySelector("#category-title span");

  popularPicks.style.display = "none"
  picksLoader.style.display = "flex"
  
  let html = "";
  let data;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    data = json.data;
  } catch (error) {
    console.error(error.message);
  }
  titleName.innerHTML = `Popular Titles`;
  data.forEach((item) => {
    html += `  <div class="pick" onclick="newPage(${item.mal_id})">
            <img src="${item.images.webp.large_image_url}" />
            
              <h2>${item.title_english}</h2>
              <p>See Title</p>
          
          </div>`;
  });
  popularPicks.innerHTML = html;
  popularPicks.style.display = "flex"
  picksLoader.style.display = "none"
}

function newPage(id) {
  window.open(`animeDetails.html?id=${id}`, `_self`);
}

async function findGenreID() {
  const genre = genreArr.find((item) => {
    return item.name.toLowerCase() === inputEl.value.toLowerCase();
  });
  updateTitles(genre.mal_id, genre.name);
  return;
}

async function updateTitles(genreID, genreName) {
  const url = `https://api.jikan.moe/v4/anime?genres=${genreID}`;
  let html = "";
  let data;
  const newTitles = document.querySelector(".popular-picks");
  const titleName = document.querySelector("#category-title span");
  newTitles.style.display = "none"
  picksLoader.style.display = "flex"
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    data = json.data;
  } catch (error) {
    console.error(error.message);
  }
  titleName.innerHTML = `${genreName} Titles`;
  data.forEach((item) => {
    html += `<div class="pick" onclick="newPage(${item.mal_id})">
            <img src="${item.images.webp.large_image_url}" />
            
              <h2>${item.title}</h2>
              <p>See Title</p>
          
          </div>`;
  });
  newTitles.innerHTML = html;
  inputEl.value = "";
  genrelist.style.display = 'none'
  newTitles.style.display = "flex"
  picksLoader.style.display = "none"
}

getGenres();
getRecommendation();
getAnimeData();