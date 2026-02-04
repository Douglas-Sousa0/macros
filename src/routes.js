import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Macros from './pages/Macros'
import Cadastro_Macros from './pages/Cadastro_Macros'
import Header from './components/Header'


function Rotas(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Macros/> } />
                <Route path="/cadastro_macros" element={ <Cadastro_Macros />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas