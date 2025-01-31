// Botoes
const solicitarButton = document.getElementById('solicitarItem');
const pedidosButton = document.getElementById('pedidosRecentes');
const buttonCarrinho = document.getElementById('buttonCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');

// Formulários
const formSolicitar = document.getElementById('formSolicitar');
const contentCarrinho = document.getElementById('contentCarrinho');

// Variáveis para inicializar
let carrinhoEmpty = "S";
let responseGetItem;
const listItensPedidos = JSON.parse(localStorage.getItem('carrinho')) || []; // Recupera o carrinho salvo

// Exibir botão pedidos apenas para Admin
if (userFunction === 'Admin') {
    pedidosButton.style.display = 'inline';
}

// Mostrar o carrinho ao clicar no botão
buttonCarrinho?.addEventListener('click', function () {
    if (contentCarrinho.classList.contains('show')) {
        contentCarrinho.classList.remove('show');
        contentCarrinho.classList.add('hidden');
        document.body.classList.remove('open-carrinho');
    } else {
        contentCarrinho.classList.remove('hidden');
        contentCarrinho.classList.add('show');
        document.body.classList.add('open-carrinho');
    }
    
    verificarCarrinho();
});

// Fechar o carrinho ao clicar no botão
fecharCarrinho?.addEventListener('click', function () {
    contentCarrinho.classList.add('hidden'); // Adiciona 'hidden' novamente
    contentCarrinho.classList.remove('show');
    document.body.classList.remove('open-carrinho');
});

document.addEventListener('DOMContentLoaded', atualizarCarrinho);

function verificarCarrinho() {
    const carrinhoFull = document.getElementById('carrinhoFull');
    const carrinhoEmpty = document.getElementById('carrinhoEmpty');

    if (listItensPedidos.length === 0) {
        carrinhoFull.style.display = 'none';
        carrinhoEmpty.style.display = 'block';
    } else {
        carrinhoFull.style.display = 'block';
        carrinhoEmpty.style.display = 'none';
    }

    atualizarCarrinho();
}


function atualizarCarrinho() {
    const tableBody = document.getElementById('itensTableCarrinho');
    tableBody.innerHTML = '';

    listItensPedidos.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center;">${item.NomeItem}</td>
            <td style="text-align: center;">${item.QuantidadePedida}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Mostrar o formulário de solicitação
solicitarButton?.addEventListener('click', function () {
    if (formSolicitar.style.display === 'none' || formSolicitar.style.display === '') {
        styleForms('none', 'block', 'none', 'none');
        document.getElementById('userInfo').classList.add('hidden');
    } else {
        formSolicitar.style.display = 'none';
    }
});

function showMessageSolic(message, className) {
    messageSolic.innerText = message;
    messageSolic.className = className;
    messageSolic.style.display = 'block';
}

document.getElementById('formSolicitar').addEventListener('submit', async function (event) {
    event.preventDefault();
    const NomeItem = document.getElementById('NomeItem').value;
    const QuantidadePedida = parseInt(document.getElementById('QuantidadePedida').value, 10);

    const request = JSON.stringify({
        NomeItem,
        QuantidadePedida
    })

    // Verifica se o item existe e a quantidade
    if (inProducao === "S") {
        responseGetItem = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/PedidosModels/nome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: request
        })
    } else {
        responseGetItem = await fetch(`https://localhost:5201/api/PedidosModels/nome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: request
        })
    }

    console.log("Request JSON:", request);

    try {
        if (!responseGetItem.ok) {
            const errorText = await responseGetItem.text();
            console.error("Erro no pedido:", errorText);
            showMessageSolic(errorText, 'error');
            return;
        } 
        
        const pedidoRequest = JSON.stringify({
            Pedido: {
                NomeUser: userNameLogin,
                CpfUser: userCpfLogin,
                Evento: document.getElementById('Evento').value,
                DataEvento: document.getElementById('DataEvento').value
            }
        })

        const Evento = document.getElementById('Evento').value;
        const DataEvento = document.getElementById('DataEvento').value;

        console.log(userNameLogin);
        console.log(userCpfLogin);
        console.log(Evento);
        console.log(DataEvento);

        // Adiciona o item ao carrinho e salva no LocalStorage
        listItensPedidos.push({ NomeItem, QuantidadePedida });
        localStorage.setItem('carrinho', JSON.stringify(listItensPedidos));

        console.log("Lista de itens no carrinho:", listItensPedidos);

        atualizarCarrinho();
        verificarCarrinho();

        showMessageSolic('Item adicionado ao carrinho!', 'success');
    } catch (error) {
        console.error("Erro ao enviar o pedido:", error);
        showMessageSolic('Erro inesperado ao realizar o pedido', 'error');
    }
})

document.addEventListener('DOMContentLoaded', () => {
    verificarCarrinho();
});