import { playPlaylist } from "../utils/play.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id'); 


function transformToMinutes(a){
  const minutes = Math.trunc(a / 60);
  const seconds = a % 60;

  return minutes ? `${minutes} min ${seconds} s` : `${seconds} s`;
}

async function fetchData(){
  try{
      const response = await fetch(`https://api.jamendo.com/v3.0/albums/tracks?client_id=1797a491&id=${id}`)

      if (!response.ok){
        throw new Error('HTTP Error: ', response.status);
  
      }else{
        const data = await response.json();
        console.log(data);
        return data;
      }
  }catch(error){
    console.error(error);
  }
}

let html = ``;

async function displayPlaylist() {
  let data = await fetchData();

  const musicArray = data.results[0].tracks;
  data = data.results[0];
  const image = data.image;
  const artistName = data.artist_name;
  const albumName = data.name;
  const date = data.releasedate;

  let totalDuration = 0;

  let htmlMusics = '';

  for(let i = 0; i < musicArray.length; i++){
    htmlMusics += `
      <div class="single-music-playlist-container a">
        <div>${musicArray[i].position}</div>  
        <div>${musicArray[i].name}</div>
        <div>${artistName}</div>
        <div>${transformToMinutes(musicArray[i].duration)}</div>
        <button id="${musicArray[0]}" class="button-play-single" data-music-url="${musicArray[i].audio}">
          <img src="icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg" class="img-button-play-single" data-toggle=false"">
        </button>
      </div>
    `
    totalDuration += Number(musicArray[i].duration);

  }

  console.log(totalDuration)

  
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

displayPlaylist();
