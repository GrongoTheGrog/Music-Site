let music;
let img;
let toggle = true;

let currentButton;

export function playPlaylist(){
  document.querySelectorAll('.button-play-single').forEach((button) => {
    button.addEventListener('click', () => {

      
      let curmusic = new Audio (button.dataset.musicUrl);


      //checking if music exists alredy
      if (music){
        music.pause();
        img.setAttribute('src', '/icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg');
        img.dataset.toggle = false;

        if (music.src !== curmusic.src){
          toggle = true;
          console.log('hi')
        }

        if (toggle){
          curmusic.play();
        }
      }else{
        curmusic.play();
      }

      
      music = curmusic;

      img = button.children[0];
      
      toggleButton(img);
    })
  })
}

function toggleButton(image, ){
  toggle = !toggle;

  if (toggle) {
    image.setAttribute('src', '/icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
  }else{
    image.setAttribute('src', '/icons/pause_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
  }

}

export function updateButtonHeader(){
  document.querySelector('.button-playlist-play').addEventListener('click', () => {
    const image = document.getElementById('image-button-header-playlist-play');

    toggleButton(image);
  })
}