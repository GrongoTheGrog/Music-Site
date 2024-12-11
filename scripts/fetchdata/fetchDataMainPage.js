export async function fetchData(param, limit) {
  try{
    let response;
    if (!param){
      response = (await fetch('https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=jazz&limit=14'));
    }else{
      response = (await fetch(`https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=${param}&limit=${limit}`));
      
    }
    if (!response.ok){
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();
    return await data;
  } catch(error){
    console.error(error);
  }
}


