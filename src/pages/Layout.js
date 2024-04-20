import React, { useState } from 'react'
import '../styles/layout.css'
import HomeIcon from '@mui/icons-material/Home';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import logo from '../images/booklogo.png'
import user from '../images/user.png'
import {Outlet, Link} from 'react-router-dom';


function Layout() {
const [linkActive, setLinkActive] = useState(window.location.pathname.replace('/', ''));

const activateLink = (to) => {
    setLinkActive(to);
}
  return (

  
    <div className='layout'>
        <div className='dashboard'>
            <div className='container'>

            <div className='title'>
               <img src={logo} alt=''/>
               <h1>Libros App</h1>
                
            </div>
            <hr></hr>
            <div className='menu'>
                <li>
                    <ul>
                        <HomeIcon/>
                        <Link className='item' to="/inicio" >Inicio</Link>
                    </ul>
                    <ul>
                        <BookOutlinedIcon/>
                        <Link className='item' to="/libros">Libros</Link>
                    </ul>
                    <br/>
                    <hr></hr>
                    {/* <ul>
                        <LoginOutlinedIcon/>
                        <Link className='item' to="/" >Cerrar sesión</Link>
                    </ul>   */}
                </li>
            </div>
            
            </div>
            {/* <div className='logout'>
                <li>
                    <ul>
                        <LoginOutlinedIcon/>
                        <a>Cerrar sesion</a>
                    </ul>   
                </li>
            </div> */}
        </div>
        <div className='content'>
            <div className='top-bar'>
                <div></div>
                <div className='user'>
                    
                </div>
            </div>
            <div className='render-body'>
            <Outlet ></Outlet>
            </div>
            
        </div>
    </div>
    
  )
}

export default Layout