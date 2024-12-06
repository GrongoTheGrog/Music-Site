const API_KEY = '1797a491';

async function fetchData() {
  try{
    const response = (await fetch(`https://api.jamendo.com/v3.0/albums?artist_name=we+are+fm&client_id=${API_KEY}&format=json`));

    const data = await response.json();

    console.log(data);
  } catch(error){
    console.error(error);
  }
}