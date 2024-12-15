import fetchDataPlaylist from "../fetchdata/fetchDataPlaylistPage.js";
import transformToMinutes from "./transformToMinutes.js";

let currentMusic;
let toggle = true;
let index = 0;
let image;
let porcentage = 50;
let musicArray = []
let musicButtonPlay = [];
let imagelist;


let toggleShuffle;
let toggleLoop;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id'); 



export async function playPlaylist(){

  const data = await fetchDataPlaylist(id);
  musicArray = data.results[0].tracks;
  
  const objectButtons = document.querySelector('.music-list').children;
  musicButtonPlay = Array.from(objectButtons);
  musicButtonPlay.splice(0, 1);

  musicButtonPlay = musicButtonPlay.map((button) => {
    return [button.children[4].children[0], musicArray[index]];
  })

  console.log(musicButtonPlay);
  console.log(musicArray);

  refreshImageList();

  document.querySelectorAll('.button-play-single').forEach((button, indexFunction) => {   /// FIRST WAY TO PAUSE

    

    button.addEventListener('click', () => {
      index = Number(button.dataset.indexMusic);

      refreshImageList();
      

      /// IF CURRENT MUSIC DOESNT EXIST, THEN THE CURRENT BUTTON MUSIC BECOMES THE CURRENT MUSIC
      if (!currentMusic || button.dataset.musicUrl !== currentMusic.src){

        renderMusicQueue(index);
      /// IF IT ALREDY EXISTS
        if (currentMusic){
          renderMusicQueue(index);
          currentMusic.pause();
          toggle = true;
          image.setAttribute('src', '/icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg');

        }
        
        playMusic(button.dataset.musicUrl)

      }

      addToImageList(button.children[0])

      toggleButton(imagelist);
      endMusic();
      if (toggleLoop){
        toggleLoopFunction();
      }

    })
  })


  ///SECOND WAY TO PAUSE /// HEADER
  document.querySelector('.button-playlist-play').addEventListener('click', () => { 
    if (!currentMusic){
      renderMusicQueue(index);
      const button = document.querySelectorAll('.button-play-single')[0];
      currentMusic = new Audio(button.dataset.musicUrl)
      index = 0;
      displayMusicProgress();
      addToImageList(button.children[0])
      endMusic();
    }
    toggleButton(imagelist);
  })


  ///THIRD WAY TO PAUSE //// BOTTOM BAR
  document.querySelector('.button-play').addEventListener('click', () => { 
    toggleButton(imagelist);
    endMusic();
  })


  //FOURTH WAY TO PAUSE   //// SPACE BAR
  document.addEventListener('keydown', (event) => { 
    if (event.key === ' '){
      event.preventDefault();
      toggleButton(imagelist);
      endMusic();
    }
  })  

  ///CHANGE TO PREVIOUS MUSIC IN THE MUSIC QUEUE 
  document.querySelector('.button-previous').addEventListener('click', () => {
    if (index > 0){       

      endMusic();
      change(-1);
    }
  })

  //CHANGE TO NEXT MUSIC IN THE MUSIC QUEUE
  document.querySelector('.button-next').addEventListener('click', () => {
    if (index < musicButtonPlay.length - 1){       

      endMusic();
      change(1);
    }
  })
}


//CHANGE WHEN END
function handleEnd(){
  change(1);
}

function endMusic(){
  currentMusic.removeEventListener('ended', () => handleEnd())
  currentMusic.addEventListener('ended', () => handleEnd())
}

//PLAY AND UPDATE THE CURRENT MUSIC WITH THE VOLUME
function playMusic(musicUrl){
  currentMusic = new Audio(musicUrl);
  currentMusic.play();
  currentMusic.volume = porcentage / 100;
  displayMusicProgress();
}


//CHANGE THE INDEX OF THE MUSIC IN THE musicArray
function change(x){
  refreshImageList();
  currentMusic.removeEventListener('ended', () => handleEnd())

  let curImage = musicButtonPlay[index][0];
  curImage.setAttribute('src', '/icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg');

  index += x;
  if (toggleLoop){
    if (x === 1){
      index--;
    }
    toggleLoopFunction()
  }


  currentMusic.pause()
  playMusic(musicButtonPlay[index][1].audio)
  renderMusicQueue(index);
  endMusic();

  toggle = true;

  addToImageList()

  toggleButton(imagelist);
}

//TOGGLE BUTTON PLAY
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

//ADD IMAGE TO LIST FOR DISPLAY
function addToImageList(imageAdd){
  imageAdd = imageAdd || musicButtonPlay[index][0];

  image = imageAdd;
  imagelist.push(image);
}

function refreshImageList(){
  imagelist = [
    document.getElementById('image-button-header-playlist-play'),
    document.getElementById('play')
  ];
}

//CHANGE THE SIZE AND VOLUME OF SOUND BAR 
const barContainer = document.querySelector('.bar-volume-container');

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


//ADD THE EVENT TO THE SOUND BAR 
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



//GENERATE THE MUSIC QUEUE
async function renderMusicQueue(index){
  const data = await fetchDataPlaylist(id);
  const image = data.results[0].image;
  console.log(`This is the index: ${index}`)



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

//KEEP TRACK OF CURRENT MUSIC PROGRESS
function displayMusicProgress(){
    currentMusic && currentMusic.addEventListener('timeupdate', () => {
    const currentTimer = document.querySelector('.current-timer');
    updateBarTimerrWidth(currentMusic.currentTime);

    currentTimer.innerHTML = transformToMinutes(Math.trunc(currentMusic.currentTime));
  })
}

//UPDATE BAR TIMER
function updateBarTimerrWidth(currentTimer){
  const bar = document.querySelector('.time-bar-back');

  bar.addEventListener('mousedown', (event) => {
    handleStretch(event);
    currentMusic.pause();

    function handleStretch(eventMove){
      updateBarTimerWidthMouse(eventMove);
    }

    document.addEventListener('mousemove',  handleStretch)

    function stop(){
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('mousemove', handleStretch);
      toggle = true;
      toggleButton(imagelist);

    }

    document.addEventListener('mouseup', stop)

  })

  const duration = Number(musicArray[index].duration);
  const currentProgress = currentTimer;
  const elementBar = document.querySelector('.bar');
  elementBar.style.width = `${currentProgress/duration * 100}%`;
}

function updateBarTimerWidthMouse(event){
  const barLeftLocation = document.querySelector('.time-bar-back').getBoundingClientRect();
  const mousex = event.clientX;
  const barSizeAfter = mousex - barLeftLocation.left;
  const porcentage = barSizeAfter / barLeftLocation.width;
  const duration = porcentage * 100 * currentMusic.duration / 100;
  currentMusic.currentTime = duration;
 
  document.querySelector('.bar').style.width = `${porcentage * 100}%`;

}

document.querySelector('.button-loop').addEventListener('click', () => {
  toggleLoopFunction();
})

function toggleLoopFunction(){
  const marker = document.querySelector('.marker-loop');
  toggleLoop = !toggleLoop;
  if (toggleLoop){
    marker.style.display = 'flex';
  }else{
    marker.style.display = 'none';
  }
}


document.querySelector('.button-shuffle').addEventListener('click', () => {
  toggleShuffleFunction();
})

function toggleShuffleFunction(){
  const marker = document.querySelector('.marker-shuffle');
  toggleShuffle = !toggleShuffle;
  if (toggleShuffle){
    marker.style.display = 'flex';
  }else{
    marker.style.display = 'none';
  }
}