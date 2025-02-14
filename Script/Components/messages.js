function showUserInfoMsg(message, className) {
    userInfoMsg.innerText = message;
    userInfoMsg.className = className;
    userInfoMsg.style.display = 'block';
}

function showMessageUser(message, className) {
    messageUser.innerText = message;
    messageUser.className = className;
    messageUser.style.display = 'block';
}

function showMessageSolic(message, className) {
    messageSolic.innerText = message;
    messageSolic.className = className;
    messageSolic.style.display = 'block';
}

function showMessage(message, className) {
    messageDiv.innerText = message;
    messageDiv.className = className;
    messageDiv.style.display = 'block';
}

function showMessageCads(message, className) {
    messageCads.innerText = message;
    messageCads.className = className;
    messageCads.style.display = 'block';
}

function showMessagePesq(message, className) {
    messagePesq.innerText = message;
    messagePesq.className = className;
    messagePesq.style.display = 'block';
}

function showItemPesquisadoMsg(message, className) {
    itemPesquisadoMsg.innerText = message;
    itemPesquisadoMsg.className = className;
    itemPesquisadoMsg.style.display = 'block';
};

function showCarrinhoMsg(message, className) {
    carrinhoMsg.innerText = message;
    carrinhoMsg.className = className;
    carrinhoMsg.style.display = 'block';
};

function showFinalizarPedidoMsg(message, className) {
    finalizarPedidoMsg.innerText = message;
    finalizarPedidoMsg.className = className;
    finalizarPedidoMsg.style.display = 'block';
};

function hideMessageAndButtons() {
    userInfoMsg.style.display = 'none';
    userInfoBtnAgree.style.display = 'none';
    userInfoBtnDegree.style.display = 'none';
    userInfoNewCongregacao.style.display = 'none';
    userInfoNewFunction.style.display = 'none';
}