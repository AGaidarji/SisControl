const userFunction = localStorage.getItem('userFunction');
const userFunctionLogin = localStorage.getItem('userFunctionLogin');
const userNameLogin = localStorage.getItem('userNameLogin');
const inProducao = localStorage.getItem('inProducao');

<<<<<<< HEAD
const formCadastro = document.getElementById('formCadastrar');
const formSolicitar = document.getElementById('formSolicitar');
const formPesquisar = document.getElementById('formPesquisar');
const formUsuarios = document.getElementById('formUsuarios');

soliticarButton.addEventListener('click', function() {
    if (formSolicitar.style.display === 'none' || formSolicitar.style.display === '') {
        formSolicitar.style.display = 'block';
        formCadastro.style.display = 'none';
        formPesquisar.style.display = 'none';
        formUsuarios.style.display = 'none';
        document.getElementById('userInfo').classList.add('hidden');
        document.getElementById('itemInfo').classList.add('hidden');
    } else {
        formSolicitar.style.display = 'none';
    }
})

pesquisarButton.addEventListener('click', function() {
    if (formPesquisar.style.display === 'none' || formPesquisar.style.display === '') {
        formPesquisar.style.display = 'block';
        formCadastro.style.display = 'none';
        formSolicitar.style.display = 'none';
        formUsuarios.style.display = 'none';
        document.getElementById('userInfo').classList.add('hidden');

        document.getElementById('formPesquisar').addEventListener('submit', async function (event) {
            event.preventDefault();

            const nomeItem = document.getElementById('NomeItemP').value;
            const idItem = document.getElementById('Codigo').value;
            let responseGetItem = '';

            if (nomeItem != null && nomeItem != '') {
                responseGetItem = await fetch(`https://localhost:5201/api/ItemCadastro/nome/${encodeURIComponent(nomeItem)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else if (idItem != null && idItem != '') {
                responseGetItem = await fetch(`https://localhost:5201/api/ItemCadastro/${encodeURIComponent(idItem)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                console.log("Error: Nome ou Código do item precisa ser preenchido");
                return;
            }
            
            if (responseGetItem.ok) {
                const dadosItem = await responseGetItem.json();
                console.log(dadosItem);
                
                document.getElementById('itemId').textContent = dadosItem.idItem;
                document.getElementById('itemNome').textContent = dadosItem.nomeItem;
                document.getElementById('itemQuantidade').textContent = dadosItem.quantidade;
                document.getElementById('itemDescricao').textContent = dadosItem.descricao;

                if (dadosItem.imagemItem) {
                    document.getElementById('itemFoto').src = `data:image/jpeg;base64,${dadosItem.imagemItem}`;
                } else {
                    document.getElementById('itemFoto').alt = "Imagem não disponível";
                }

                document.getElementById('itemInfo').classList.remove('hidden');
            } else {
                console.error;
            }
        });
    } else {
        formPesquisar.style.display = 'none';
        document.getElementById('itemInfo').classList.add('hidden');
    }
})

// ----------------- FUNÇÕES DE ADMIN --------------

const userFunction = localStorage.getItem('userFunction');

if (userFunction === 'Admin') {
    cadastrarButton.style.display = 'inline';
    usuariosButton.style.display = 'inline';

    cadastrarButton.addEventListener('click', function() {
        if (formCadastro.style.display === 'none' || formCadastro.style.display === '') {
            formCadastro.style.display = 'block';
            formSolicitar.style.display = 'none';
            formPesquisar.style.display = 'none';
            formUsuarios.style.display = 'none';
            document.getElementById('userInfo').classList.add('hidden');
            document.getElementById('itemInfo').classList.add('hidden');

            document.getElementById('formCadastrar').addEventListener('submit', async function (event) {
                event.preventDefault();
            
                const formData = new FormData();
                formData.append('nome', document.getElementById('NomeItemC').value);
                formData.append('quantidade', document.getElementById('Quantidade').value);
                formData.append('descricao', document.getElementById('Descricao').value);
                formData.append('imagem', document.getElementById('ImagemItem').files[0]);
            
                const responseItem = await fetch('https://localhost:5201/api/ItemCadastro/upload', { 
                    method: 'POST',
                    body: formData
                });
        
                try {
                    if (!responseItem.ok) {
                        const errorText = await responseItem.json();
                        console.error("Erro na resposta:", errorText);
                        messageDiv.innerText = 'Falha ao cadastrar item.';
                        messageDiv.className = 'error';
                        messageDiv.style.display = 'block';
                        return;
                    } else {
                        console.log("Arquivo enviado com sucesso!");
                        messageDiv.innerText = 'Item cadastrado com sucesso.';
                        messageDiv.className = 'success';
                        messageDiv.style.display = 'block';
                        document.getElementById('formCadastrar').reset();
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                }
        
                /*const response = await fetch('https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/upload',{
                    method: 'POST',
                    body: formData
                });*/
        
                const result = await responseItem.json();
                console.log(result.message);
            })

        } else {
            formCadastro.style.display = 'none';
        }
    })

    usuariosButton.addEventListener('click', function() {
        if (formUsuarios.style.display === 'none' || formUsuarios.style.display === '') {
            formUsuarios.style.display = 'block';
            formPesquisar.style.display = 'none';
            formCadastro.style.display = 'none';
            formSolicitar.style.display = 'none';
            document.getElementById('itemInfo').classList.add('hidden');

            document.getElementById('formUsuarios').addEventListener('submit', async function (event) {
                event.preventDefault();
                
                const cpf = document.getElementById('cpf').value;

                const responseGetUser = await fetch(`https://localhost:5201/api/UserCadastro/searchUser/${encodeURIComponent(cpf)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (responseGetUser.ok) {
                    const data = await responseGetUser.json();
                    console.log(data);
                    
                    document.getElementById('userNome').textContent = data.nome;
                    document.getElementById('userEmail').textContent = data.email;
                    document.getElementById('userCongregacao').textContent = data.congregacao;
                    document.getElementById('userFuncao').textContent = data.userFunction;

                    document.getElementById('userInfo').classList.remove('hidden');
                } else {
                    console.error;
                }
            })

        } else {
            formUsuarios.style.display = 'none';
            document.getElementById('userInfo').classList.add('hidden');
        }
    })
}
=======
const firstName = userNameLogin.split(' ');
document.getElementById('userNameLogin').textContent = firstName[0];
document.getElementById('userFunctionLogin').textContent = userFunctionLogin;
>>>>>>> 660e1e6b4015997ce28bf169824cbeccab6a8cb9
