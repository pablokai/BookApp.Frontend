export const InputCheckText = (text, isName, isRequired) =>{
    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;

    if(isRequired){
        if(text === null || text === undefined || text === ""){
            return "El campo no puede ir vacío"
        }
    }
    if(isName){
        if(text.length > 50){
            return "No puede ser mayor a 50 caractéres";
        }   
    }else{
        if(text.length > 80){
            return "No puede ser mayor a 80 caractéres";
        }   
    }
  
    if(regex.test(text)){
        return "No puede contener caractéres especiales";
    }

    
    if(isName === true){
        if(/\d/.test(text)){
            return "No puede contener números";
        }    
    }

    return true;

}

export const InputCheckNumber = (number) =>{
    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
    if(parseInt(number) <0){
        return "El campo no puede ser negativo"
    }

    if(number ===  "E" || number ===  "e"){
        return "El campo no puede contener exponentes"
    }

    if(parseInt(number) === 0 ){
        return "El campo no puede tener 0 páginas"
    }

    if(parseInt(number) > 25000){
        return "El campo no puede ser mayor a 25000"
    }

    if(regex.test(number.toString())){
        return "No puede contener decimales ni caractéres especiales";
    }

    if(number === null || number === undefined || number === ""){
        return "El campo no puede ir vacío"
    }

    

    return true;

}