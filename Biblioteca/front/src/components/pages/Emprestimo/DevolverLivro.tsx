import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

function DevolverLivro() {
    const [emprestimoId, setEmprestimoId] = useState("");
    const navigate = useNavigate();

    async function devolverLivroAPI(e: any) {
        e.preventDefault();

        if (!emprestimoId.trim()) {
            alert("Por favor, digite o ID do empréstimo!");
            return;
        }

        try {
            await api.post(`/api/emprestimo/devolver/${emprestimoId}`);
            alert("Livro devolvido com sucesso!");
            setEmprestimoId("");
            navigate("/pages/historico/listar");
        } catch (error: any) {
            console.error("Erro ao devolver livro:", error);
            if (error.response && error.response.data) {
                alert(`Erro: ${error.response.data}`);
            } else {
                alert("Erro ao devolver o livro. Verifique o ID digitado.");
            }
        }
    }

    return (
        <div className="DevolverLivro">
            <h1>Devolver Livro</h1>
            <form onSubmit={devolverLivroAPI}>
                <div>
                    <label>ID do Empréstimo:</label>
                    <input
                        value={emprestimoId}
                        required
                        type="text"
                        placeholder="Digite o ID do empréstimo"
                        onChange={(e: any) => setEmprestimoId(e.target.value)}
                        style={{ width: "300px", padding: "8px", margin: "10px 0" }}
                    />
                </div>
                <div>
                    <button type="submit" style={{ padding: "8px 16px" }}>
                        Devolver Livro
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DevolverLivro;
