const usuariosButton = document.getElementById('usuarios');
const formUsuarios = document.getElementById('formUsuarios');

function styleForms(styleFormCads, styleFormSolic, styleFormPesq, styleFormUser) {
    formCadastro.style.display = styleFormCads;
    formSolicitar.style.display = styleFormSolic;
    formPesquisar.style.display = styleFormPesq;
    formUsuarios.style.display = styleFormUser;
};

// Função para exibir mensagens
function showMessage(message, className) {
    messageUser.innerText = message;
    messageUser.className = className;
    messageUser.style.display = 'block';
}

if (userFunction === 'Admin') {
    usuariosButton.style.display = 'inline';

    usuariosButton.addEventListener('click', function () {
        if (formUsuarios.style.display === 'none' || formUsuarios.style.display === '') {
            styleForms('none', 'none', 'none', 'block');

            document.getElementById('formUsuarios').addEventListener('submit', async function (event) {
                event.preventDefault();

                const cpf = document.getElementById('cpf').value;

                const response = await fetch(`https://localhost:5201/api/UserCadastro/searchUser/${encodeURIComponent(cpf)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    document.getElementById('userNome').textContent = data.nome;
                    document.getElementById('userEmail').textContent = data.email;
                    document.getElementById('userCongregacao').textContent = data.congregacao;
                    document.getElementById('userFuncao').textContent = data.userFunction;

                    messageUser.style.display = 'none';
                    document.getElementById('userInfo').classList.remove('hidden');
                } else {
                    showMessage('Usuário não encontrado.', 'error')
                    return;
                }
            })

        } else {
            formUsuarios.style.display = 'none';
            document.getElementById('userInfo').classList.add('hidden');
        }
    })
}
