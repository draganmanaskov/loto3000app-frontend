import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

import Layout from '../../components/Layout'

const Ticket = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth)


  const [formData, setFormData] = useState({
    number1: 1,
    number2: 1,
    number3: 1,
    number4: 1,
    number5: 1,
    number6: 1,
    number7: 1,
  })

const { number1, number2, number3, number4, number5, number6, number7 } = formData

const [session, setSession] = useState(null)

const getSession = async () => {
    try {
        let response = await axios({
            headers: {
                Authorization: `Bearer ${user.token}`,
              },
            method: 'GET', 
            url:'http://localhost:7107/api/Session/getActiveSession',
          });
          setSession(response.data)
          
          console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    getSession()
}, [])

const onChange = (e) => {
  console.log(e.target.value === "")
  if(e.target.value === "") {
    
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: parseInt(e.target.value),
    }))
    return
  }
  if(e.target.value > 37 || e.target.value < 1) {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: 1,
    }))
    toast.error("Number must be between 1 and 37")
    return
  }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: parseInt(e.target.value),
    }))
  }


const onSubmit = async (e) => {
    e.preventDefault()
  
    let list = [number1, number2, number3, number4, number5, number6, number7]
    
    if(checkIfDuplicateExists(list)) {
      toast.error("Numbers must be different")
      return
    }

    try {
      let response = await axios({
          headers: {
              Authorization: `Bearer ${user.token}`,
            },
          method: 'POST',
          url:`http://localhost:7107/api/Ticket/createTicket`,
          data: {numbers:list, sessionId:session.id}
        });
        navigate('/')
        console.log(response.data)
  } catch (error) {
      console.log(error)
  }
}

const checkIfDuplicateExists = list => {
  return new Set(list).size !== list.length
}

  return (
    <Layout>
         <form onSubmit={onSubmit}  
                className="flex flex-col justify-center items-center
                w-5/6 md:w-3/6 lg:w-3/6 mt-20 mx-auto bg-gray-100 dark:bg-primary-500
                p-6 
                ">
            <h2 className='text-4xl mb-12 dark:text-yellow-50'>Create Ticket</h2>
            <div className="flex flex-col justify-center items-center 
                            lg:flex-row ">    
                <div className='w-full'>
                    <input  className='user-inputs'
                        type="number" 
                        id='number1'
                        name='number1'
                        value={number1}
                        placeholder="First..."
                        onChange={onChange}>
                    </input>    
                </div>

                <div className='w-full'>
                    <input  className='user-inputs'
                        type="number" 
                        id='number2'
                        name='number2'
                        value={number2}
                        placeholder="Second..."
                        onChange={onChange}>
                    </input>    
                </div>

                <div className='w-full'>
                    <input  className='user-inputs'
                        type="number" 
                        id='number3'
                        name='number3'
                        value={number3}
                        placeholder="Third..."
                        onChange={onChange}>
                    </input>    
                </div>

                <div className='w-full'>
                    <input  className='user-inputs'
                        type="number" 
                        id='number4'
                        name='number4'
                        value={number4}
                        placeholder="Fourth..."
                        onChange={onChange}>
                    </input>    
                </div>

                <div className='w-full'>
                    <input  className='user-inputs'
                        type="number" 
                        id='number5'
                        name='number5'
                        value={number5}
                        placeholder="Fifth..."
                        onChange={onChange}>
                    </input>    
                </div>

                <div className='w-full'>
                    <input  className='user-inputs'
                        type="number" 
                        id='number6'
                        name='number6'
                        value={number6}
                        placeholder="Sixth..."
                        onChange={onChange}>
                    </input>    
                </div>

                <div className='w-full'>
                    <input  className='user-inputs'
                        type="number" 
                        id='number7'
                        name='number7'
                        value={number7}
                        placeholder="Seventh..."
                        onChange={onChange}>
                    </input>    
                </div>
            </div>   
                

                <button className='btn'>Submit</button>
            </form>
    </Layout>
  )
}

export default Ticket