import { useEffect, useState } from "react";
import Leitor from "../../../models/Leitor";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function DeletarLeitores() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscarLeitorAPI();
    }, []);

    async function buscarLeitorAPI() {
        try {
            const resposta = await api.get<Leitor>(`/api/leitor/buscar/${id}`);
            
            setNome(resposta.data.nome || "");
            setEmail(resposta.data.email || "");
            setTelefone(resposta.data.telefone || "");
        } catch (error) {
            console.error("Erro ao buscar leitor:", error);
        }
    }

    async function deletarLeitorAPI(e: any) {
        e.preventDefault();
        
        try {
            // Chamando a rota de deletar leitor da API C# via POST
            await api.post(`/api/leitor/deletar/${id}`);

            alert("Leitor deletado com sucesso!");
            navigate("/pages/leitor/listar"); // Redireciona para a listagem de leitores
        } catch (error) {
            console.error("Erro ao deletar leitor:", error);
            alert("Erro ao deletar leitor.");
        }
    }

    return (
        <div className="DeletarLeitor">
            <h1>Deletar Leitor</h1>
            <form onSubmit={deletarLeitorAPI}>
                <div>
                    <label>Nome:</label>
                    <input 
                        value={nome} 
                        disabled 
                        type="text" 
                    />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input 
                        value={email} 
                        disabled 
                        type="email" 
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input 
                        value={telefone} 
                        disabled 
                        type="text" 
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        Tem certeza que deseja deletar este leitor? Esta ação não pode ser desfeita.
                    </p>
                    <button type="submit" style={{ backgroundColor: "red", color: "white", padding: "8px 16px", border: "none", cursor: "pointer", marginRight: "10px" }}>
                        Confirmar Deleção
                    </button>
                    <button type="button" onClick={() => navigate("/pages/leitor/listar")} style={{ padding: "8px 16px", cursor: "pointer" }}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeletarLeitores;
