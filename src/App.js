import React from 'react';
// import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
//components
import SideBarNav from './components/SideBarNav/SideBarNav';
import Header from './components/Header/Header'

//Router
import {Route, Routes} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Ticket from './pages/Ticket/Ticket';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home/Home';


const ROLES = {
  'User': 1,
  'Admin': 2
}

function App() {
  return (
    <div className="flex h-full">
    <SideBarNav />
    <div className='w-screen max-w-full h-full'>
      <Header />
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
        {/* USER PATHS */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path='/ticket' element={<Ticket/>}/>
        </Route>

        {/* ADMIN PATHS */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path='/dashboard' element={<AdminDashboard/>}/>
        </Route>
   
       
      </Routes>

    </div>
    
    <ToastContainer />
  </div>
  );
}

export default App;
