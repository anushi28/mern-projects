import React from 'react'
import './todo.css'
import { GiThink } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { FaLongArrowAltDown } from "react-icons/fa";
export const Main = () => {
 
  return (
    <>
   
        <b className='head'>What's the need of TO-DO <GiThink/> </b>
        <div className='box'>
            <ul>
                <li>
               <h2> To-do lists offer a way to increase productivity, stopping you from forgetting things, helps prioritise tasks, manage tasks effectively, use time wisely and improve time management as well as workflow.</h2>
                </li>
                <li>
                <h2>It is beneficial because it helps you stay organized, prioritize tasks, manage your time effectively, reduce mental clutter by writing down your responsibilities, and provides a sense of accomplishment when you check items off, ultimately leading to better productivity and goal achievement</h2>
                </li>
            
           
            </ul>
            <h1 style={{ marginLeft: '22px' }}>
    CREATE YOUR'S OWN TO-DO LIST  <FaLongArrowAltDown/>
</h1>
            <button  className='btn'  > <Link to="/app"><h2>Let's Start</h2></Link></button>
        
        

 
        </div>
       

       
   
   
   

    </>

  )
}
