import { useEffect, useState } from "react";
import api from "../../../services/api";
import { HistoricoListagem } from "../../../models/Historico";

function ListarHistorico() {
    const [historico, setHistorico] = useState<HistoricoListagem[]>([]);

    useEffect(() => {
        carregarHistorico();
    }, []);

    async function carregarHistorico() {
        try {
            const resposta = await api.get<HistoricoListagem[]>("/api/historico/listar");
            setHistorico(resposta.data);
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
            setHistorico([]);
        }
    }

    return (
        <div className="ListarHistorico">
            <h1>Histórico de Livros Devolvidos</h1>

            {historico.length === 0 ? (
                <p>Nenhum registro de devolução no histórico.</p>
            ) : (
                <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ padding: "8px" }}>ID Histórico</th>
                            <th style={{ padding: "8px" }}>Livro</th>
                            <th style={{ padding: "8px" }}>Leitor</th>
                            <th style={{ padding: "8px" }}>Data do Empréstimo</th>
                            <th style={{ padding: "8px" }}>Data de Devolução</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historico.map((h) => (
                            <tr key={h.id_historico}>
                                <td style={{ padding: "8px" }}>{h.id_historico}</td>
                                <td style={{ padding: "8px" }}>{h.titulo_Livro}</td>
                                <td style={{ padding: "8px" }}>{h.nome_Leitor}</td>
                                <td style={{ padding: "8px" }}>{new Date(h.data_Emprestimo).toLocaleString()}</td>
                                <td style={{ padding: "8px" }}>{h.data_Devolucao ? new Date(h.data_Devolucao).toLocaleString() : "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListarHistorico;
