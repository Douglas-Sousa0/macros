import { useState, useEffect } from 'react'
import { database } from '../../firebaseConnection'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'

import './macros.css'


function Macros(){
    const [macros, setMacros] = useState([])
    const [textoAtual, setTextoAtual] = useState('')
    const [indexAtual, setIndexAtual] = useState(0)
    const [idAtual, setIdAtual] = useState('')
    const [possuiVariantes, setPossuiVariantes] = useState(false)
    const [variantes, setVariantes] = useState({})

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
                    texto: item.data().texto,
                    possuiVariantes: item.data().possuiVariantes,
                    variantes: item.data().variantes
                })     
            })
            
            lista.sort((a, b) => a.titulo.localeCompare(b.titulo))

            setMacros(lista)
            setIdAtual(lista[indexAtual].id)
            setTextoAtual(lista[indexAtual].texto)
            setVariantes(lista[indexAtual].variantes)
            setPossuiVariantes(lista[indexAtual].possuiVariantes)

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
            setTextoAtual(macros[indexAtual].texto)
        }  
    }

    async function editar_macro(){
        const ref = doc(database, 'macros', idAtual)

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
                setIndexAtual(e.target.value)
                setTextoAtual(macros[e.target.value].texto)
                setIdAtual(macros[e.target.value].id)
                setVariantes(macros[e.target.value].variantes)
                setPossuiVariantes(macros[e.target.value].possuiVariantes)

                console.log(macros)
            }}
            >
                {macros.map( (item, index) => {
                    return(
                        <option key={item.id} value={index}>{item.titulo}</option>
                    )
                })}
            </select>

            <label>
                <input 
                type='radio'
                name='radio-texto'
                defaultChecked
                onChange={ e => setTextoAtual(macros[indexAtual].texto)}
                />
                Primário
            </label>
            
            {possuiVariantes && Object.values(variantes).map( (item, index) => {
                return(
                     <label key={`variante-${index}`} htmlFor=''>
                        <input 
                        type='radio'
                        name='radio-texto'
                        value={`variante_${index}`}
                        onChange={ e => setTextoAtual(item)}
                        />

                        Variante {index + 1}
                    </label>
                )
            })}
          
          
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