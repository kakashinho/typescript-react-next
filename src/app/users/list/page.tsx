//diz ao Next.js que essa página roda no navegador (não só no servidor).
//necessário porque vamos usar hooks como useState e useEffect.
'use client'

//instance que faz requisições para o backend (como GET, POST, etc).
//"cliente HTTP", criado com o axios.
import instance from "@/services/api"

//useEffect e useState são funções especiais do React:
//useState guarda informações (como uma memória).
//useEffect executa algo automaticamente quando a tela carrega.
import { useEffect, useState } from "react"

//Usuário tem:
interface User{
    id: number,
    name: string,
    email: string,
}

export default function Users(){
    // Estado para controle de erros
    // guarda mensagens de erro (ou null se não tem erro).
    const [error, setError] = useState<string | null >(null)

    // Estado para armazenar os usuários
    //é a lista dos usuários (vem do banco).
    const [users, setUsers] = useState<User[]>([])

    // Função para buscar os usuários da API, função assíncrona
    const fetchUsers = async () => {
        try{
            //Faz uma chamada GET /users para o servidor.
           const response =  await instance.get("/users")

           // atualiza o estado com os dados da API
           //Salva a resposta na variável users.
           setUsers(response.data)

        }catch(error){
            //Se algo der errado, mostra um erro.
            setError("Erro ao carregar os usuários")
        }
    }

    //Executar essa função quando a página carregar
    useEffect(()=> {
        // Busca os dados ao carregar a página
        fetchUsers()
    },[])// O [] quer dizer que isso acontece só uma vez.

    return(
        <div>
            <h1>Listar os usuários</h1>

            {/* Exibe mensagem de erro */}
            {error && <p style={{color: "#f00"}}>{error}</p>}
            <table>
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                </thead>
            </table>
            <tbody>
                {/* {users.map(...)} vai repetir o <tr> para cada usuário na lista. */}
                {users.map((user) => (
                    // {user.id} etc. mostram os dados daquele usuário
                    <tr key = {user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </div>
    )
}