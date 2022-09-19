import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {

    const {user} = useSelector(state => state.auth)

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
              console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSession()
    }, [])

    const endSession = async ()=> {
        try {
            let response = await axios({
                headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                method: 'put',
                // Normal version
                // url:`http://localhost:7107/api/Session/endSession/${session.id}`, 
                url:`http://localhost:7107/api/Session/endSessionRigged/${session.id}`,
              });
              setSession(response.data)
              console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const startSession = async ()=> {
        try {
            let response = await axios({
                headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                method: 'post',
                // Normal Session
                // url:`http://localhost:7107/api/Session/startSession`, 
                // Rigged version with the numbers known from the start for testing 
                url:`http://localhost:7107/api/Session/startSessionRigged`,
              });
              setSession(response.data)
              console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>

        <div className="flex flex-col justify-start items-center
        w-full md:w-3/4 lg:w-3/5 bg-primary-200 dark:bg-primary-700 my-2 p-7 space-y-6">
                <h2 className='text-5xl text-secondary-500'>Admin Dashboard</h2>
                <h3 className='text-3xl dark:text-white'>
                    {
                        session 
                        ? `Round: ${session.id} `
                        : `Start the first Round`
                    }
                </h3>
                {
                    session
                    ? <button className='btn' onClick={endSession}>End Round</button>
                    : <button className='btn' onClick={startSession}>Start Round</button>
                }
        </div>
        
    </Layout>
  )
}

export default AdminDashboard