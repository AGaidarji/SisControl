// ------------- Botões - MainPage ------------
buttonListItens.addEventListener('click', function () {
    const resumeEstoque = document.getElementById('resumeEstoque');
    if (resumeEstoque.style.display === 'flex') {
        resumeEstoque.style.display = 'none';
    } else {
        resumeEstoque.style.display = 'flex';
    }
})

resumeEstoqueBtnClose.addEventListener('click', function () {
        document.getElementById('resumeEstoque').style.display = 'none';
    })

itemPesquisadoBtnClose.addEventListener('click', function () {
    document.getElementById('itemPesquisado').style.display = 'none';
    document.getElementById('itemPesquisadoInfo').classList.add('hidden');
})

// ------------- Botões - Carrinho ------------
buttonCarrinho?.addEventListener('click', function () {
    if (carrinho.classList.contains('show')) {
        carrinho.classList.remove('show');
        carrinho.classList.add('hidden');
        document.body.classList.remove('open-carrinho');
    } else {
        carrinho.classList.remove('hidden');
        carrinho.classList.add('show');
        document.body.classList.add('open-carrinho');
    }
});

carrinhoBtnClose?.addEventListener('click', function () {
    carrinho.classList.add('hidden'); // Adiciona 'hidden' novamente
    carrinho.classList.remove('show');
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

carrinhoBtnFinalizar.addEventListener('click', function () {
    if (listItensPedidos.length === 0) {
        showCarrinhoMsg('Adicione seus itens no carrinho', 'alert');
    } else {
        finalizarPedido.style.display = 'flex';
        showCarrinhoMsg('', 'none');
        montarResumoCarrinho();

        formPesquisar.style.display = 'none';
        formCadastro.style.display = 'none';
        formSolicitar.style.display = 'none';
        formUsuarios.style.display = 'none';
        document.getElementById('userInfo').classList.add('hidden');
        document.getElementById('resumeEstoque').style.display = 'none';
    }
});

finalizarPedidoBtnClose?.addEventListener('click', function () {
    finalizarPedido.style.display = 'none';
});

// ------------- Botões - Users ------------
usuariosButton.addEventListener('click', function () {
    if (formUsuarios.style.display === 'none' || formUsuarios.style.display === '') {
        styleForms('none', 'none', 'none', 'block');
    } else {
        formUsuarios.style.display = 'none';
        document.getElementById('userInfo').classList.add('hidden');
    }
})

userInfoBtnEdit.addEventListener('click', async function() {
    showUserInfoMsg("Confirma a alteração?", 'alert')
    showCamposAlterarAndButtons('inline');
})

userInfoBtnDegree.addEventListener('click', async function() {
    hideMessageAndButtons();
})

userInfoBtnClose.addEventListener('click', function () {
    document.getElementById('userInfo').classList.add('hidden');
    userInfoMsg.style.display = 'none';
    showCamposAlterarAndButtons('none');
})


// ------------- Botões - meusPedidos ------------
meusPedidosBtnClose.addEventListener('click', function () {
    meusPedidosContainer.style.display = 'none';
})