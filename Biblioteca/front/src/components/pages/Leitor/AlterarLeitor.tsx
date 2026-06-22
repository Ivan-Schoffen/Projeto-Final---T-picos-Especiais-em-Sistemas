import { useEffect, useState } from "react";
import Leitor from "../../../models/Leitor";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function AlterarLeitor() {
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

    async function enviarLeitorAPI(e: any) {
        e.preventDefault();

        try {
            const leitor: Leitor = {
                id,
                nome,
                email,
                telefone,
            };

            await api.post("/api/leitor/alterar", leitor);

            setNome("");
            setEmail("");
            setTelefone("");

            alert("Leitor atualizado com sucesso!");
            navigate("/pages/leitor/listar");
        } catch (error) {
            console.error("Erro ao alterar leitor:", error);
            alert("Erro ao alterar leitor.");
        }
    }

    return (
        <div className="AlterarLeitor">
            <h1>Alterar Leitor</h1>
            <form onSubmit={enviarLeitorAPI}>
                <div>
                    <label>Nome:</label>
                    <input
                        value={nome}
                        required
                        type="text"
                        onChange={(e: any) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input
                        value={email}
                        required
                        type="email"
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        value={telefone}
                        required
                        type="text"
                        onChange={(e: any) => setTelefone(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AlterarLeitor;
