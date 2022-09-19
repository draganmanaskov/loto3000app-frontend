import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import TimeAgo from 'react-timeago'
import {NavLink} from 'react-router-dom'

const Home = () => {

  const [sessions, setSessions] = useState([]);
  const [render, setRender] = useState([]);

  const getAllSessions = async ()=> {
    try {
        let response = await axios({
            method: 'GET',
            url:`http://localhost:7107/api/Session/getAllSessions`,
          });
          setSessions(response.data)
          console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  let board = sessions.map((session, index) => {
    if(session.active) {
      return(
          <div key={index} className="flex flex-col justify-start items-center
                            w-full md:w-3/4 lg:w-3/5 bg-primary-200 dark:bg-primary-700 my-2 p-2">
          <h2 className='text-3xl dark:text-white'>Current Round {session.id}</h2>
          <span>
             Started <TimeAgo date={session.start} />
          </span>
          <NavLink to={"/ticket"} className='btn-success-outline '>Buy Ticket</NavLink>
        </div>
      )
    }

    return(
      <div key={index} className="flex flex-col justify-start items-center
                        w-full md:w-3/4 lg:w-3/5  bg-primary-200 dark:bg-primary-700 my-2 p-2">
        <h2 className='text-3xl dark:text-white'>Round {session.id}</h2>
        <span className='text-base text-secondary-500'>
             Ended <TimeAgo date={session.end} />
          </span>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-2xl dark:text-white'>Winning Numbers</h3>
            <ul className='flex flex-row'>
                <li className='winning-number-item'>
                  {session.winningTicket.number1}
                </li>
                <li className='winning-number-item'>
                  {session.winningTicket.number2}
                </li>
                <li className='winning-number-item'>
                  {session.winningTicket.number3}
                </li>
                <li className='winning-number-item'>
                  {session.winningTicket.number4}
                </li>
                <li className='winning-number-item'>
                  {session.winningTicket.number5}
                </li>
                <li className='winning-number-item'>
                  {session.winningTicket.number6}
                </li>
                <li className='winning-number-item'>
                  {session.winningTicket.number7}
                </li>
                <li className='winning-number-item'>
                  {session.winningTicket.number8}
                </li>
            </ul>
        </div>

        <div className='flex w-full justify-center items-center flex-col '>
              <h3 className='text-xl dark:text-white'>Winners</h3>
              <ul className='flex w-full justify-center items-center flex-col'>
                {
                  session.tickets.map((ticket, index) => {

                    return(
                      <li key={index} className='flex flex-col lg:flex-row w-full justify-center items-center
                                                 shadow-md m-1 '>
                        <span className='w-full lg:w-2/6 flex justify-center items-center dark:text-white'>
                          {`${ticket.userDataDto.firstName} ${ticket.userDataDto.lastName}`}
                        </span>
                        <ul className='flex w-full lg:w-2/6 flex-row justify-center items-center'>
                          <li className='ticket-number-item'>
                              {ticket.number1}
                          </li>
                          <li className='ticket-number-item'>
                              {ticket.number2}
                          </li>
                          <li className='ticket-number-item'>
                              {ticket.number3}
                          </li>
                          <li className='ticket-number-item'>
                              {ticket.number4}
                          </li>
                          <li className='ticket-number-item'>
                              {ticket.number5}
                          </li>
                          <li className='ticket-number-item'>
                              {ticket.number6}
                          </li>
                          <li className='ticket-number-item'>
                              {ticket.number7}
                          </li>
                        </ul>
                        <span className='w-full lg:w-2/6 flex justify-center items-center dark:text-white'>
                          {`Prize: ${ticket.prize}`}
                        </span>
                      </li>

                    )
                  })
                }
              </ul>
        </div>
      </div>
    )
    
  })
  setRender(board)
}, [sessions])

useEffect(() => {
  getAllSessions()
}, [])

  return (
    <Layout>
        <h1 className='text-6xl text-secondary-400 mt-4 mb-8'>Winner Board</h1>
        {render}
    </Layout>
  )
}

export default Home