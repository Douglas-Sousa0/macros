import { useState } from 'react'
import { database } from '../../firebaseConnection'
import { collection, addDoc } from 'firebase/firestore'
import './cadastro_macros.css'

function CadastroMacros(){
    const [titulo, setTitulo] = useState('')
    const [texto, setTexto] = useState('')

   /*  const [addVariantes, setAddVariantes] = useState(false)
    const [qtdVariantes, setQtdVariantes] = useState(0)
 */
    let lista_variantes = []

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

    /* for(let contador = 0; contador < qtdVariantes; contador++){
        lista_variantes.push(
            <textarea 
            placeholder='Digite um texto'
            key={contador}/>
        )
    } */

    /* useEffect(() => {

    }, [qtdVariantes])
 */
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
                id='titulo'
                autoComplete='off'/>
                
                {/* <label>
                    <input 
                    type='checkbox'
                    checked={addVariantes}
                    onChange={e => setAddVariantes(!addVariantes)}/>  
                    Variantes
                </label>

                {addVariantes && 
                <label>Quantidade:
                    <input 
                    type='number'
                    min={1}
                    max={5}
                    defaultValue={1}
                    onChange={e => setQtdVariantes(e.target.value)}/>
                </label>
                } */}
                
                <label htmlFor='texto'>Texto</label> 
                
                <textarea
                placeholder='Digite o texto'
                value={texto}
                onChange={e => setTexto(e.target.value)}
                name='texto'
                id='texto'/>
{/* 
                {lista_variantes}
 */}
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastroMacros
