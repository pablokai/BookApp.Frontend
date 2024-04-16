
export const ProcesarApi = async (method, url, data) =>{
    
    const apiurl = 'https://localhost:7162/api/';
    
    const init = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        }, //cambiar a cors
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)

    };

    const request = new Request(apiurl + ''+ url, init);
    try {
        const response = await fetch(request);
        if(response.ok){
            return await response.json();
        }else{
            return {statusCode: 500, mensaje: "Error al consumir el API" }
        }
    }catch (error){
        console.log(error);
    }

}