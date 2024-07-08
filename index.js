async function getRecommendation() {
  const url = "https://api.jikan.moe/v4/anime/1/recommendations";
  const recommendations = document.querySelector(".recommendations-viewer");
  let newData;
  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Reponse status: ${response.status}`);
    }
    const json = await reponse.json();
    let data = json.data;
    newData = data.slice(0, 10);
  } catch (error) {
    console.error(error.message);
  }

  newData.forEach((item) => {
    recommendations.innerHTML += `<div
          class="recommendation"
          style="background-image: url(${item.entry.images.webp.large_image_url})" onclick="newPage(${item.entry.mal_id})">
          <h1>${item.entry.title}</h1>
          <p>
            <button><img src="https://www.svgrepo.com/show/6905/play-button.svg"></button>
          </p>
        </div>`;
  });
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
  const genrelist = document.querySelector(".category-list");
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
  let loading = true;
  const url = "https://api.jikan.moe/v4/top/anime?filter=bypopularity";
  const popularPicks = document.querySelector(".popular-picks");
  let data;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    data = json.data;
    loading = false;
  } catch (error) {
    console.error(error.message);
  }

  data.forEach((item) => {
    popularPicks.innerHTML += `  <div class="pick" onclick="newPage(${item.mal_id})">
            <img src="${item.images.webp.large_image_url}" />
            
              <h2>${item.title_english}</h2>
              <p>See Title</p>
          
          </div>`;
  });
}

function newPage(id) {
  window.open(`animeDetails.html?id=${id}`, `_self`);
}

async function findGenreID() {
  console.log(inputEl.value);
  const genre = genreArr.find((item) => {
    return item.name === inputEl.value;
  });
  updateTitles(genre.mal_id);
  return;
  // const url = "https://api.jikan.moe/v4/genres/anime"
  // let genreID;
  // try {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }
  //   const json = await response.json();
  //   data = json.data;
  // } catch (error) {
  //   console.error(error.message);
  // }
  // data.forEach((item)=>{
  //   if (item.name === inputEl.value){
  //     genreID = item.mal_id;
  //   }
  // })
  updateTitles(genreID);
}

async function updateTitles(genreID) {
  const url = `https://api.jikan.moe/v4/anime?genres=${genreID}`;
  let html = "";
  let data;
  const newTitles = document.querySelector(".popular-picks");

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
  data.forEach((item) => {
    html += `<div class="pick" onclick="newPage(${item.mal_id})">
            <img src="${item.images.webp.large_image_url}" />
            
              <h2>${item.title}</h2>
              <p>See Title</p>
          
          </div>`;
  });
  newTitles.innerHTML = html;
}
getGenres();
getAnimeData();
getRecommendation();
