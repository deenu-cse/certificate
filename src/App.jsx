import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Check from './components/Check'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/verify/checkCertificate' element={<Check/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
