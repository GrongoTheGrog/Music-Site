const url = 'https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=jazz&limit=14';

export async function fetchData(limit) {
  try{
    const response = (await fetch(`https://api.jamendo.com/v3.0/albums/?client_id=1797a491&namesearch=jazz&limit=${limit}`));

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

