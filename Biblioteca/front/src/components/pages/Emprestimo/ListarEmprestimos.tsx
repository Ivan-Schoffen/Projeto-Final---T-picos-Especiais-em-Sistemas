import { useEffect, useState } from "react";
import api from "../../../services/api";
import { EmprestimoListagem } from "../../../models/Emprestimo";
import { useNavigate } from "react-router-dom";

function ListarEmprestimos() {
    const [emprestimos, setEmprestimos] = useState<EmprestimoListagem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarEmprestimos();
    }, []);

    async function carregarEmprestimos() {
        try {
            const resposta = await api.get<EmprestimoListagem[]>("/api/emprestimo/emprestados");
            setEmprestimos(resposta.data);
        } catch (error) {
            console.error("Erro ao listar empréstimos:", error);
            setEmprestimos([]);
        }
    }

    return (
        <div className="ListarEmprestimos">
            <h1>Listagem de Empréstimos Ativos</h1>

            {emprestimos.length === 0 ? (
                <p>Nenhum empréstimo ativo cadastrado.</p>
            ) : (
                <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ padding: "8px" }}>ID Empréstimo</th>
                            <th style={{ padding: "8px" }}>Livro</th>
                            <th style={{ padding: "8px" }}>Leitor</th>
                            <th style={{ padding: "8px" }}>Data do Empréstimo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emprestimos.map((emp) => (
                            <tr key={emp.id_Emprestimo}>
                                <td style={{ padding: "8px" }}>{emp.id_Emprestimo}</td>
                                <td style={{ padding: "8px" }}>{emp.titulo_Livro}</td>
                                <td style={{ padding: "8px" }}>{emp.nome_Leitor}</td>
                                <td style={{ padding: "8px" }}>{new Date(emp.data_Emprestimo).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListarEmprestimos;
