import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import {login, reset} from '../../features/auth/authSlice'

import Layout from '../../components/Layout';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      })

    const { username, password } = formData

    const { user, loading, error } = useSelector(
        (state) => state.auth
      )
    
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    

    const onSubmit = async (e) => {
        e.preventDefault()

        dispatch(login(formData))
                 
    }

    useEffect(() => {
        console.log(loading, error)
        if (loading == 'failed') {
          toast.error(error)
        }
    
        if ((loading == 'succeeded') ) {
          toast.success(`Welcome ${user.username}`)
            navigate('/')
        }
    
        dispatch(reset())
      }, [user, loading, error, dispatch, navigate])
    
    return (
        <Layout>  
            <form onSubmit={onSubmit}  
                className="flex flex-col justify-center items-center
                w-5/6 md:w-3/6 lg:w-2/6 mt-20 mx-auto bg-gray-100
                p-6 
                ">   
                <h2 className='text-4xl mb-12 '>Login</h2>
                <div className='w-full'>
                    <input  className='user-inputs'
                        type="text" 
                        id='username'
                        name='username'
                        value={username}
                        placeholder="username..."
                        onChange={onChange}>
                    </input>    
                </div>
                <div className='w-full'>
                    <input className='user-inputs'
                        type="password"
                        id='password'
                        name='password'
                        value={password}
                        placeholder="password..."
                        onChange={onChange}>    
                    </input>
                </div>
                <button className='btn'>Login</button>
                <p className='mt-4'>Dont have an account? <span className='text-teal-500'><NavLink to='/register'> Register</NavLink></span></p>
            </form>
        </Layout>      
    )
}

export default Login