import API_URL from "../config/api";

async function getLivros() {
  const resposta = await fetch(`${API_URL}/livros`);
  const dados = await resposta.json();
  return dados;
}

async function criarLivro(livro) {
  const resposta = await fetch(`${API_URL}/livros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro),
  });
  const dados = await resposta.json();
  return dados;
}

async function atualizarLivro(id, livro) {
  const resposta = await fetch(`${API_URL}/livros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro),
  });
  const dados = await resposta.json();
  return dados;
}

async function deletarLivro(id) {
  const resposta = await fetch(`${API_URL}/livros/${id}`, {
    method: "DELETE",
  });
  const dados = await resposta.json();
  return dados;
}

export { getLivros, criarLivro, atualizarLivro, deletarLivro };