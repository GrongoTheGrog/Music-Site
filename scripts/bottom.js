let togglePlayBottom = false;
function funcTogglePlayBottom(){
  const elementButtonPlay = document.getElementById('play');
  if(!togglePlayBottom){
    togglePlayBottom = true;
    elementButtonPlay.setAttribute('src', 'icons/pause_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg')
  }else{
    togglePlayBottom = false;
    elementButtonPlay.setAttribute('src', 'icons/play_arrow_24dp_E8E4DB_FILL1_wght400_GRAD0_opsz24.svg');
  };
  console.log(togglePlayBottom);
}