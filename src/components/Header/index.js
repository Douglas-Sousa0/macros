import { Link } from 'react-router-dom'
import './header.css'

function Header(){
    return(
        <div className='navegacao'>
            <Link to='/'>Macros</Link>
            <Link to='/cadastro_macros'>Cadastrar Macros</Link>
        </div>
    )
}

export default Header