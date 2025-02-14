// Formulários
const formUsuarios = document.getElementById('formUsuarios');

// Campos de alteração
const userInfoNewCongregacao = document.getElementById('userInfoNewCongregacao');
const userInfoNewFunction = document.getElementById('userInfoNewFunction');

// Botões
const userInfoBtnAgree = document.getElementById('userInfoBtnAgree');
const userInfoBtnDegree = document.getElementById('userInfoBtnDegree');
const usuariosButton = document.getElementById('usuarios');
const userInfoBtnClose = document.getElementById('userInfoBtnClose');
const userInfoBtnEdit = document.getElementById('userInfoBtnEdit');

// Variáveis iniciadas
let userCongregacao;
let userFunctionLocal = userFunction;
let cpfUser;

function styleForms(styleFormCads, styleFormSolic, styleFormPesq, styleFormUser) {
    formCadastro.style.display = styleFormCads;
    formSolicitar.style.display = styleFormSolic;
    formPesquisar.style.display = styleFormPesq;
    formUsuarios.style.display = styleFormUser;
};

// Função para exibir botões
function showCamposAlterarAndButtons (display) {
    userInfoNewCongregacao.style.display = display;
    userInfoNewFunction.style.display = display;
    userInfoBtnAgree.style.display = display;
    userInfoBtnDegree.style.display = display;
}

if (userFunction === 'Admin') {
    usuariosButton.style.display = 'inline';
    userInfoBtnEdit.style.display = 'inline';

    document.getElementById('formUsuarios').addEventListener('submit', async function (event) {
        event.preventDefault();

        const cpf = document.getElementById('cpf').value;
        cpfUser = cpf;
        let response = "";

        if (inProducao === 'S') {
            response = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/UserCadastro/searchUser/${encodeURIComponent(cpf)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            response = await fetch(`https://localhost:5201/api/UserCadastro/searchUser/${encodeURIComponent(cpf)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            userCongregacao = data.congregacao;

            document.getElementById('userNome').textContent = data.nome;
            document.getElementById('userEmail').textContent = data.email;
            document.getElementById('userTel').textContent = data.telefone;
            document.getElementById('userLastLogin').textContent = data.dateLogin;
            document.getElementById('userCongregacao').textContent = data.congregacao;
            document.getElementById('userFuncao').textContent = data.userFunction;

            messageUser.style.display = 'none';
            document.getElementById('userInfo').classList.remove('hidden');
        } else {
            showMessageUser('Usuário não encontrado.', 'error')
            return;
        }
    })
    
    userInfoBtnAgree.addEventListener('click', async function(){
        let novaCongregacao = document.getElementById('userInfoNewCongregacao').value;
        let novaFuncao = document.getElementById('userInfoNewFunction').value;
        let responsePutUser;

        if(novaCongregacao === "" && novaFuncao === "") {
            showUserInfoMsg("Preencha pelo menos um dos campos", 'alert')
            return;
        } else if (novaCongregacao === "") {
            novaCongregacao = userCongregacao
        } else if (novaFuncao === "") {
            novaFuncao = userFunctionLocal;
        } 

        const userUpdate = {
            CpfUser: cpfUser,
            NovaCongregacao: novaCongregacao,
            NovaFuncao: novaFuncao
        }

        try {
            console.log(userUpdate.CpfUser)
            console.log(userUpdate.NovaCongregacao)
            console.log(userUpdate.NovaFuncao)

            if (inProducao === "S") {
                responsePutUser = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/UserCadastro/${encodeURIComponent(userUpdate.CpfUser)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userUpdate)
                });
            } else {
                responsePutUser = await fetch(`https://localhost:5201/api/UserCadastro/${encodeURIComponent(userUpdate.CpfUser)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userUpdate)
                });
            }

            
            if (responsePutUser.status == 204) {
                showUserInfoMsg('Dados do usuário alterado com sucesso!', 'success');
            } else {
                showUserInfoMsg('Erro ao alterar dados do usuário.', 'error');
            }
        } catch (error) {
            showUserInfoMsg('Erro ao alterar dados do usuário.', 'error');
            console.error('Erro ao alterar item:', error);
        } finally {
            userInfoBtnAgree.disabled = false;
            setTimeout(hideMessageAndButtons, 2000);
        }
    })
}
