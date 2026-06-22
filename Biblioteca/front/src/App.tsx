import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ListarLivros from './components/pages/Livro/ListarLivros';
import CadastrarLivros from './components/pages/Livro/CadastrarLivros';
import DeletarLivros from './components/pages/Livro/DeletarLivros';
import CadastrarLeitor from './components/pages/Leitor/CadastrarLeitor';
import ListarLeitores from './components/pages/Leitor/ListarLeitores';
import DeletarLeitores from './components/pages/Leitor/DeletarLeitores';
import AlterarLeitor from './components/pages/Leitor/AlterarLeitor';
import CadastrarEmprestimo from './components/pages/Emprestimo/CadastrarEmprestimo';
import ListarEmprestimos from './components/pages/Emprestimo/ListarEmprestimos';
import DevolverLivro from './components/pages/Emprestimo/DevolverLivro';
import ListarHistorico from './components/pages/Emprestimo/ListarHistorico';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="nav-container">
          <div className="nav-column">
            <h3>Geral</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
          <div className="nav-column">
            <h3>Livros</h3>
            <ul>
              <li>
                <Link to="/pages/livro/cadastrar">Cadastrar Livro</Link>
              </li>
            </ul>
          </div>
          <div className="nav-column">
            <h3>Leitores</h3>
            <ul>
              <li>
                <Link to="/pages/leitor/cadastrar">Cadastrar Leitor</Link>
              </li>
              <li>
                <Link to="/pages/leitor/listar">Listar Leitores</Link>
              </li>
            </ul>
          </div>
          <div className="nav-column">
            <h3>Empréstimos</h3>
            <ul>
              <li>
                <Link to="/pages/emprestimo/cadastrar">Cadastrar Empréstimo</Link>
              </li>
              <li>
                <Link to="/pages/emprestimo/listar">Listar Empréstimos</Link>
              </li>
              <li>
                <Link to="/pages/emprestimo/devolver">Devolver Empréstimo</Link>
              </li>
            </ul>
          </div>
          <div className="nav-column">
            <h3>Histórico</h3>
            <ul>
              <li>
                <Link to="/pages/historico/listar">Histórico de Devoluções</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ListarLivros />} />
          <Route path="/pages/livro/cadastrar"
            element={<CadastrarLivros />} />
          <Route path="/pages/leitor/cadastrar"
            element={<CadastrarLeitor />} />
          <Route path="/pages/leitor/listar"
            element={<ListarLeitores />} />
          <Route path="/pages/leitor/alterar/:id"
            element={<AlterarLeitor />} />
          <Route path="/pages/leitor/deletar/:id"
            element={<DeletarLeitores />} />
          <Route path="/deletar/:id"
            element={<DeletarLivros />} />
          <Route path="/pages/emprestimo/cadastrar"
            element={<CadastrarEmprestimo />} />
          <Route path="/pages/emprestimo/listar"
            element={<ListarEmprestimos />} />
          <Route path="/pages/emprestimo/devolver"
            element={<DevolverLivro />} />
          <Route path="/pages/historico/listar"
            element={<ListarHistorico />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
