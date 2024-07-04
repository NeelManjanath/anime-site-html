async function getGenre(){
  const url = "https://api.jikan.moe/v4/genres/anime"
  const categories = document.querySelector(".quick-search");
  try{
    const response = await fetch(url);
    if (!response.ok){
      throw new Error(`Response status: $response.status}`);
    }
    const json = await response.json();
    data = json.data;
    console.log(data);  
  } catch (error) {
    console.error(error.message);
  }
  data.forEach((item) => {
    categories.innerHTML += `
    <div class="pick-category">${item.name}</div>`;
  })
}






async function getAnimeData() {
  const url = "https://api.jikan.moe/v4/anime";
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
    popularPicks.innerHTML += `  <div class="pick">
            <img src="${item.images.jpg.large_image_url}" />
            
              <h2>${item.title}</h2>
              <p>About Title</p>
          
          </div>`;
  });

  // popularPicks.innerHTML = html;
}
getGenre();
getAnimeData();
