import { useEffect, useState } from "react";
import Livro from "../../../models/Livro";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

function ListarLivros() {
    // Estado configurado como um array de Livros
    const [livros, setLivros] = useState<Livro[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarLivrosAPI();
    }, []);

    async function carregarLivrosAPI() {
        try {
            // Rota ajustada (se sua API C# usar /api/livro/listar, lembre de alterar aqui)
            const resposta = await api.get<Livro[]>("/api/livro/listar");
            setLivros(resposta.data);
        } catch (error) {
            console.error("Erro ao listar livros:", error);
        }
    }

    return (
        <div className="ListarLivros">
            <h1>Listagem de Livros</h1>

            {livros.length === 0 ? (
                <p>Nenhum livro cadastrado.</p>
            ) : (
                <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ padding: "8px" }}>Título</th>
                            <th style={{ padding: "8px" }}>Autor</th>
                            <th style={{ padding: "8px" }}>Quantidade</th>
                            <th style={{ padding: "8px" }}>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <tr key={livro.id}>
                                <td style={{ padding: "8px" }}>{livro.titulo}</td>
                                <td style={{ padding: "8px" }}>{livro.autor}</td>
                                <td style={{ padding: "8px" }}>{livro.quantidade}</td>
                                <td style={{ padding: "8px" }}>
                                    <button onClick={() => navigate(`/deletar/${livro.id}`)}>
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListarLivros;