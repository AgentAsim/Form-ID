import { Nav } from './components/Nav'
import { Home } from './components/Home'
import { LogForm } from './components/LogForm'
import { useState } from 'react'
import { ContainerContext } from './Context/context'


function App() {

  const [Show, setShow] = useState("home")

  return (
    <>
      <ContainerContext.Provider
        value={
          {
            Show,
            setShow
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
