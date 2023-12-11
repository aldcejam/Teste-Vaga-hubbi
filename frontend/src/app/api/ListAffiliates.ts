async function ListAffiliates() {
    const apiUrl = `http://localhost:5000/afiliado/listar`;
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

export { ListAffiliates }