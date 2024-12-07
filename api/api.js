const url = 'https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=jazz&limit=14';

export async function fetchData() {
  try{
    const response = (await fetch(url));

    if (!response.ok){
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    data = await response.json();

    console.log(data);
    
    return data;
  } catch(error){
    console.error(error);
  }
}

async function display(){
  const data = await fetchData();
  const albums = data.results;

  let inner = ``;

  for(let i = 0; i < 14; i++){

    inner += `
    <div>
      <img src="${albums[i].image}" class="image">
      
      <p>
        Name: ${albums[i].name}
      </p>
    </div>
    ` 
  }

  const element = document.getElementById('div1');
  element.innerHTML = inner;
}

display();
