import React, { useState } from 'react'
import '../styles/layout.css'
import HomeIcon from '@mui/icons-material/Home';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import logo from '../images/booklogo.png'
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
                <hr></hr>
            </div>
            <div className='menu'>
                <li>
                    <ul>
                        <HomeIcon/>
                        <Link className='item' to="/inicio" >Inicio</Link>
                    </ul>
                    <ul>
                        <BookOutlinedIcon/>
                        <Link className='item' to="/libros" >Libros</Link>
                    </ul>
                </li>
            </div>
            
            </div>
            <div className='logout'>
                <li>
                    <ul>
                        <LoginOutlinedIcon/>
                        <a>Cerrar sesion</a>
                    </ul>   
                </li>
            </div>
        </div>
        <div className='content'>
            <div className='top-bar'>
                <div></div>
                <div className='user'>

                </div>
            </div>
            <Outlet ></Outlet>
        </div>
    </div>
    
  )
}

export default Layout