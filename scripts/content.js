chainHTML = ``;

albumList.forEach((album) => {
  const chainId = document.querySelector('.music-chain');

  chainHTML += `
    <div class="music-preview">
      <a href=""
        <div class="image""> 
          <div class="play-icon-button">
          <i class="fa fa-play play"></i>
          </div>
          <img src="${album.image}" class="image-display"> 
        </div>

        <div class="music-stats">
          <p class="name">
            ${album.name}
          </p>

          <p class="type">
            Album
          </p>

          <p class="band">
            ${album.band}
          </p>
        </div>
      </div>
      
  `
  chainId.innerHTML = chainHTML;
})

