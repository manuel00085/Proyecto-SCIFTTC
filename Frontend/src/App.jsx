import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Dashboard from './pages/Dashboard'
import Reportes from './components/DashboardComponent/Reportes'
import Inicio from "./components/DashboardComponent/Home"
import Especialistas from './components/DashboardComponent/Especialistas'
import Agendar from './components/DashboardComponent/Agendar'

function App (){
  
return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LoginRegister />} />
      <Route path="/Dashboard" element={<Dashboard />}>
        <Route index element={<Inicio />} />
        <Route path="Reportes" element={<Reportes/>} />
        <Route path="Agendar" element={<Agendar/>} />
        <Route path="Especialistas" element={<Especialistas/>} />
       
      </Route>
    </Routes>
  </BrowserRouter>
  
)
}

export default App
