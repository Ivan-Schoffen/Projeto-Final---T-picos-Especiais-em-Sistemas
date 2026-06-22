import Leitor from "./Leitor";
import Livro from "./Livro";

export default interface Emprestimo {
    id?: string;
    livroId: string;
    livro?: Livro;
    leitorId: string;
    leitor?: Leitor;
    dataEmprestimo?: string;
    dataDevolucao?: string;
}

export interface EmprestimoListagem {
    id_Emprestimo: string;
    titulo_Livro: string;
    nome_Leitor: string;
    data_Emprestimo: string;
}
