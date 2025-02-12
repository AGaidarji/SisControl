const meusPedidos = document.getElementById("meusPedidos");
const meusPedidosContainer = document.getElementById("meusPedidosContainer");
const meusPedidosBtnClose = document.getElementById('meusPedidosBtnClose');

var elem = document.getElementById('meusPedidosContainer');

meusPedidos.addEventListener('click', function () {
    if (formPesquisar.style.display === 'none' || formPesquisar.style.display === '') {
        meusPedidosContainer.style.display = 'block';
        formPesquisar.style.display = 'none';
        formCadastro.style.display = 'none';
        formSolicitar.style.display = 'none';
        formUsuarios.style.display = 'none';
        document.getElementById('userInfo').classList.add('hidden');
        document.getElementById('itemResumeContainer').style.display = 'none';

        CreateMeusPedidosResume();
    } else {
        formPesquisar.style.display = 'none';
    }
})

async function CreateMeusPedidosResume() {
    try{
        if (inProducao === "S") {
            responsePedidoRequest = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/PedidosModels/MeusPedidos/${encodeURIComponent(userCpfLogin)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            responsePedidoRequest = await fetch(`https://localhost:5201/api/PedidosModels/MeusPedidos/${encodeURIComponent(userCpfLogin)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        }

        const pedidosRequest = await responsePedidoRequest.json();
        const tableBody = document.getElementById('meusPedidosTable');
        tableBody.innerHTML = '';

        pedidosRequest.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="text-align: center;">${item.idPedido}</td>
                <td style="text-align: center;">${item.evento}</td>
                <td style="text-align: center;">${new Date(item.dataEvento).toLocaleDateString()}</td>
                <td style="text-align: center;">${item.statusPedido}</td>
            `;

            // Coluna: Botão Detalhes
            const tdBtn = document.createElement('td');
            tdBtn.style.textAlign = 'center';
            const btnDetalhes = document.createElement('button');
            btnDetalhes.className = "btn-table-detalhes"
            btnDetalhes.textContent = "Detalhes";
            btnDetalhes.addEventListener('click', function() {
                const itemSelecionado = pedidosRequest.indexOf(item);
                VerDetalhesPedido(pedidosRequest, itemSelecionado, row);
            });
            tdBtn.appendChild(btnDetalhes);
            row.appendChild(tdBtn);

            tableBody.appendChild(row);
        })
    }
    catch (error) {
        console.error("Erro ao pesquisar itens:", error);
        return null;
    }
}

async function VerDetalhesPedido(pedidosRequest, itemSelecionado, rowReferencia) {
    try {
        console.log("Item Selecionado:", itemSelecionado);
        console.log("ID do Pedido:", pedidosRequest[itemSelecionado].idPedido);

        const idPedidoUrl = pedidosRequest[itemSelecionado].idPedido;
        const existingRow = document.getElementById(`detalhes-${idPedidoUrl}`);

        // Se a linha de detalhes já existe, removê-la e sair da função
        if (existingRow) {
            existingRow.remove();
            return;
        }

        let responsePedidoRequest;
        if (inProducao === "S") {
            responsePedidoRequest = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/PedidosModels/MeusPedidos/Itens/${encodeURIComponent(idPedidoUrl)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            responsePedidoRequest = await fetch(`https://localhost:5201/api/PedidosModels/MeusPedidos/Itens/${encodeURIComponent(idPedidoUrl)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const itensPedido = await responsePedidoRequest.json();
        console.log("Itens do Pedido:", itensPedido);

        // Criar uma nova linha para exibir os detalhes do pedido
        const rowDetalhes = document.createElement('tr');
        rowDetalhes.id = `detalhes-${idPedidoUrl}`;
        rowDetalhes.innerHTML = `
            <td colspan="5">
                <table border="1" width="100%">
                    <thead>
                        <tr>
                            <th style="text-align: center;">Id Item</th>
                            <th style="text-align: center;">Nome</th>
                            <th style="text-align: center;">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody id="itensPedido-${idPedidoUrl}">
                    </tbody>
                </table>
            </td>
        `;

        // Inserir a nova linha abaixo da linha original
        rowReferencia.parentNode.insertBefore(rowDetalhes, rowReferencia.nextSibling);

        // Preencher a tabela com os itens do pedido
        const tableItens = document.getElementById(`itensPedido-${idPedidoUrl}`);
        itensPedido.forEach(item => {
            const itemRow = document.createElement('tr');
            itemRow.innerHTML = `
                <td style="text-align: center;">${item.idItem}</td>
                <td style="text-align: center;">${item.nomeItem}</td>
                <td style="text-align: center;">${item.quantidade}</td>
            `;
            tableItens.appendChild(itemRow);
        });

    } catch (error) {
        console.error("Erro ao buscar detalhes do pedido:", error);
    }
}

