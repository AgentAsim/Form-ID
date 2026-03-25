import { useState } from 'react'
import { Nav } from './components/Nav'
import { Home } from './components/Home'
import { LogForm } from './components/LogForm'
import { ContainerContext } from './Context/context'


function App() {

  const API_Connect = import.meta.env.VITE_API;
  const [Show, setShow] = useState("home")
  const [isUpdate, setisUpdate] = useState(false)

  return (
    <>
      <ContainerContext.Provider
        value={
          {
            API_Connect,
            Show,
            setShow,
            isUpdate,
            setisUpdate
          }
        }>

        <div className="container">
          <Nav />
          <Home />
          <LogForm />
        </div>
      </ContainerContext.Provider>
    </>
  )
}

export default App
