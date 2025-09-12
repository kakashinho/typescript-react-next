// A diretiva 'use client' indica que este componente é renderizado no cliente (navegador).
// Essa diretiva é especídifica do Next.js 13+ quando utiliza a renderização do lado do cliente.
'use client'

// Importar hooks do React para usar o estado
import React, { use, useState } from "react"

// Importar a instância do axios para fazer requisições para a API
import instance from "@/services/api"

// Importar o componente para criar link
import Link from 'next/link'

export default function CreateUser() {
    //React Hook: useState
    const [error, setError] = useState<string | null>(null);
    //"Eu quero um estado que comece com o valor null"
    // "Esse estado pode ser uma string ou null"
    //A função useState retorna um array com dois itens:
    // state[0] → valor atual
    // state[1] → função para atualizar o valor
    //[error, setError]:
    // error é a variável que armazena o valor atual do estado
    // setError é a função que altera esse valor

    const [sucess, setSucess] = useState<string | null>(null);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('')

    // Função para enviar os dados para a API
    const handleSubmit = async (event: React.FormEvent) => {
        //Evita o recarregamento da página ao enviar o formulário
        //Evitar que limpe o formulário
        event.preventDefault();

        // Limpa o erro anterior
        setError(null)
        // Limpa o sucesso anterior
        setSucess(null)
        try{
            // Fazer a requisição para API e enviar os dados
            const response = await instance.post('/users', {
                name,   //name: name,  name recebe name
                email,   //email: email, email recebe email
            })

            // Exibir a mensagem de sucesso
            setSucess(response.data.message)

            // Limpar o campo do formulário
            setName('')
            setEmail('')

        }catch(error: any){
            // Exibir a mensagem de erro
            setError(error.response.data.message)
        }
    }

    return(
        <div>
            <h1>Cadastrar usuário</h1>

            <Link href = {'/users/list'}>Listar</Link>

            {/* Exibe mensagem de erro */}
            {error && <p style={{color: "#f00"}}>{error}</p>}

            {/* Exibe mensagem de Sucesso */}
            {sucess && <p style={{color: "#0f0"}}>{sucess}</p>}
            <br /><br />

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome: </label>
                    <input 
                    type="text" 
                    id="name"
                    value={name}
                    placeholder="Nome completo do usuário" 
                    onChange={(e) => setName(e.target.value)}
                    className='border p-1'
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input 
                    type="email" 
                    id="email"
                    value={email}
                    placeholder="Melhor email do usuário" 
                    onChange={(e) => setEmail(e.target.value)}
                    className='border p-1'
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            
        </div>

    )
}