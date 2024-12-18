export default async function fetchDataPlaylist(id){
  try{
      const response = await fetch(`https://api.jamendo.com/v3.0/tracks?client_id=1797a491&album_id=${id}`)

      if (!response.ok){
        throw new Error('HTTP Error: ', response.status);
  
      }else{
        const data = await response.json();
        console.log(data);
        return await data;
      }
  }catch(error){
    console.error(error);
  }
}
