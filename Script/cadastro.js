let checkEmailResponse = '';
let responseSaveUser = '';

// Função para exibir mensagens
function showMessage(message, className) {
    messageDiv.innerText = message;
    messageDiv.className = className;
    messageDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userCadastro').addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const congregacao = document.getElementById('congregacao').value;
        const passwordHash = document.getElementById('password').value;
        const passwordRepeat = document.getElementById('passwordRepeat').value;

        if (inProducao === 'S') {
            checkEmailResponse = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/UserCadastro/email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            checkEmailResponse = await fetch(`https://localhost:5201/api/UserCadastro/email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Verifica se o email já existe no banco de dados
        if (checkEmailResponse.ok) {
            const data = await checkEmailResponse.json();

            if (data.exists) {
                showMessage('O e-mail informado já está cadastrado.', 'error')
                return;
            }
        } else {
            showMessage('Erro ao verificar o e-mail.', 'error')
            return;
        }

        // Verifica se as senhas inseridas são iguais para validação
        if (passwordHash != passwordRepeat) {
            showMessage('As senhas inseridas precisas ser iguais.', 'error')
            return;
        }

        // Faz o POST no banco de dados
        if (inProducao === 'S') {
            responseSaveUser = await fetch('https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/UserCadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    telefone: telefone,
                    congregacao: congregacao,
                    passwordHash: passwordHash
                })
            })
        } else {
            responseSaveUser = await fetch('https://localhost:5201/api/UserCadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    telefone: telefone,
                    congregacao: congregacao,
                    passwordHash: passwordHash
                })
            });
        }

        if(responseSaveUser.ok) {
            showMessage('Usuário adicionado com sucesso!', 'success')

            //Levar para outra pagina após logado com sucesso
            setTimeout(() => {
                window.location.href = 'mainPage.html';
            }, 1000)
        } else {
            showMessage('Erro ao adicionar usuário.', 'error')
        }
    })
})