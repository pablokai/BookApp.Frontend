import React from 'react'
import bookhome from "../../images/bookhome.svg";
import '../../styles/home.css'

function home() {
  return (
    <div className='container-home'>

      <div className='title-home'>  
      Bienvenido al Sistema de 
      <br/>Registro de Libros</div> 
      <div>
        <img className='image-home' src={bookhome} alt=''></img>
      </div>
      
    </div>
    
  )
}

export default home