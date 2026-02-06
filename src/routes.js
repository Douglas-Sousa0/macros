import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Macros from './pages/Macros'
import CadastroMacros from './pages/CadastroMacros'
import Header from './components/Header'


function Rotas(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Macros/> } />
                <Route path="/cadastro_macros" element={ <CadastroMacros />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas