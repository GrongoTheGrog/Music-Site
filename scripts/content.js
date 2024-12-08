async function fetchData(param, limit) {
  try{
    let response;
    if (!param){
      response = (await fetch('https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=jazz&limit=14'));
    }else{
      response = (await fetch(`https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=${param}&limit=${limit}`));
      
    }
    if (!response.ok){
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
    
    return data;
  } catch(error){
    console.error(error);
  }
}


const chainId = document.querySelector('.music-chain');

async function displayMain(search, limit) {

  let chainHTML = ``;
  try{
    const data = await fetchData(search, limit);
    const albums = data.results;

    for (let i = 0; i < albums.length; i++){
      chainHTML += `
      <div class="music-preview">
        <a href="playlist.html?id=${albums[i].id}" data-id="${albums[i].id} class="link-to-playlist">
          <div class="image""> 
            <div class="play-icon-button">
            <i class="fa fa-play play"></i>
            </div>
            <img src="${albums[i].image}" class="image-display"> 
          </div>
        </a>

          <div class="music-stats">
            <p class="name">
              ${albums[i].name}
            </p>

            <p class="type">
              Album
            </p>

            <p class="band">
              ${albums[i].artist_name}
            </p>
          </div>
        </div>
        `
    }
    chainId.innerHTML = chainHTML;
  } catch (error){
    console.error('Error in display: ', error)
  }
} 

displayMain('jazz', 21);

const input = document.querySelector('.input-center');
const button = document.querySelector('.button-search-header');

button.addEventListener('click', () => {
  const value = input.value;

  displayMain(value, 21);

})

input.addEventListener('keydown', (event) => {
  if (document.activeElement === input && event.key === 'Enter'){
    const value = input.value;

    displayMain(value, 21);
  }
})

document.querySelectorAll(".link-to-playlist").forEach(element => {
  element.addEventListener('click', () => {
    const id = element.dataset.id;
    console.log('hi');
  })
})

