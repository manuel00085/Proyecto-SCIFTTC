import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Dashboard from './pages/Dashboard'
// eslint-disable-next-line no-unused-vars
import Classroot from './components/Css/Root.module.css'
import './global.css';

function App (){
return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ <LoginRegister/> } />
        <Route path="/Dashboard" element={<Dashboard/> } />  
    </Routes>

    
    </BrowserRouter>
  
)
}

export default App
