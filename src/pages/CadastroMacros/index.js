import { useState, useReducer } from 'react'
import { database } from '../../firebaseConnection'
import { collection, addDoc } from 'firebase/firestore'
import './cadastro_macros.css'

function CadastroMacros(){
    const [titulo, setTitulo] = useState('')
    const [texto, setTexto] = useState('')

    const [addVariantes, setAddVariantes] = useState(false)
    const [qtdVariantes, setQtdVariantes] = useState(1)
    
    const [variantes, dispatch] = useReducer(atualizar_variantes, {
        variante_1: '',
        variante_2: '',
        variante_3: '',
        variante_4: '',
        variante_5: ''
    })

    let lista_variantes = []

    async function cadastrar_macro(e){
        e.preventDefault()

        const ref = collection(database, 'macros')

        let campos = {
            titulo: titulo,
            texto: texto,
            possuiVariantes: addVariantes
        }

        if(addVariantes){
            campos.variantes = {}
            
            for(let contador = 0; contador < qtdVariantes; contador++){
                campos.variantes[`variante_${contador + 1}`] = variantes[`variante_${contador + 1}`]
            }
        }
            
        await addDoc(ref, campos)
        .then(() => {
            setTitulo('')
            setTexto('')
            dispatch({ type: 'LIMPAR_TUDO'})
        })
        .catch(erro => {
            console.log(erro)
        })
    }

    function atualizar_variantes(variantes, acao){
        switch (acao.type){
            case 'VARIANTE_1':
                return { ...variantes, variante_1: acao.payload }

            case 'VARIANTE_2':
                return { ...variantes, variante_2: acao.payload }
            
            case 'VARIANTE_3':
                return { ...variantes, variante_3: acao.payload }
            
            case 'VARIANTE_4':
                return { ...variantes, variante_4: acao.payload }
            
            case 'VARIANTE_5':
                return { ...variantes, variante_5: acao.payload}

            case 'LIMPAR_TUDO':
                return { variante_1: '', variante_2: '', variante_3: '', variante_4: '', variante_5: ''}
        }
    }


    for(let contador = 0; contador < qtdVariantes; contador++){
        lista_variantes.push(
            <>
                <label>Variante {contador + 1}</label>
                <textarea 
                placeholder='Digite um texto'
                required
                value={variantes[`variante_${contador + 1}`]}
                onChange={e => dispatch({ type: `VARIANTE_${contador + 1}`, payload: e.target.value})}/>
            </>
        )}

    return(
        <div className='cadastro-macros'>
            <form onSubmit={ cadastrar_macro }>
                <label htmlFor='titulo'>Título</label>
                
                <input 
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                name='titulo'
                id='titulo'
                autoComplete='off'
                required/>
                
                <label>
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
                    value={qtdVariantes}
                    onChange={e => setQtdVariantes(e.target.value)}
                    />
                </label>
                }
                
                <label htmlFor='texto'>Texto</label> 
                
                <textarea
                placeholder='Digite o texto'
                value={texto}
                onChange={e => setTexto(e.target.value)}
                name='texto'
                id='texto'
                required/>

                {addVariantes &&
                lista_variantes}

                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastroMacros
