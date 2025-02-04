// ------------- Botões - MainPage ------------
buttonListItens.addEventListener('click', function () {
    const itemResumeContainer = document.getElementById('itemResumeContainer');
    if (itemResumeContainer.style.display === 'flex') {
        itemResumeContainer.style.display = 'none';
    } else {
        itemResumeContainer.style.display = 'flex';
    }
})

closeItensResume.addEventListener('click', function () {
        document.getElementById('itemResumeContainer').style.display = 'none';
    })

// ------------- Botões - Carrinho ------------
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
});

fecharCarrinho?.addEventListener('click', function () {
    contentCarrinho.classList.add('hidden'); // Adiciona 'hidden' novamente
    contentCarrinho.classList.remove('show');
    document.body.classList.remove('open-carrinho');
});


// ------------- Botões - Itens ------------
pesquisarButton.addEventListener('click', function () {
    if (formPesquisar.style.display === 'none' || formPesquisar.style.display === '') {
        formPesquisar.style.display = 'block';
        formCadastro.style.display = 'none';
        formSolicitar.style.display = 'none';
        formUsuarios.style.display = 'none';
        document.getElementById('userInfo').classList.add('hidden');
    } else {
        formPesquisar.style.display = 'none';
    }
})


// ------------- Botões - Pedidos ------------
solicitarButton?.addEventListener('click', function () {
    if (formSolicitar.style.display === 'none' || formSolicitar.style.display === '') {
        styleForms('none', 'block', 'none', 'none');
        document.getElementById('userInfo').classList.add('hidden');
    } else {
        formSolicitar.style.display = 'none';
    }
});

finalizarPedidoButton.addEventListener('click', function () {
    if (listItensPedidos.length === 0) {
        showMessageCarrinho('Seu carrinho está vazio', 'alert');
    } else {
        pedidoResume.style.display = 'flex';
        showMessageCarrinho('', 'none');
        montarResumoCarrinho();

        contentCarrinho.classList.add('hidden'); // Adiciona 'hidden' novamente
        contentCarrinho.classList.remove('show');
        document.body.classList.remove('open-carrinho');
    }
});

pedidoResumeClose?.addEventListener('click', function () {
    pedidoResume.style.display = 'none';
});