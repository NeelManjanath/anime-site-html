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
    newData = data.slice(115,125);
    console.log(newData);
    // console.log(recommendations);
  } catch (error) {
    console.error(error.message);
  }

  newData.forEach((item) => {
    recommendations.innerHTML += `<div
          class="recommendation"
          style="
            background-image: url(${item.entry.images.webp.large_image_url})"
        >
          <h1>${item.entry.title}</h1>
          <p>
            <button><img src="https://www.svgrepo.com/show/6905/play-button.svg"></button>
          </p>
        </div>`;
  });
}

async function getGenre() {
  const url = "https://api.jikan.moe/v4/genres/anime";
  const categories = document.querySelector(".quick-search");
  let newData;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    data = json.data;
    newData = data.slice(0, 10);
    // console.log(newData);
  } catch (error) {
    console.error(error.message);
  }

  newData.forEach((item) => {
    categories.innerHTML += `
    <div class="pick-category">${item.name}</div>`;
  });
}

async function getAnimeData() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=bypopularity";
  const popularPicks = document.querySelector(".popular-picks");
  // let html = "";
  let data;
  try {
    const response = await fetch(url);
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    data = json.data;
    // console.log(data);
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

function newPage(id){
  window.open(`animeDetails.html?id=${id}`, `_self`);
}

getGenre();
getAnimeData();
getRecommendation();