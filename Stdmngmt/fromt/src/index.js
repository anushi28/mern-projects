import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Log } from './Log';
import { Form } from './Form';
import { User } from './User';
import { Success } from './Success';
import { View } from './View';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <BrowserRouter>
 <Routes>
<Route path='/' element={<Log></Log>}></Route>

<Route path='/form' element={<Form></Form>}></Route>


<Route path='/user' element={<User></User>}></Route>
<Route path = '/success' element={<Success/>}></Route>
<Route path='/view' element={<View/>}></Route>
 </Routes>
 </BrowserRouter>

  </React.StrictMode>
);

