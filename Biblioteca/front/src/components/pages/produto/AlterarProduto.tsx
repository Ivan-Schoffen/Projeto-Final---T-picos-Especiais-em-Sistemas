import { useEffect, useState } from "react";
import Livro from "../../../models/Livro";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function AlterarLivro() {
    // Estados convertidos para a estrutura de Livro
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
            // Rota ajustada para buscar livro (se sua API C# usar /api/livro/buscar, mude aqui)
            const resposta = await api.get<Livro>(`/api/produto/buscar/${id}`);
            
            setTitulo(resposta.data.titulo);
            setAutor(resposta.data.autor ? resposta.data.autor.toString() : "");
            setQuantidade(resposta.data.quantidade ? resposta.data.quantidade.toString() : "0");
        } catch (error) {
            console.error("Erro ao buscar livro:", error);
        }
    }

    async function enviarLivroAPI(e: any) {
        e.preventDefault();
        
        try {
            const livro: Livro = { 
                id,
                titulo, 
                autor,
                quantidade: Number(quantidade)
            };

            // Rota ajustada para alterar (se sua API C# usar /api/livro/alterar, mude aqui)
            await api.put("/api/produto/alterar", livro);

            // Limpa os estados por garantia (embora vá navegar para longe)
            setTitulo("");
            setAutor("");
            setQuantidade("");

            alert("Livro atualizado com sucesso!");
            navigate("/"); // Redireciona para a listagem
        } catch (error) {
            console.error("Erro ao alterar livro:", error);
        }
    }

    return (
        <div className="AlterarLivro">
            <h1>Alterar Livro</h1>
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
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AlterarLivro;