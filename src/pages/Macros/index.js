import { useState, useEffect } from 'react'
import { database } from '../../firebaseConnection'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'

import './macros.css'


function Macros(){
    const [macros, setMacros] = useState([])
    const [textoAtual, setTextoAtual] = useState('')
    const [indexTextoAtual, setIndexTextoAtual] = useState(0)
    const [idTextoAtual, setIdTextoAtual] = useState('')

    const [textoCopiar, setTextoCopiar] = useState('Copiar')
    const [textoEditar, setTextoEditar] = useState('Editar')
    const [classEditar, setClassEditar] = useState('editar-desativado')

    const [modoLeitura, setModoLeitura] = useState(true)
    
    const [loading, setLoading] = useState(true)

    async function buscar_macros(){
        const ref = collection(database, 'macros')
    
        await getDocs(ref)
        .then(snapshot => {
            let lista = []

            snapshot.forEach(item => {
                lista.push({
                    id: item.id,
                    titulo: item.data().titulo,
                    texto: item.data().texto
                })
            })
            
            lista.sort((a, b) => a.titulo.localeCompare(b.titulo))

            setMacros(lista)
            setTextoAtual(lista[0].texto)
            setIdTextoAtual(lista[0].id)
            setLoading(false)
        })
        .catch(erro => {
            console.log(erro)
        })

    }

    function copiar_texto(){
        navigator.clipboard.writeText(textoAtual)

        setTextoCopiar('O texto foi copiado')

        setTimeout( () => {
            setTextoCopiar('Copiar')
        }, 1000)
    }

    function alterar_modo(){
        setModoLeitura(!modoLeitura)

        if(modoLeitura){
            setTextoEditar('Voltar')
            setClassEditar('editar-ativado')
        } else{
            setTextoEditar('Editar')
            setClassEditar('editar-desativado')
            setTextoAtual(macros[indexTextoAtual].texto)
        }  
    }

    async function editar_macro(){
        const ref = doc(database, 'macros', idTextoAtual)

        await updateDoc(ref, {
            texto: textoAtual
        })
        .then(() => {
            console.log('Atualização realizada com sucesso')

            buscar_macros()
            
            setModoLeitura(true)
            setTextoEditar('Editar')
            setClassEditar('editar-desativado')
        })
        .catch(erro => {
            console.log(erro)
        })
    }

    useEffect(() => {
        buscar_macros()
    }, [])

    if(loading){
        return(
            <h1>Carregando</h1>
        )
    }

    return(
        <div className='area-macros'>
            <select id='select_macros'className='fundo-macros' 
            selected
            onChange={ e => {
                setTextoAtual(macros[e.target.value].texto)
                setIndexTextoAtual(e.target.value)
                setIdTextoAtual(e.target.value)
            }}
            >
                {macros.map( (item, index) => {
                    return(
                        <option key={item.id} value={index}>{item.titulo}</option>
                    )
                })}
            </select>
          
            <textarea className='fundo-macros' id='texto' value={textoAtual} readOnly={modoLeitura} onChange={e => setTextoAtual(e.target.value)}></textarea>
            
            <div className='area-botoes'>
                <button className='botao-copiar' onClick={copiar_texto}>{textoCopiar}</button>
                
                {!modoLeitura && <button className='botao-concluir' onClick={editar_macro}>Concluir</button> }
                <button className={`botao-editar ${classEditar}`} onClick={alterar_modo}>{textoEditar}</button>
            </div>
        </div>
    )
}

export default Macros

// área de select com opção de todos os títulos - feito
// botão para copiar texto - feito
// botão para editar o título/texto
// botões 'radio' para caso o texto possua variantes

