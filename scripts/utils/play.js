import fetchDataPlaylist from "../fetchdata/fetchDataPlaylistPage.js";
import transformToMinutes from "./transformToMinutes.js";

let currentMusic;
let toggle = true;
let index = 0;
let image;
let porcentage = 50;
let musicArray = []

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id'); 


export async function playPlaylist(){


  let imagelist = [
    document.getElementById('image-button-header-playlist-play'),
    document.getElementById('play')
  ];

  document.querySelectorAll('.button-play-single').forEach((button) => {   /// FIRST WAY TO PAUSE
    button.addEventListener('click', () => {
      index = Number(button.dataset.indexMusic) - 1;
      console.log(index);

      imagelist = [
        document.getElementById('image-button-header-playlist-play'),
        document.getElementById('play')
      ];
      

      /// IF CURRENT MUSIC DOESNT EXIST, THEN THE CURRENT BUTTON MUSIC BECOMES THE CURRENT MUSIC
      if (!currentMusic || button.dataset.musicUrl !== currentMusic.src){

      /// IF IT ALREDY EXISTS
        if (currentMusic){
          currentMusic.pause();
          toggle = true;
          image.setAttribute('src', '/icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg');

        }


        currentMusic = new Audio(button.dataset.musicUrl);
        currentMusic.play();
        currentMusic.volume = porcentage / 100;
        renderMusicQueue(index);

      }

      image = button.children[0];
      imagelist.push(image);

      toggleButton(imagelist);

    })
  })


  ///SECOND WAY TO PAUSE /// HEADER
  document.querySelector('.button-playlist-play').addEventListener('click', () => { 
    if (!currentMusic){
      renderMusicQueue(index);
      const button = document.querySelectorAll('.button-play-single')[0];
      currentMusic = new Audio(button.dataset.musicUrl)
      index = Number(button.dataset.indexMusic) - 1;
      imagelist.push(button.children[0]);
    }
    toggleButton(imagelist);
  })


  ///THIRD WAY TO PAUSE //// BOTTOM BAR
  document.querySelector('.button-play').addEventListener('click', () => { 
    toggleButton(imagelist);
  })


  //FOURTH WAY TO PAUSE   //// SPACE BAR
  document.addEventListener('keydown', (event) => { 
    if (event.key === ' '){
      event.preventDefault();
      toggleButton(imagelist);
    }
  })  

  ///CHANGE TO PREVIOUS MUSIC IN THE MUSIC QUEUE 
  document.querySelector('.button-previous').addEventListener('click', () => {
    if (index >= 0){       //only goes to the previous if the index of the current music is more or equal to 0
      index--;
      currentMusic = new Audio(musicArray[index].audio);
      
    }
  })

}

function toggleButton(imagelist){
  if (currentMusic){
    toggle ? currentMusic.play() : currentMusic.pause();
  }
  toggle = !toggle;


  imagelist.forEach((image) => {
    toggle ?
      image.setAttribute('src', '/icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
    :
      image.setAttribute('src', '/icons/pause_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
})
}



const barContainer = document.querySelector('.bar-volume-container');
const bar = document.querySelector('.bar-volume');

export function updateBarWidth(audio) {
  const containerRect = barContainer.getBoundingClientRect(); // Get container size
  const mousex = event.clientX - containerRect.left;
  porcentage = mousex / containerRect.width * 100;


  porcentage = Math.max(0, Math.min(porcentage, 100));



  const img = document.querySelector('.img-volume');

  if (porcentage <= 3){
    porcentage = 0;
    img.setAttribute('src', '/icons/volume_off_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
  }else{
    img.setAttribute('src', '/icons/volume_up_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
  }

  audio.volume = porcentage / 100;
  document.querySelector('.bar-volume').style.width = `${porcentage}%`;
}

barContainer.addEventListener('mousedown', (event) => {
  updateBarWidth(currentMusic)

  function move(){
    updateBarWidth(currentMusic);
  }

  document.addEventListener('mousemove', move);

  function stop(){
    document.removeEventListener('mouseup', stop);
    document.removeEventListener('mousemove', move);
  }

  document.addEventListener('mouseup', stop);
});


async function renderMusicQueue(index){
  const data = await fetchDataPlaylist(id);
  musicArray = data.results[0].tracks;
  const image = data.results[0].image;



  let html = ``;

  html += `
    <div class="queue-header">
      <img src="image-album/sapo copy.jpg" alt="profile pic" class="img-profile-queue">

      <div class="flex-text-queue-header">
        <div class="text-queue-header">Music Queue &#119070;</div>
      </div>
    </div>

    <div class="text-queue-header text-queue-title" style="font-size: 18px;">
      &#183 Playing Now
    </div>

    <div class="queue-div" id="playingNowContainer"> <!-- PLAYING NOW -->
      <img src="${image}" alt="a day at the races" class="album-img-music-queue">

      <div class="queue-text">
        <div class="queue-music-name text-queue-header">
          ${musicArray[index].name}
        </div>

        <div class="queue-album-name text-queue-header">
          ${data.results[0].name}
        </div>
      </div>
    </div>

    <div class="text-queue-header text-queue-title" style="font-size: 18px;">
      &#183 Next
    </div>

  `;

  for(let i = 1; i < musicArray.length - index; i++){
    const current = index + i;
    console.log(current);
    html += `
      <div class="queue-div" id="nextContainer"> <!-- NEXT2 -->
        <img src="${image}" alt="a day at the races" class="album-img-music-queue">

        <div class="queue-text">
          <div class="queue-music-name text-queue-header">
            ${musicArray[current].name}
          </div>

          <div class="queue-album-name text-queue-header">
            ${data.results[0].name}
          </div>
        </div>
      </div>
    `;
  }

  const queue = document.querySelector('.queue-main-div');
  queue.innerHTML = html;

  const timerFooter = document.querySelector('.final-timer');
  timerFooter.innerHTML = transformToMinutes(Number(musicArray[index].duration));
  
}

