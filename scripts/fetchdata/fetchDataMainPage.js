export async function fetchData(param, limit, type) {
  try{
    console.log(type)
    let response;
    if (!param){
      response = (await fetch(`https://api.jamendo.com/v3.0/${type}/?client_id=1797a491&namesearch=jazz&limit=14`));
    }else{
      response = (await fetch(`https://api.jamendo.com/v3.0/${type}/?client_id=1797a491&namesearch=${param}&limit=${limit}`));
      
    }
    if (!response.ok){
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return await data;
  } catch(error){
    console.error(error);
  }
}

