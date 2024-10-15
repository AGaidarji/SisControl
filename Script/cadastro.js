document.getElementById('userCadastro').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const congregacao = document.getElementById('congregacao').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('passwordRepeat').value;

    const checkEmailResponse = await fetch(`https://siscontrolsa.azurewebsites.net/api/UserCadastro/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Verifica se o email já existe no banco de dados
    if (checkEmailResponse.ok) {
        const data = await checkEmailResponse.json();

        if (data.exists) {
            messageDiv.innerText = 'O e-mail informado já está cadastrado.';
            messageDiv.className = 'error';
            messageDiv.style.display = 'block';
            return;
        }
    } else {
        messageDiv.innerText = 'Erro ao verificar o e-mail.';
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
        return;
    }

    // Verifica se as senhas inseridas são iguais para validação
    if (password != passwordRepeat) {
        messageDiv.innerText = 'As senhas inseridas precisas ser iguais.';
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
        return;
    }

    // Faz o POST no banco de dados
    const response = await fetch('https://siscontrolsa.azurewebsites.net/api/UserCadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            telefone: telefone,
            congregacao: congregacao,
            password: password
        })
    });

    if(response.ok) {
        messageDiv.innerText = 'Usuário adicionado com sucesso!';
        messageDiv.className = 'success';
        messageDiv.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'mainPage.html';
        }, 2000);
    } else {
        messageDiv.innerText = 'Erro ao adicionar usuário.';
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
    }
})