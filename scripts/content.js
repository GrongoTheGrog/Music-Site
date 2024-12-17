import { fetchData } from "./fetchdata/fetchDataMainPage.js";
import toggleSearchOptions from "./utils/toggleSearchOption.js";


toggleSearchOptions()
const chainId = document.querySelector('.music-chain');



async function displayMainArtits(search, limit, type) {
  document.querySelector('.title-above-chain').textContent = 'Artists'

  let chainHTML = ``;
  try{
    const data = await fetchData(search, limit, type);
    const artists = data.results;

    for (let i = 0; i < artists.length; i++){
      chainHTML += `
      <div class="artist-card">
        <img class="image-artist" src="${artists[i].image}">

        <div class="artist-text">
          <span class="artistName">
            ${artists[i].name}
          </span>

          <span class="enteringDate">
            ${artists[i].joindate} 
          </span>
        </div>
      </div>

        `
    }
    chainId.innerHTML = chainHTML;
  } catch (error){
    console.error('Error in display: ', error)
  }
}






async function displayMainAlbums(search, limit, type) {
  document.querySelector('.title-above-chain').textContent = 'Albums'
  let chainHTML = ``;
  try{
    const data = await fetchData(search, limit, type);
    const albums = data.results;

    for (let i = 0; i < albums.length; i++){
      chainHTML += `
      <div class="music-preview">
        <a href="playlist.html?id=${albums[i].id}" data-id="${albums[i].id}" class="link-to-playlist">
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



let homeThemes =  sessionStorage.getItem('search') || ['rock', 'jazz', 'pop', 'rap', 'trap', 'blues', 'eletronic', 'country', 'funk'];
sessionStorage.removeItem('search');
console.log(homeThemes);

const indexThemes = Math.floor(Math.random() * homeThemes.length);

if (Array.isArray(homeThemes)){
  homeThemes = homeThemes[indexThemes];
}

const type = getTypeOfSearch();

displayMainAlbums(homeThemes , 21, type);

const input = document.querySelector('.input-center');
const button = document.querySelector('.button-search-header');

button.addEventListener('click', () => {
  const value = input.value;
  const type = getTypeOfSearch();


  decideSearch(value, 21, type)

})

input.addEventListener('keydown', (event) => {
  if (document.activeElement === input && event.key === 'Enter'){
    const value = input.value;
    const type = getTypeOfSearch();

    decideSearch(value, 21, type);
  }
})

document.querySelectorAll(".link-to-playlist").forEach(element => {
  element.addEventListener('click', () => {
  })
})

function getTypeOfSearch(){
  console.log(document.querySelector('.current-search').dataset.value)
  return document.querySelector('.current-search').dataset.value;
  
}

function decideSearch(value, limit, type){
  type = getTypeOfSearch();

  if (type === 'albums'){
    displayMainAlbums(value, limit, type);
  }else if (type === 'artists'){
    displayMainArtits(value, limit, type);
  }
}