import { useState, useEffect } from 'react'
import { database } from '../../firebaseConnection'
import { collection, getDocs } from 'firebase/firestore'

import './macros.css'

function Macros(){
    const [macros, setMacros] = useState([])
    const [opcao, setOpcao] = useState(0)
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
            setLoading(false)
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
            <select id='select_macros' selected value={opcao} onChange={ e => setOpcao(e.target.value) } className='fundo-macros'>
                {macros.map( (item, index) => {
                    return(
                        <option key={item.id} value={index}>{item.titulo}</option>
                    )
                })}
            </select>
          
            <textarea className='fundo-macros' value={macros[opcao].texto} readOnly></textarea>
        </div>
    )
}

export default Macros

// área de select com opção de todos os títulos - feito
// botões 'radio' para caso o texto possua variantes
// botão para editar o título/texto