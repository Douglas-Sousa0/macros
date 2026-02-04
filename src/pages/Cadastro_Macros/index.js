import { useState } from 'react'
import { database } from '../../firebaseConnection'
import { collection, addDoc } from 'firebase/firestore'
import './cadastro_macros.css'

function Cadastro_Macros(){
    const [titulo, setTitulo] = useState('')
    const [texto, setTexto] = useState('')

    async function cadastrar_macro(e){
        e.preventDefault()

        const ref = collection(database, 'macros')

        await addDoc(ref, {
            titulo: titulo,
            texto: texto
        })
        .then(() => {
            setTitulo('')
            setTexto('')
        })
        .catch(erro => {
            console.log(erro)
        })
    }

    return(
        <div className='cadastro-macros'>
            <form onSubmit={cadastrar_macro}>
                <label htmlFor='titulo'>Título</label>
                
                <input 
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                name='titulo'
                id='titulo'/>
                
                <label htmlFor='texto'>Texto</label> 
                
                <textarea
                placeholder='Digite o texto'
                value={texto}
                onChange={e => setTexto(e.target.value)}
                name='texto'
                id='texto'/>

                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default Cadastro_Macros