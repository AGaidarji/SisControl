// Formulários
const formUsuarios = document.getElementById('formUsuarios');

// Campos de alteração
const alterarCongregacao = document.getElementById('alterarCongregacao');
const alterarFuncao = document.getElementById('Functions');

// Botões
const buttonUserAgree = document.getElementById('buttonUserAgree');
const buttonUserDegree = document.getElementById('buttonUserDegree');
const usuariosButton = document.getElementById('usuarios');
const closeUserInfoBt = document.getElementById('closeUserInfo');
const buttonEditUserInfo = document.getElementById('buttonEditUserInfo');

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

// Função para fechar campo de dados do usuário
document.addEventListener('DOMContentLoaded', () => {
    closeUserInfoBt.addEventListener('click', function () {
        document.getElementById('userInfo').classList.add('hidden');
        messageBtUser.style.display = 'none';
        showCamposAlterarAndButtons('none');
    })
})

// Função para exibir botões
function showCamposAlterarAndButtons (display) {
    alterarCongregacao.style.display = display;
    alterarFuncao.style.display = display;
    buttonUserAgree.style.display = display;
    buttonUserDegree.style.display = display;
}

if (userFunction === 'Admin') {
    usuariosButton.style.display = 'inline';
    buttonEditUserInfo.style.display = 'inline'

    usuariosButton.addEventListener('click', function () {
        if (formUsuarios.style.display === 'none' || formUsuarios.style.display === '') {
            styleForms('none', 'none', 'none', 'block');

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
                    document.getElementById('userCongregacao').textContent = data.congregacao;
                    document.getElementById('userFuncao').textContent = data.userFunction;

                    messageUser.style.display = 'none';
                    document.getElementById('userInfo').classList.remove('hidden');
                } else {
                    showMessageUser('Usuário não encontrado.', 'error')
                    return;
                }
            })

        } else {
            formUsuarios.style.display = 'none';
            document.getElementById('userInfo').classList.add('hidden');
        }
    })

    buttonEditUserInfo.addEventListener('click', async function() {
        showMessageBtUser("Confirma a alteração?", 'alert')
        showCamposAlterarAndButtons('inline');

        buttonUserAgree.addEventListener('click', async function(){
            let novaCongregacao = document.getElementById('alterarCongregacao').value;
            let novaFuncao = document.getElementById('Functions').value;
            let responsePutUser;

            if(novaCongregacao === "" && novaFuncao === "") {
                showMessageBtUser("Preencha pelo menos um dos campos", 'alert')
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
                    showMessageBtUser('Dados do usuário alterado com sucesso!', 'success');
                } else {
                    showMessageBtUser('Erro ao alterar dados do usuário.', 'error');
                }
            } catch (error) {
                showMessageBtUser('Erro ao alterar dados do usuário.', 'error');
                console.error('Erro ao alterar item:', error);
            } finally {
                buttonUserAgree.disabled = false;
                setTimeout(hideMessageAndButtons, 2000);
            }
        })
    })
}
