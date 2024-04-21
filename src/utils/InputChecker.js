export const InputCheckText = (text, isName) =>{
    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;

    if(text === null || text === undefined || text === ""){
        return "El campo no puede ir vacío"
    }

    if(text.length > 30){
        return "No puede ser mayor a 30 caractéres";
    }

    if(regex.test(text)){
        return "No puede contener caractéres especiales";
    }

    if(isName){
        if(!isNaN(parseFloat(text)) || isFinite(text)){
            return "No puede contener números";
        }    
    }

    return true;

}