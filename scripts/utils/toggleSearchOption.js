let toggle = false;
let current;

export default function toggleSearchOptions(){
  document.querySelector('.select-header').addEventListener('click', () => {
    toggle = !toggle;
    let option = document.querySelector('.option-container').classList;

    let button = document.querySelector('.select-header').classList;

    if (toggle){
      option.add('option-container-hide')
      button.remove('select-header-hover')
    }else{
      option.remove('option-container-hide'); 
      button.add('select-header-hover')
    }
      
  })

  Array.from(document.querySelector('.option-container').children).forEach(element => {
    element.addEventListener('click', () => {
      current = element.dataset.value;

      const span = document.querySelector('.current-search');
      span.setAttribute('data-value', current);

      if (current === 'tracks'){
        current = 'musics';
      }
      
      span.textContent = (current.trim())[0].toUpperCase() + current.slice(1)
    })
  });
}

