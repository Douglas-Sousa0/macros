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
    const [varianteSelecionada, setVarianteSelecionada] = useState(false)

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
            setLoading(false)
            
            setIdAtual(lista[indexAtual].id)
            setVariantes(lista[indexAtual].variantes)
            setPossuiVariantes(lista[indexAtual].possuiVariantes)

            if(varianteSelecionada === false){
                setTextoAtual(lista[indexAtual].texto)
            } else{
                setTextoAtual(lista[indexAtual].variantes[varianteSelecionada])
            }

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

            if(varianteSelecionada != false ){
               setTextoAtual(macros[indexAtual].variantes[varianteSelecionada]) 
            } else{
                setTextoAtual(macros[indexAtual].texto)
            }
        } 
    }

    async function editar_macro(){
        const ref = doc(database, 'macros', idAtual)
        
        let campo_atualizar

        if(varianteSelecionada === false){
            campo_atualizar = 'texto'
        } else{
            campo_atualizar = `variantes.${varianteSelecionada}`
        }

        await updateDoc(ref, {
            [campo_atualizar]: textoAtual
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

    if(macros.length === 0){
        return(
            <h1>Nenhuma macro foi cadastrada até o momento</h1>
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
                setVarianteSelecionada(false)
            }}
            >
                {macros.map( (item, index) => {
                    return(
                        <option key={item.id} value={index}>{item.titulo}</option>
                    )
                })}
            </select>
            
            {possuiVariantes &&
                <div className='area-variantes'>
                    <label>
                        <input 
                        type='radio'
                        name='radio-texto'
                        value='primario'
                        defaultChecked
                        onChange={ e => {
                            setTextoAtual(macros[indexAtual].texto)
                            setVarianteSelecionada(false)
                        }}
                        />
                        Primário
                    </label>
                    
                    {Object.keys(variantes).sort().map( (item, index) => {
                        return(
                        <label key={`label-${item}`} htmlFor={`radio-${item}`}>
                            <input 
                            type='radio'
                            name='radio-texto'
                            id={`radio-${item}`}
                            value={item}
                            onChange={ e => {
                                setTextoAtual(macros[indexAtual].variantes[e.target.value])
                                setVarianteSelecionada(e.target.value)
                                console.log(e.target.value)
                            }}
                            />

                            Variante { index + 1}
                        </label>
                    )
                })}
                </div>
            }

            
          
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