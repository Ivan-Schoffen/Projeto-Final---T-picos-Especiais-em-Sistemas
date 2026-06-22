# Sistema de Gerenciamento de Biblioteca

Este projeto é um sistema completo para controle de bibliotecas, permitindo a gestão de acervos de livros, o cadastro de leitores e o acompanhamento de empréstimos, devoluções e históricos. A aplicação é dividida em uma API no backend e uma interface web no frontend.

---

## 1. Identificação do Projeto

*   **Título do Projeto**: Sistema de Gerenciamento de Biblioteca
*   **Integrantes**: 
    *   Ivan Raimundo Schoffen
    *   Roger Polli de Oliveira
*   **Curso**: Análise e Desenvolvimento de Sistemas
*   **Turma**: 3° Período (Noite)

---

## 2. Resumo

O **Sistema de Gerenciamento de Biblioteca** é uma aplicação web moderna e robusta projetada para otimizar o controle de acervos literários e gerenciar com precisão a circulação de livros. A arquitetura foi desenvolvida utilizando o modelo cliente-servidor: o backend foi construído com **ASP.NET Core Minimal APIs** em C# e banco de dados **SQLite** para persistência leve e eficiente; já o frontend foi implementado com **React** e **TypeScript**, proporcionando uma interface de usuário altamente dinâmica e componentizada. O sistema oferece automações importantes, como a validação dinâmica de estoque disponível antes da autorização de novos empréstimos e a geração automática de logs históricos após cada devolução concluída.

---

## 3. Funcionalidades

*   **Catálogo Digital de Livros**: Cadastro de obras literárias, listagem completa do acervo em tempo real, busca rápida por identificador único e exclusão segura de registros.
*   **Gestão Cadastral de Leitores**: Registro de novos usuários leitores, listagem, visualização de perfis, edição de dados cadastrais (nome, e-mail e telefone) e remoção de registros.
*   **Controle Dinâmico de Empréstimos**: Vinculação estruturada entre leitor e livro com dedução automática de estoque no momento da retirada.
*   **Devolução Eficiente com Log**: Processamento do retorno de exemplares, atualização imediata da quantidade disponível e gravação do log de transação no histórico.
*   **Histórico Consolidado de Devoluções**: Registro histórico permanente contendo dados completos de empréstimo e devolução para auditoria e controle de fluxo.

---

## 4. Descrição das Funcionalidades

### 📚 Gestão de Livros
Permite aos administradores da biblioteca manter o acervo de obras atualizado. O cadastro exige informações essenciais como título, autor, gênero e quantidade física de exemplares. O sistema impede a duplicidade de títulos idênticos e permite visualizar a lista completa das obras cadastradas com seus respectivos saldos em estoque, além de disponibilizar a remoção física de livros que saíram de circulação.

### 👤 Gestão de Leitores
Facilita o controle de membros ativos aptos a realizar empréstimos. A funcionalidade oferece suporte para o cadastro e atualização de dados de contato do leitor, como e-mail e telefone, permitindo que a administração mantenha a base de dados dos usuários higienizada e atualizada. Caso um leitor se desligue da instituição, seu perfil pode ser removido do banco de dados de maneira ágil.

### 🔄 Fluxo de Empréstimo de Obras
Gerencia a saída de livros do acervo. No ato do empréstimo, o sistema verifica se o livro solicitado está disponível no estoque (quantidade maior que zero). Se aprovado, associa o ID do livro ao ID do leitor, registrando a data de início da transação e subtraindo uma unidade do saldo disponível do livro, garantindo que o estoque reflita o estado real físico da biblioteca.

### ↩️ Sistema de Devolução de Obras
Finaliza o ciclo de empréstimo ativo. Ao realizar a devolução através do identificador do empréstimo, a aplicação localiza a transação pendente, incrementa o estoque do livro em uma unidade para que o título volte a ficar disponível para outros usuários, e transfere a transação ativa para a tabela de Histórico, registrando a data e hora exatas da devolução.

### 📜 Histórico de Devoluções
Uma área dedicada à auditoria e relatórios de fluxo da biblioteca. Armazena de forma permanente todas as movimentações concluídas, vinculando o título do livro entregue, o nome do leitor que efetuou a leitura, e as respectivas datas de retirada e devolução. Essa persistência permite a visualização detalhada de transações passadas a qualquer momento.

---

## 5. Repositório

O projeto é entregue de forma unificada neste repositório, organizado nas seguintes pastas estruturais:

*   [`/Biblioteca/API`]: Código-fonte do backend desenvolvido em .NET (ASP.NET Core), contendo as Migrations do Entity Framework, as Models de dados, os contextos e o arquivo principal `Program.cs`.
*   [`/Biblioteca/front`]: Código-fonte da aplicação frontend em React, TypeScript e estilos CSS vanilla.

### Requisitos para Execução

1.  **Backend (API)**:
    *   Necessário ter instalado o [.NET SDK (versão 8.0 ou superior)](https://dotnet.microsoft.com/download).
    *   Navegar até a pasta `Biblioteca/API` e executar o comando:

        dotnet run
    
    *   A API estará disponível por padrão no endereço configurado na inicialização da aplicação local.

2.  **Frontend (React)**:
    *   Necessário ter instalado o [Node.js (LTS)](https://nodejs.org/).
    *   Navegar até a pasta `Biblioteca/front`, instalar as dependências e iniciar o servidor de desenvolvimento:
        
        npm install
        npm start

    *   A aplicação web abrirá automaticamente no navegador em `http://localhost:3000`.

---

## 6. Uso de IA

Conforme as diretrizes obrigatórias da atividade prática, este projeto utilizou Inteligência Artificial para apoiar todo o processo de documentação e refinamento textual do sistema.

*   **Ferramenta Utilizada**: Antigravity IDE (alimentado pelo modelo Gemini 3.5 Flash).
*   **Forma de Uso**:
    *   **Análise Autônoma de Código**: O modelo realizou varreduras automáticas nas estruturas do backend (`Program.cs`) e do frontend (`App.tsx`) para compreender de forma precisa as regras de negócio implementadas (como o controle de estoque nos empréstimos e a geração de históricos).
    *   **Engenharia de Prompts**: Foram submetidos prompts contextuais instruindo a IA a gerar redações profissionais no formato Markdown, especificando a estrutura exigida pelas diretrizes do projeto (Resumo estruturado, tópicos concisos e descrições detalhadas).
*   **Revisões Realizadas pela Equipe**:
    *   Validação manual da nomenclatura dos componentes e das dependências listadas no guia de execução do repositório.
    *   Revisão estilística e adaptação do tom do texto para garantir conformidade acadêmica com a disciplina de Tópicos Especiais em Sistemas.