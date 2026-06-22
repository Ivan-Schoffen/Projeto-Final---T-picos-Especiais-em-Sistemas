import Leitor from "./Leitor";
import Livro from "./Livro";

export default interface Historico {
    id?: string;
    livroId: string;
    livro?: Livro;
    leitorId: string;
    leitor?: Leitor;
    dataEmprestimo?: string;
    dataDevolucao?: string;
}

export interface HistoricoListagem {
    id_historico: string;
    titulo_Livro: string;
    nome_Leitor: string;
    data_Emprestimo: string;
    data_Devolucao: string;
}
