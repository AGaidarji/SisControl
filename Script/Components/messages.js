function showMessageBtUser(message, className) {
    messageBtUser.innerText = message;
    messageBtUser.className = className;
    messageBtUser.style.display = 'block';
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

function showMessageBtItens(message, className) {
    messageBtItens.innerText = message;
    messageBtItens.className = className;
    messageBtItens.style.display = 'block';
};

function showMessageCarrinho(message, className) {
    messageCarrinho.innerText = message;
    messageCarrinho.className = className;
    messageCarrinho.style.display = 'block';
};

function hideMessageAndButtons() {
    messageBtUser.style.display = 'none';
    buttonUserAgree.style.display = 'none';
    buttonUserDegree.style.display = 'none';
    alterarCongregacao.style.display = 'none';
    alterarFuncao.style.display = 'none';
}