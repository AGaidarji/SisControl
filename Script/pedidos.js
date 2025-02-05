// Botoes
const solicitarButton = document.getElementById('solicitarItem');
const pedidosButton = document.getElementById('pedidosRecentes');
const buttonCarrinho = document.getElementById('buttonCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const finalizarPedidoButton = document.getElementById('finalizarPedido');
const pedidoResume = document.getElementById('pedidoResume');
const pedidoResumeClose = document.getElementById('pedidoResumeClose');

// Formulários
const formSolicitar = document.getElementById('formSolicitar');
const contentCarrinho = document.getElementById('contentCarrinho');

// Variáveis para inicializar
let responseGetItem;
const userNamePedido = localStorage.getItem('userNameLogin');
let Evento = JSON.parse(localStorage.getItem('pedidoEvento'));
let DataEvento = JSON.parse(localStorage.getItem('pedidoData'));
let DataFormatoISO = JSON.parse(localStorage.getItem('dataFormatoISO'));
let listItensPedidos = JSON.parse(localStorage.getItem('carrinho')) || [];

document.addEventListener('DOMContentLoaded', () => {
    verificarCarrinho();
    atualizarCarrinho();
});

// Exibir botão pedidos apenas para Admin
if (userFunction === 'Admin') {
    pedidosButton.style.display = 'inline';
}

// --------------- Functions --------------- 

function verificarCarrinho() {
    const carrinhoFull = document.getElementById('carrinhoFull');
    const carrinhoEmpty = document.getElementById('carrinhoEmpty');

    if (listItensPedidos.length === 0) {
        carrinhoFull.style.display = 'none';
        carrinhoEmpty.style.display = 'block';
    } else {
        carrinhoFull.style.display = 'block';
        carrinhoEmpty.style.display = 'none';
        showMessageCarrinho('', 'none');
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const tableBody = document.getElementById('itensTableCarrinho');
    tableBody.innerHTML = '';

    listItensPedidos.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center;">${item.NomePedidoRequest}</td>
            <td style="text-align: center;">${item.QuantPedidoRequest}</td>
        `;
        tableBody.appendChild(row);
    });
}

function montarResumoCarrinho() {
    document.getElementById('userNamePedido').textContent = userNamePedido;
    document.getElementById('nomeEvento').textContent = Evento;
    document.getElementById('dataEvento').textContent = DataEvento;

    const tableBody = document.getElementById('itensCarrinhoBody');
    tableBody.innerHTML = '';

    listItensPedidos.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center;">${item.IdPedidoRequest}</td>
            <td style="text-align: center;">${item.NomePedidoRequest}</td>
            <td style="text-align: center;">${item.QuantPedidoRequest}</td>
        `;

        // Coluna: Botão Alterar
        const tdAlterar = document.createElement('td');
        tdAlterar.style.textAlign = 'center';
        const btnSomar = document.createElement('button');
        const btnDiminuir = document.createElement('button');
        btnSomar.className = "btn-table-alterar";
        btnSomar.textContent = "+";
        btnDiminuir.className = "btn-table-alterar";
        btnDiminuir.textContent = "-";
        btnSomar.addEventListener('click', function() {
            const itemAlterar = listItensPedidos.indexOf(item);
            addItem(itemAlterar);
        });
        btnDiminuir.addEventListener('click', function() {
            const itemAlterar = listItensPedidos.indexOf(item);
            removeItem(itemAlterar);
        });
        tdAlterar.appendChild(btnDiminuir);
        tdAlterar.appendChild(btnSomar);
        row.appendChild(tdAlterar);

        // Coluna: Botão Delete
        const tdDelete = document.createElement('td');
        tdDelete.style.textAlign = 'center';
        const btnDelete = document.createElement('button');
        btnDelete.className = "btn-table-delete"
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', function() {
            const itemExcluir = listItensPedidos.indexOf(item);
            deletarItem(itemExcluir);
        });
        tdDelete.appendChild(btnDelete);
        row.appendChild(tdDelete);
        
        tableBody.appendChild(row);
    });
}

function deletarItem(itemExcluir) {
    listItensPedidos.splice(itemExcluir, 1);
    localStorage.setItem('carrinho', JSON.stringify(listItensPedidos));
    atualizarCarrinho();
    verificarCarrinho()
    montarResumoCarrinho();
}

function addItem(itemAlterar) {
    listItensPedidos[itemAlterar].QuantPedidoRequest += 1;
    localStorage.setItem('carrinho', JSON.stringify(listItensPedidos));
    atualizarCarrinho();
    verificarCarrinho()
    montarResumoCarrinho();
}

function removeItem(itemAlterar) {
    listItensPedidos[itemAlterar].QuantPedidoRequest -= 1;
    localStorage.setItem('carrinho', JSON.stringify(listItensPedidos));
    atualizarCarrinho();
    verificarCarrinho()
    montarResumoCarrinho();
}

// --------------- Métodos --------------- 

document.getElementById('formSolicitar').addEventListener('submit', async function (event) {
    event.preventDefault();
    Evento = document.getElementById('Evento').value;
    DataEvento = document.getElementById('DataEvento').value;
    const NomeItem = document.getElementById('NomeItem').value;
    const QuantidadePedida = parseInt(document.getElementById('QuantidadePedida').value, 10);

    const request = JSON.stringify({
        NomeItem: NomeItem,
        QuantidadePedida: QuantidadePedida
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
        const itensPedido = await responseGetItem.json();

        // Adiciona o item ao carrinho e salva no LocalStorage
        const IdPedidoRequest = itensPedido.idItem;
        const NomePedidoRequest = itensPedido.nomeItem
        const QuantPedidoRequest = itensPedido.quantidadePedida
        
        // Monta a lista e salva os dados no LocalStorage
        listItensPedidos.push({ IdPedidoRequest, NomePedidoRequest, QuantPedidoRequest });
        localStorage.setItem('carrinho', JSON.stringify(listItensPedidos));
        localStorage.setItem('pedidoEvento', JSON.stringify(Evento));
        
        // Salva a data no formato ISO yyyy-MM-dd
        DataFormatoISO = DataEvento;
        localStorage.setItem('dataFormatoISO', JSON.stringify(DataFormatoISO));

        // Transforma data para formato dd/MM/yyyy 
        let DataFormatada = DataEvento.split('-');
        DataEvento = `${DataFormatada[2]}/${DataFormatada[1]}/${DataFormatada[0]}`;
        localStorage.setItem('pedidoData', JSON.stringify(DataEvento));

        atualizarCarrinho();
        verificarCarrinho();
        montarResumoCarrinho();

        showMessageSolic('Item adicionado ao carrinho!', 'success');
    } catch (error) {
        console.error("Erro ao enviar o pedido:", error);
        showMessageSolic('Erro inesperado ao realizar o pedido', 'error');
    }
})

document.getElementById('btnConcluirPedido').addEventListener('click', async function (event) {
    event.preventDefault();

    const listaItens = listItensPedidos.map(item => ({
        IdItem: item.IdPedidoRequest,
        NomeItem: item.NomePedidoRequest,
        Quantidade: item.QuantPedidoRequest
    }));

    console.log(DataFormatoISO);

    const pedidoRequest = JSON.stringify({ 
        pedido: {
            NomeUser: userNameLogin,
            CpfUser: userCpfLogin,
            Evento: Evento,
            DataEvento: DataFormatoISO
        },
        itens: listaItens
    });

    if (inProducao === "S") {
        responsePostPedido = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/PedidosModels/CriarPedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: pedidoRequest
        })
    } else {
        responsePostPedido = await fetch(`https://localhost:5201/api/PedidosModels/CriarPedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: pedidoRequest
        })
    }

    try{
        if (!responsePostPedido.ok) {
            const errorText = await responsePostPedido.text();
            console.error("Erro no pedido:", errorText);
            showMessageConcluirPedido(errorText, 'error');
            return;
        } 

        console.log("Resetando lista...");
        listItensPedidos = [];
        console.log("Evento:", Evento);
        console.log("DataEvento:", DataEvento);

        console.log("Salvando no localStorage...");
        localStorage.setItem('carrinho', JSON.stringify(listItensPedidos));
        if (Evento !== undefined) localStorage.setItem('pedidoEvento', JSON.stringify(Evento));
        if (DataEvento !== undefined) localStorage.setItem('pedidoData', JSON.stringify(DataEvento));

        console.log("Chamando mensagens...");
        showMessageConcluirPedido('Pedido concluído com sucesso!', 'success');

    } catch (error) {
        console.error("Erro ao enviar o pedido:", error);
        showMessageConcluirPedido('Erro inesperado ao concluir o pedido', 'error');
    }
});

