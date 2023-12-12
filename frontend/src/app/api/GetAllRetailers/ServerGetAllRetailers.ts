const apiUrl = 'http://localhost:5000/retailer';

async function ServerGetAllRetailers() {
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',  
    }, 
    cache: 'no-cache',
  }) 

  const data = await res.json();
  return data;
}

export { ServerGetAllRetailers };