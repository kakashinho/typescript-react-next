import Image from "next/image"; //ajuda exibir imagens otimizadas.
import Link from 'next/link';// serve para navegar entre páginas sem recarregar a tela

//função principal da página
export default function Home() {
  return (
    //conteúdo HTML dentro de <div>
    <div>
      Bem-vindo á Celk!<br/>
      {/* link que leva para a página onde os usuários estão listados */}
      <Link href="./users/list">Usuários</Link>
    </div>
  );
}
