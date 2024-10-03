import React, {useEffect, useState } from 'react'
import './App.css'
import { Home } from './components/Home'
import { UserName } from './components/UserName'

export const App:  React.FC =  () =>  {

  const [currentUser, setCurrentUser] = useState<string|null>(null);

  const handleCurrUser = (userName: string) => {
    setCurrentUser(userName)
  }

  useEffect(()=>{
    const username = JSON.parse(localStorage.getItem("username") || '""')
    if(username)
      setCurrentUser(username)
  },[])

  return (
    <>
      {
        currentUser ? <Home currUser={currentUser}/> : <UserName handleCurrUser={handleCurrUser}/>
      }
    </>
  )
}

export default App
