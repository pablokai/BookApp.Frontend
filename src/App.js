import BasicTable from './components/BasicTable';
import Layout from './pages/Layout';
import {BrowserRouter, Routes, Route, Form} from 'react-router-dom';
import Home from '../src/pages/home/Home'
import Books from './pages/books/Books'
import FormBooks from './pages/books/FormBooks';

//default app as index element
// in paths remaining all routes
//when / go to layout
//when visiting index element goes to home

//configure api with azure ad
//on login retrieve token from api and store it for operations

function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path='/inicio' element={<Home/>}></Route>    
          <Route path='/libros' element={<Books/>}></Route>
          <Route  path='/formLibros' element={<FormBooks data/>}></Route>
          </Route>    
          
      </Routes>
    </BrowserRouter>

   
  );
}

export default App;
