import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Main } from './Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Create } from './Create';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Main></Main>}></Route>
  <Route path='/Create' element={<Create/>}/>

  <Route path = '/app' element ={<App/>}/>
</Routes>
</BrowserRouter>
  </React.StrictMode>
);


