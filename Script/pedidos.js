// Botões
const solicitarButton = document.getElementById('solicitarItem');
const pedidosButton = document.getElementById('pedidosRecentes');
const buttonCarrinho = document.getElementById('buttonCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');

// Formulários
const formSolicitar = document.getElementById('formSolicitar');
const contentCarrinho = document.getElementById('contentCarrinho');

// Variáveis para inicializar
let carrinhoEmpty = "S";

// Mostrar o formulário de solicitação
solicitarButton?.addEventListener('click', function () {
    if (formSolicitar.style.display === 'none' || formSolicitar.style.display === '') {
        styleForms('none', 'block', 'none', 'none');
        document.getElementById('userInfo').classList.add('hidden');
    } else {
        formSolicitar.style.display = 'none';
    }
});

// Mostrar o carrinho ao clicar no botão
buttonCarrinho?.addEventListener('click', function () {
    contentCarrinho.classList.remove('hidden'); // Remove a classe 'hidden'
    contentCarrinho.classList.add('show'); // Adiciona a classe 'show' (usada para transição)
    document.body.classList.add('open-carrinho'); // Adiciona uma classe para a body (se precisar)

    if (carrinhoEmpty == "S") {
        document.getElementById('carrinhoFull').style.display = 'none';
    } else {
        document.getElementById('carrinhoEmpty').style.display = 'none';
    }
});

// Fechar o carrinho ao clicar no botão
fecharCarrinho?.addEventListener('click', function () {
    contentCarrinho.classList.add('hidden'); // Adiciona 'hidden' novamente
    contentCarrinho.classList.remove('show');
    document.body.classList.remove('open-carrinho');
});

// Exibir botão pedidos apenas para Admin
if (userFunction === 'Admin') {
    pedidosButton.style.display = 'inline';
}
