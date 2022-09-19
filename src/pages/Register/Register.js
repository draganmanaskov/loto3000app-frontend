import React, {useState, useEffect} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {register, reset} from '../../features/auth/authSlice'
import {toast } from 'react-toastify'


import Layout from '../../components/Layout';

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        password2: '',
      })

      const { firstName, lastName, userName, password, password2 } = formData

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { user, status, error } = useSelector(
        (state) => state.auth
      )

    useEffect(() => {
        if (status == 'failed') {
          toast.error(error)
        console.log(error)
        }
    
        if ((status == 'succeeded') || user) {
            navigate('/')
            console.log('Succes')
        }
    
        dispatch(reset())
      }, [user, status, error, dispatch])
    
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
    const onSubmit = async (e) => {
        e.preventDefault()

        if (password !== password2) {
            // toast.error('Passwords do not match')
            console.log("Passwords not match")
          } else {
            const userData = {
              firstName,
              lastName,
              userName,
              password,
              confirmedpassword : password2 
            }
      
            dispatch(register(userData))
          }        
    }
    
    return (
      <Layout>
        <form onSubmit={onSubmit}
            className="flex flex-col justify-center items-center
            w-5/6 md:w-3/6 lg:w-2/6 mt-20 mx-auto bg-gray-100
            p-6 
            ">   
               <h2 className='text-4xl mb-12 '>Register</h2>
            <div className='w-full'>
                <input
                type='text'
                className='user-inputs'
                id='firstName'
                name='firstName'
                value={firstName}
                placeholder='Enter your first name'
                onChange={onChange}
                />
            </div>
            <div className='w-full'>
                <input
                type='text'
                className='user-inputs'
                id='lastName'
                name='lastName'
                value={lastName}
                placeholder='Enter your last name'
                onChange={onChange}
                />
            </div>
            <div className='w-full'>
                <input
                type='text'
                className='user-inputs'
                id='userName'
                name='userName'
                value={userName}
                placeholder='Enter your username'
                onChange={onChange}
                />
            </div>
            <div className='w-full'>
                <input
                type='password'
                className='user-inputs'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
                />
            </div>
            <div className='w-full'>
                <input
                type='password'
                className='user-inputs'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                onChange={onChange}
                />
          </div>
          <button className='btn'>Register</button>
          <p className='mt-4'>Already have an account? <span className='text-teal-500'><NavLink to='/login'> Log In</NavLink></span></p>
        </form>
      </Layout>
    )
}

export default Register
