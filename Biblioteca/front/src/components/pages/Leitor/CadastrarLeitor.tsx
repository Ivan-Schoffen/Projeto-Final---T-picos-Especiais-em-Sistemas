import { useState } from "react";
import api from "../../../services/api";
import Leitor from "../../../models/Leitor";

function CadastrarLeitor() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    async function enviarLeitorAPI(e: any) {
        e.preventDefault();

        try {
            const leitor: Leitor = {
                nome,
                email,
                telefone,
            };

            const resposta = await api.post("/api/leitor/cadastrar", leitor);

            setNome("");
            setEmail("");
            setTelefone("");

            console.log("Leitor cadastrado com sucesso:", resposta.data);
            alert("Leitor cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar leitor:", error);
        }
    }

    return (
        <div className="CadastrarLeitor">
            <h1>Cadastrar Leitor</h1>
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
                    <label>Email:</label>
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
                        type="number"
                        min="0"
                        onChange={(e: any) => setTelefone(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">
                        Cadastrar Leitor
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarLeitor;