import { useState, useEffect } from "react";
import api from "../../../services/api";
import Livro from "../../../models/Livro";
import Leitor from "../../../models/Leitor";
import Emprestimo from "../../../models/Emprestimo";
import { useNavigate } from "react-router-dom";

function CadastrarEmprestimo() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [leitores, setLeitores] = useState<Leitor[]>([]);
    const [livroId, setLivroId] = useState("");
    const [leitorId, setLeitorId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        carregarLivros();
        carregarLeitores();
    }, []);

    async function carregarLivros() {
        try {
            const resposta = await api.get<Livro[]>("/api/livro/listar");
            setLivros(resposta.data);
            if (resposta.data.length > 0) {
                setLivroId(resposta.data[0].id || "");
            }
        } catch (error) {
            console.error("Erro ao carregar livros:", error);
        }
    }

    async function carregarLeitores() {
        try {
            const resposta = await api.get<Leitor[]>("/api/leitor/listar");
            setLeitores(resposta.data);
            if (resposta.data.length > 0) {
                setLeitorId(resposta.data[0].id || "");
            }
        } catch (error) {
            console.error("Erro ao carregar leitores:", error);
        }
    }

    async function enviarEmprestimoAPI(e: any) {
        e.preventDefault();

        if (!livroId || !leitorId) {
            alert("Selecione um livro e um leitor!");
            return;
        }

        try {
            const emprestimo: Emprestimo = {
                livroId,
                leitorId
            };

            await api.post("/api/emprestimo/emprestar", emprestimo);

            alert("Empréstimo efetuado com sucesso!");
            navigate("/pages/emprestimo/listar");
        } catch (error: any) {
            console.error("Erro ao realizar empréstimo:", error);
            if (error.response && error.response.data) {
                alert(`Erro: ${error.response.data}`);
            } else {
                alert("Erro ao realizar empréstimo.");
            }
        }
    }

    return (
        <div className="CadastrarEmprestimo">
            <h1>Cadastrar Empréstimo</h1>
            <form onSubmit={enviarEmprestimoAPI}>
                <div>
                    <label>Livro:</label>
                    <select
                        value={livroId}
                        required
                        onChange={(e: any) => setLivroId(e.target.value)}
                    >
                        <option value="">Selecione um livro</option>
                        {livros.map((livro) => (
                            <option key={livro.id} value={livro.id}>
                                {livro.titulo} (Qtd: {livro.quantidade})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Leitor:</label>
                    <select
                        value={leitorId}
                        required
                        onChange={(e: any) => setLeitorId(e.target.value)}
                    >
                        <option value="">Selecione um leitor</option>
                        {leitores.map((leitor) => (
                            <option key={leitor.id} value={leitor.id}>
                                {leitor.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">
                        Confirmar Empréstimo
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarEmprestimo;
