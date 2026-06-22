import { useEffect, useState } from "react";
import Leitor from "../../../models/Leitor";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

function ListarLeitores() {
    const [leitores, setLeitores] = useState<Leitor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarLeitoresAPI();
    }, []);

    async function carregarLeitoresAPI() {
        try {
            const resposta = await api.get<Leitor[]>("/api/leitor/listar");
            setLeitores(resposta.data);
        } catch (error) {
            console.error("Erro ao listar leitores:", error);
        }
    }

    return (
        <div className="ListarLeitores">
            <h1>Listagem de Leitores</h1>
            
            {leitores.length === 0 ? (
                <p>Nenhum leitor cadastrado.</p>
            ) : (
                <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ padding: "8px" }}>Nome</th>
                            <th style={{ padding: "8px" }}>E-mail</th>
                            <th style={{ padding: "8px" }}>Telefone</th>
                            <th style={{ padding: "8px" }}>Alterar</th>
                            <th style={{ padding: "8px" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leitores.map((leitor) => (
                            <tr key={leitor.id}>
                                <td style={{ padding: "8px" }}>{leitor.nome}</td>
                                <td style={{ padding: "8px" }}>{leitor.email}</td>
                                <td style={{ padding: "8px" }}>{leitor.telefone}</td>
                                <td style={{ padding: "8px" }}>
                                    <button onClick={() => navigate(`/pages/leitor/alterar/${leitor.id}`)}>
                                        Editar
                                    </button>
                                </td>
                                <td style={{ padding: "8px" }}>
                                    <button onClick={() => navigate(`/pages/leitor/deletar/${leitor.id}`)}>
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

export default ListarLeitores;
