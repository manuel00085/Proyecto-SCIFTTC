import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import DashboardProtec from './pages/Dashboard'

function App (){
return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ <LoginRegister/> } />
        <Route path="/Register" element={<h1>Hola Register</h1> } />
        <Route path="/Dashboard" element={<DashboardProtec/> } />  
    </Routes>

    
    </BrowserRouter>
  
)
}

export default App
