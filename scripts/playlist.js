import { playPlaylist, updateBarWidth } from "./utils/play.js";
import fetchDataPlaylist from "./fetchdata/fetchDataPlaylistPage.js";
import transformToMinutes from "./utils/transformToMinutes.js";
import toggleSearchOptions from "./utils/toggleSearchOption.js";

toggleSearchOptions();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id'); 

let audioVolume = 100;


let html = ``;

async function displayPlaylist() {
  let data = await fetchDataPlaylist(id);

  const musicArray = data.results[0].tracks;
  data = data.results[0];
  const image = data.image;
  const artistName = data.artist_name;
  const albumName = data.name;
  const date = data.releasedate;

  musicArray.sort((a, b) => a.position - b.position);
  console.log(musicArray)
  

  let totalDuration = 0;

  let htmlMusics = '';

  for(let i = 0; i < musicArray.length; i++){
    htmlMusics += `
      <div class="single-music-playlist-container a">
        <div>${musicArray[i].position}</div>  
        <div>${musicArray[i].name}</div>
        <div>${artistName}</div>
        <div>${transformToMinutes(musicArray[i].duration)}</div>
        <button id="${musicArray[0]}" class="button-play-single" data-music-url="${musicArray[i].audio}" data-index-music="${i}">
          <img src="icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg" class="img-button-play-single" data-toggle=false"">
        </button>
      </div>
    `
    totalDuration += Number(musicArray[i].duration);

  }


  
  html += `                
    <div class="playlist-header">
      <img src="${image}" class="playlist-picture-main">
      <div class="playlist-text-header">
        <div class="playlist-title">
          ${albumName}
        </div>

        <div class="playlist-stats playlist-author">
          ${artistName}
        </div>

        <button class="button-playlist button-playlist-play">
          <img src="icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg" class="playlist-button-icon" id="image-button-header-playlist-play">
        </button>

        <button class="button-playlist button-playlist-play">
          <img src="icons/favorite_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg" class="playlist-button-icon">
        </button>

        
      </div>

      <div class="buttons-bar-playlist">

        <div class="playlist-stats playlist-music-number">
          ${musicArray.length} musics
        </div>

        <div class="playlist-stats playlist-time">
          ${transformToMinutes(totalDuration)}
          </div>
      </div>

    </div>

    <div class="music-list">
      <div class="single-music-definition a"> 
        <div>#</div>
        <div>Name</div>
        <div>Author</div>
        <div><img src="icons/schedule_24dp_E8E4DB_FILL0_wght400_GRAD0_opsz24.svg"></div>
      </div>

      
    </div>
  `

  const main = document.querySelector(".main-content-playlist");
  main.innerHTML = html;

  const musicListElement = document.querySelector('.music-list');
  musicListElement.innerHTML += htmlMusics;

  playPlaylist();
  
}

const input = document.querySelector('.input-center');
const button = document.querySelector('.button-search-header');

button.addEventListener('click', () => {
  window.location.href = `../images.html?search=${input.value}`;
   sessionStorage.setItem('search', input.value)
})

input.addEventListener('keydown', (event) => {
  if (document.activeElement === input && event.key === 'Enter'){
     window.location.href = "../images.html";
     sessionStorage.setItem('search', input.value);
  }
})

displayPlaylist();


