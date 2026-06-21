import { useState } from "react";
import api from "../../../services/api";
import Livro from "../../../models/Livro";

function CadastrarLivro() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [quantidade, setQuantidade] = useState("");

    async function enviarLivroAPI(e: any) {
        e.preventDefault();

        try {
            const livro: Livro = { 
                titulo, 
                autor,
                quantidade: Number(quantidade),
            };

            const resposta = await api.post("/api/livro/cadastrar", livro);

            setTitulo("");
            setAutor("");
            setQuantidade("");

            console.log("Livro cadastrado com sucesso:", resposta.data);
            alert("Livro cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error);
        }
    }

    return (
        <div className="CadastrarLivro">
            <h1>Cadastrar Livro</h1>
            <form onSubmit={enviarLivroAPI}>
                <div>
                    <label>Título:</label>
                    <input 
                        value={titulo} 
                        required 
                        type="text" 
                        onChange={(e: any) => setTitulo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Autor:</label>
                    <input 
                        value={autor} 
                        required 
                        type="text" 
                        onChange={(e: any) => setAutor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input 
                        value={quantidade} 
                        required 
                        type="number" 
                        min="0"
                        onChange={(e: any) => setQuantidade(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">
                        Cadastrar Livro
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarLivro;