const usuario_repository = require("../repository/usuario_repository");
const produtoRepository = require("../repository/produto_repository");
const enviarEmail = require("./enviarEmail");

const verificarProximoValidade = async () => {
  // Lógica para buscar produtos próximos da validade no banco de dados
  let produtosProximosValidade;
  const produtos = await produtoRepository.buscarProdutos();
  if (!produtos) {
    console.log("Nenhum produto encontrado");
  } else {
    produtosProximosValidade = produtos.map((produto) => {
      if (
        new Date(produto.data_validade).getTime() - new Date().getTime() <=
        3213668364
      ) {
        return produto;
      }
      return null;
    });
  }
  const usuarios = await usuario_repository.buscarUsuarios();

  // Enviar e-mail para cada usuário sobre o produto
  if (!usuarios) {
    console.log("Nenhum usuário para enviar o alerta");
  } else {
    usuarios.forEach((usuario) => {
      if (!produtosProximosValidade) {
        console.log("Nenhum produto para enviar o alerta");
      } else {
        produtosProximosValidade.forEach((produto) => {
          if (produto != null) {
            enviarEmail(
              usuario.email,
              "Alerta de validade",
              "Um dos seus produtos está próximo da data de validade: " +
                produto.nome +
                " no dia: " +
                produto.data_validade.getDate() +
                "/" +
                produto.data_validade.getMonth()
            );
          }
        });
      }
    });
  }
};

module.exports = verificarProximoValidade;
