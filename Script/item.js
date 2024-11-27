const cadastrarButton = document.getElementById('cadastrarItem');
const pesquisarButton = document.getElementById('pesquisarItem');
const closeContainerDireita = document.getElementById('closeContainerDireita');

const formCadastro = document.getElementById('formCadastrar');
const formPesquisar = document.getElementById('formPesquisar');

document.addEventListener('DOMContentLoaded', () => {
    closeContainerDireita.addEventListener('click', function () {
        document.getElementById('conteudoLateral').style.display = 'none';
        document.getElementById('itemInfo').classList.add('hidden');
    })
})

// Função para ocultar mensagem e botões de confirmação
function hideMessageAndButtons() {
    messageBtItens.style.display = 'none';
    buttonItemAgree.style.display = 'none';
    buttonItemDegree.style.display = 'none';
    alterarQuantidade.style.display = 'none';
    alterarDecricao.style.display = 'none';
}

// ================= Campo de Cadastro de item =================

if (userFunction === 'Admin') {
    cadastrarButton.style.display = 'inline';

    cadastrarButton.addEventListener('click', function () {
        if (formCadastro.style.display === 'none' || formCadastro.style.display === '') {
            styleForms('block', 'none', 'none', 'none');
            document.getElementById('userInfo').classList.add('hidden');

            function showMessageCads(message, className) {
                messageCads.innerText = message;
                messageCads.className = className;
                messageCads.style.display = 'block';
            }

            document.getElementById('formCadastrar').addEventListener('submit', async function (event) {
                event.preventDefault();

                const formData = new FormData();
                formData.append('nome', document.getElementById('NomeItemC').value);
                formData.append('quantidade', document.getElementById('Quantidade').value);
                formData.append('descricao', document.getElementById('Descricao').value);
                formData.append('imagem', document.getElementById('ImagemItem').files[0]);

                if (inProducao === "S") {
                    responseItem = await fetch('https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/upload',{
                        method: 'POST',
                        body: formData
                    });
                } else {
                    responseItem = await fetch('https://localhost:5201/api/ItemCadastro/upload', {
                        method: 'POST',
                        body: formData
                    });
                }
                
                try {
                    if (!responseItem.ok) {
                        const errorText = await responseItem.text();
                        console.error("Erro na resposta:", errorText);
                        showMessageCads('Não foi possível cadastrar o item.', 'error');
                    } else {
                        showMessageCads('Arquivo enviado com sucesso!', 'success');
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    showMessageCads('Erro na requisição.', 'error');
                }

                const result = await responseItem.json();
                console.log(result.message);
            })
        } else {
            formCadastro.style.display = 'none';
        }
    })
}


// ================= Campo de Pesquisa de item =================

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

document.getElementById('formPesquisar').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nomeItem = document.getElementById('NomeItemP').value;
    const idItem = document.getElementById('Codigo').value;
    let responseGetItem = '';

    // Funções para mostrar mensagens
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

    try {
        if (nomeItem != null && nomeItem != '') {
            if (inProducao === "S") {
                responseGetItem = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/nome/${encodeURIComponent(nomeItem)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                responseGetItem = await fetch(`https://localhost:5201/api/ItemCadastro/nome/${encodeURIComponent(nomeItem)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            if (responseGetItem.status === 404) {
                showMessagePesq('Item não encontrado.', 'error')
            }

        } else if (idItem != null && idItem != '') {
            if (inProducao === "S") {
                responseGetItem = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/${encodeURIComponent(idItem)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                responseGetItem = await fetch(`https://localhost:5201/api/ItemCadastro/${encodeURIComponent(idItem)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            if (responseGetItem.status === 404) {
                showMessagePesq('Item não encontrado.', 'error')
            }

        } else {
            console.log("Error: Nome ou Código do item precisa ser preenchido");
            return;
        }

        if (responseGetItem.ok) {
            messagePesq.style.display = 'none';
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

            document.getElementById('buttonAddItem').style.display = 'inline';

            if (userFunction === 'Admin') {
                const buttonAlterItem = document.getElementById('buttonAlterItem');
                const buttonDelItem = document.getElementById('buttonDelItem');
                const buttonItemAgree = document.getElementById('buttonItemAgree');
                const buttonItemDegree = document.getElementById('buttonItemDegree');
                const alterarQuantidade = document.getElementById('alterarQuantidade');
                const alterarDecricao = document.getElementById('alterarDecricao');

                // Mostrar botões para Admin
                buttonAlterItem.style.display = 'inline';
                buttonDelItem.style.display = 'inline';

                // ================ Evento para deletar item ======================
                buttonDelItem.addEventListener('click', () => {
                    showMessageBtItens("Essa ação é irreversível. Deseja excluir o item?", 'alert');
                    buttonItemAgree.style.display = 'inline';
                    buttonItemDegree.style.display = 'inline';

                    // Confirmar exclusão
                    buttonItemAgree.addEventListener('click', async () => {
                        try {
                            if (inProducao === "S") {
                                responseGetItem = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/${encodeURIComponent(dadosItem.idItem)}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                            } else {
                                response = await fetch(`https://localhost:5201/api/ItemCadastro/${encodeURIComponent(dadosItem.idItem)}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                            }

                            if (response.ok) {
                                showMessageBtItens('Item excluído com sucesso!', 'success');
                            } else {
                                showMessageBtItens('Erro ao excluir o item.', 'error');
                            }
                        } catch (error) {
                            showMessageBtItens('Erro ao excluir o item.', 'error');
                            console.error('Erro ao deletar item:', error);
                        } finally {
                            setTimeout(hideMessageAndButtons, 2000); // Oculta após 2 segundos
                        }
                    });

                    // Cancelar exclusão
                    buttonItemDegree.addEventListener('click', hideMessageAndButtons);
                });


                // ==================== Evento para Alterar dados de um item ===============

                buttonAlterItem.addEventListener('click', () => {
                    showMessageBtItens("Informe o que deseja alterar e depois confirme a alteração", 'default');
                    buttonItemAgree.style.display = 'inline';
                    buttonItemDegree.style.display = 'inline';
                    alterarQuantidade.style.display = 'inline';
                    alterarDecricao.style.display = 'inline';

                    let qtAlteracao =  document.getElementById('alterarQuantidade').value;
                    let dsAlteracao = document.getElementById('alterarDecricao').value;

                    const itemAtualizado = {
                        IdItem: dadosItem.idItem,
                        Quantidade: qtAlteracao,
                        Descricao: dsAlteracao
                    };
                    // Confirmar Alteração
                    buttonItemAgree.addEventListener('click', async () => {
                        buttonItemAgree.disabled = true;

                        try {
                            if (inProducao === "S") {
                                responseGetItem = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/${encodeURIComponent(dadosItem.idItem)}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                            } else {
                                response = await fetch(`https://localhost:5201/api/ItemCadastro/${encodeURIComponent(dadosItem.idItem)}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                            }

                            if (response.status == 204) {
                                showMessageBtItens('Dados do item alterado com sucesso!', 'success');
                            } else {
                                showMessageBtItens('Erro ao alterar dados o item.', 'error');
                            }
                        } catch (error) {
                            showMessageBtItens('Erro ao alterar dados do item.', 'error');
                            console.error('Erro ao alterar item:', error);
                        } finally {
                            buttonItemAgree.disabled = false;
                            setTimeout(hideMessageAndButtons, 2000);
                        }
                    });

                    // Cancelar Alteração
                    buttonItemDegree.addEventListener('click', hideMessageAndButtons);
                });
            }
            // Exibe o conteúdo lateral
            document.getElementById('conteudoLateral').style.display = 'block';
            document.getElementById('itemInfo').classList.remove('hidden');
        }
    }
    catch (error) {
        // Caso item não seja encontrado
        showMessagePesq('Erro ao pesquisar item.', 'error')
    }
})