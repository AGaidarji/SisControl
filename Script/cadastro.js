document.getElementById('userCadastro').addEventListener('submit', async function (event) {
    event.defaultPrevented();

    const nome = document.getElementById('name');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const congregacao = document.getElementById('congregacao');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('passwordRepeat');

    const checkEmailResponse = await fetch(`https://localhost:7065/api/UserCadastro/email/${email}`, {
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
    const response = await fetch('https://localhost:7065/api/UserCadastro', {
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
            window.location.href = './Html/mainPage.html';
        }, 2000);
    } else {
        messageDiv.innerText = 'Erro ao adicionar usuário.';
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
    }
})