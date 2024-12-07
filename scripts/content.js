async function fetchData(param) {
  try{
    let response;
    if (!param){
      response = (await fetch('https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=jazz&limit=14'));
    }else{
      response = (await fetch(`https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=${param}&limit=14`));
      
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

async function display(a) {

  let chainHTML = ``;
  try{
    const data = await fetchData(a);
    const albums = data.results;
    console.log('hi')

    for (let i = 0; i < Math.min(14, albums.length); i++){
      chainHTML += `
      <div class="music-preview">
        <a href="playlist.html">
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

display();

const input = document.querySelector('.input-center');
const button = document.querySelector('.button-search-header');

button.addEventListener('click', () => {
  const value = input.value;

  display(value);

})

