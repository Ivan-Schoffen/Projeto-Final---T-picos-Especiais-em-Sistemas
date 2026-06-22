import { useEffect, useState } from "react";
import Livro from "../../../models/Livro";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function DeletarLivros() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscarLivroAPI();
    }, []);

    async function buscarLivroAPI() {
        try {
            const resposta = await api.get<Livro>(`/api/livro/buscar/${id}`);

            setTitulo(resposta.data.titulo || "");
            setAutor(resposta.data.autor || "");
            setQuantidade(resposta.data.quantidade ? resposta.data.quantidade.toString() : "0");
        } catch (error) {
            console.error("Erro ao buscar livro:", error);
        }
    }

    async function deletarLivroAPI(e: any) {
        e.preventDefault();

        try {
            // Chamando a rota de deletar da API C# via POST
            await api.post(`/api/livro/deletar/${id}`);

            alert("Livro deletado com sucesso!");
            navigate("/"); // Redireciona para a listagem
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
            alert("Erro ao deletar livro.");
        }
    }

    return (
        <div className="DeletarLivro">
            <h1>Deletar Livro</h1>
            <form onSubmit={deletarLivroAPI}>
                <div>
                    <label>Título:</label>
                    <input
                        value={titulo}
                        disabled
                        type="text"
                    />
                </div>
                <div>
                    <label>Autor:</label>
                    <input
                        value={autor}
                        disabled
                        type="text"
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input
                        value={quantidade}
                        disabled
                        type="text"
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        Tem certeza que deseja deletar este livro? Esta ação não pode ser desfeita.
                    </p>
                    <button type="submit" style={{ backgroundColor: "red", color: "white", padding: "8px 16px", border: "none", cursor: "pointer", marginRight: "10px" }}>
                        Confirmar Deleção
                    </button>
                    <button type="button" onClick={() => navigate("/")} style={{ padding: "8px 16px", cursor: "pointer" }}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeletarLivros;
