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

