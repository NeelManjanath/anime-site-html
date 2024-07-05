function getID(){
    let params = new URL(document.location).searchParams;
    return params.get("id")
    
}


async function getAnimeDetails(){
    const id = getID();
    const url = `https://api.jikan.moe/v4/anime/${id}`;
    const titlemain = document.querySelector('.title-main');
    console.log(titlemain);
    let data;
    try {
        const response = await fetch(url);
        // console.log(response);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        data = json.data;
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }

      
    titlemain.innerHTML += `
        <div class="title-poster">
          <img src="${data.images.webp.large_image_url}" />
        </div>
        <div class="title-details">
          <h6>${data.type} | ${data.year}</h6>
          <h1>${data.title_english}</h1>
          <ul>
            <li><h4>Ranking</h4> <span>${data.rank}</span></li>
            <li><h4>Popularity</h4> <span>${data.popularity}</span></li>
            <li><h4>Rating</h4> <span>${data.rating}</span></li>
          </ul>
          <div>
            <p>
              ${data.synopsis}
            </p>
          </div>
          <div class="trailer">
            <iframe
              src="${data.trailer.embed_url}"
            >
            </iframe>
          </div>
        </div>
        `;

}


getAnimeDetails();