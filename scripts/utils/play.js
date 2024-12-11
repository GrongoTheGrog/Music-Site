let currentMusic;
let toggle = true;
let image;


export function playPlaylist(){
  let imagelist = [
    document.getElementById('image-button-header-playlist-play'),
    document.getElementById('play')
  ];

  document.querySelectorAll('.button-play-single').forEach((button) => {   /// FIRST WAY TO PAUSE
    button.addEventListener('click', () => {

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

      }

      image = button.children[0];
      imagelist.push(image);

      toggleButton(imagelist);

    })
  })


  ///SECOND WAY TO PAUSE /// HEADER
  document.querySelector('.button-playlist-play').addEventListener('click', () => { 
    if (!currentMusic){
      const button = document.querySelectorAll('.button-play-single')[0];
      currentMusic = new Audio(button.dataset.musicUrl)
      imagelist.push(button.children[0]);
    }
    toggleButton(imagelist);
  })


  ///THIRD WAY TO PAUSE //// BOTTOM BAR
  document.querySelector('.button-play').addEventListener('click', () => { 
    toggleButton(imagelist);
  })

  document.addEventListener('keydown', (event) => { 
    if (event.key === ' '){
      event.preventDefault();
      toggleButton(imagelist);
    }
  })  

  

}

function toggleButton(imagelist){
  if (currentMusic){
    toggle ? currentMusic.play() : currentMusic.pause();
  }
  toggle = !toggle;

  console.log(imagelist)

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
  let porcentage = mousex / containerRect.width * 100;
  audio.volume = porcentage / 100;

  console.log(porcentage);
  console.log

  porcentage = Math.max(0, Math.min(porcentage, 100));



  const img = document.querySelector('.img-volume');

  if (porcentage <= 0){
    img.setAttribute('src', '/icons/volume_off_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
  }else{
    img.setAttribute('src', '/icons/volume_up_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
  }

  document.querySelector('.bar-volume').style.width = `${porcentage}%`;
}

let update = false

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
