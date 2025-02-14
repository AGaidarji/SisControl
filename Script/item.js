// Botões
const cadastrarButton = document.getElementById('cadastrarItem');
const pesquisarButton = document.getElementById('pesquisarItem');
const itemPesquisadoBtnClose = document.getElementById('itemPesquisadoBtnClose');
const itemPesquisadoBtnAlter = document.getElementById('itemPesquisadoBtnAlter');
const itemPesquisadoBtnExcluir = document.getElementById('itemPesquisadoBtnExcluir');
const itemPesquisadoBtnAgree = document.getElementById('itemPesquisadoBtnAgree');
const itemPesquisadoBtnDegree = document.getElementById('itemPesquisadoBtnDegree');

// Campos capturáveis
const alterarQuantidade = document.getElementById('alterarQuantidade');
const alterarDescricao = document.getElementById('alterarDescricao');

// Variáveis pra iniciar
let idItem;
let responseGetTodosItens;
let dadosTodosItens;

// Formulários
const formCadastro = document.getElementById('formCadastrar');
const formPesquisar = document.getElementById('formPesquisar');

// ================= Campo de Cadastro de item =================
if (userFunction === 'Admin') {
    cadastrarButton.style.display = 'inline';

    cadastrarButton.addEventListener('click', function () {
        if (formCadastro.style.display === 'none' || formCadastro.style.display === '') {
            styleForms('block', 'none', 'none', 'none');
            document.getElementById('userInfo').classList.add('hidden');

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
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
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

document.getElementById('formPesquisar').addEventListener('submit', async function (event) {
    event.preventDefault();

    let dadosItem;
    const nomeItem = document.getElementById('NomeItemP').value;
    idItem = document.getElementById('Codigo').value;
    let responseGetItem;

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
            dadosItem = await responseGetItem.json();
            idItem = dadosItem.idItem;
            console.log(dadosItem);
            document.getElementById('itemId').textContent = dadosItem.idItem;
            document.getElementById('itemNome').textContent = dadosItem.nomeItem;
            document.getElementById('itemQuantidade').textContent = dadosItem.quantidade;
            document.getElementById('itemDescricao').textContent = dadosItem.descricao;

            if (dadosItem.imagemItem) {
                document.getElementById('itemPesquisadoFoto').src = `data:image/jpeg;base64,${dadosItem.imagemItem}`;
            } else {
                document.getElementById('itemPesquisadoFoto').alt = "Imagem não disponível";
            }

            document.getElementById('itemPesquisadoBtnAdd').style.display = 'inline';

            if (userFunction === 'Admin') {
                // Mostrar botões para Admin
                itemPesquisadoBtnAlter.style.display = 'inline';
                itemPesquisadoBtnExcluir.style.display = 'inline';

                // Função para ocultar mensagem e botões de confirmação
                function hideMessageAndButtons() {
                    itemPesquisadoMsg.style.display = 'none';
                    itemPesquisadoBtnAgree.style.display = 'none';
                    itemPesquisadoBtnDegree.style.display = 'none';
                    alterarQuantidade.style.display = 'none';
                    alterarDescricao.style.display = 'none';
                }
                
                // ====================== Evento para deletar item ======================
                itemPesquisadoBtnExcluir.addEventListener('click', () => {
                    showItemPesquisadoMsg("Essa ação é irreversível. Deseja excluir o item?", 'alert');
                    itemPesquisadoBtnAgree.style.display = 'inline';
                    itemPesquisadoBtnDegree.style.display = 'inline';

                    // Confirmar exclusão
                    itemPesquisadoBtnAgree.addEventListener('click', async () => {
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
                                showItemPesquisadoMsg('Item excluído com sucesso!', 'success');
                            } else {
                                showItemPesquisadoMsg('Erro ao excluir o item.', 'error');
                            }
                        } catch (error) {
                            showItemPesquisadoMsg('Erro ao excluir o item.', 'error');
                            console.error('Erro ao deletar item:', error);
                        } finally {
                            setTimeout(() => {
                                hideMessageAndButtons();
                                window.location.reload();
                            }, 2000);
                        }
                    });

                    // Cancelar exclusão
                    itemPesquisadoBtnDegree.addEventListener('click', hideMessageAndButtons);
                });

                // ================== Evento para Alterar dados de um item ===================
                itemPesquisadoBtnAlter.addEventListener('click', () => {
                    showItemPesquisadoMsg("Informe o que deseja alterar e depois confirme a alteração", 'default');
                    itemPesquisadoBtnAgree.style.display = 'inline';
                    itemPesquisadoBtnDegree.style.display = 'inline';
                    alterarQuantidade.style.display = 'inline';
                    alterarDescricao.style.display = 'inline';

                    // Confirmar Alteração
                    itemPesquisadoBtnAgree.addEventListener('click', async () => {
                        itemPesquisadoBtnAgree.disabled = true;
                        let responsePutItem;
                        let qtAlteracao =  document.getElementById('alterarQuantidade').value;
                        let dsAlteracao = document.getElementById('alterarDescricao').value;

                        if (qtAlteracao == "" || qtAlteracao == null) {
                            qtAlteracao = dadosItem.quantidade;
                        }

                        if (dsAlteracao == "" || dsAlteracao == null) {
                            dsAlteracao = dadosItem.descricao;
                        }

                        const itemAtualizado = {
                            IdItem: idItem,
                            Quantidade: parseInt(qtAlteracao, 10),
                            Descricao: dsAlteracao
                        }

                        try {
                            if (inProducao === "S") {
                                responsePutItem = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/${encodeURIComponent(dadosItem.idItem)}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        itemAtualizado
                                    },
                                    body: JSON.stringify(itemAtualizado)
                                });
                            } else {
                                responsePutItem = await fetch(`https://localhost:5201/api/ItemCadastro/${encodeURIComponent(itemAtualizado.IdItem)}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        
                                    },
                                    body: JSON.stringify(itemAtualizado)
                                });
                            }

                            if (responsePutItem.status == 204) {
                                showItemPesquisadoMsg('Dados do item alterado com sucesso!', 'success');
                            } else {
                                showItemPesquisadoMsg('Erro ao alterar dados o item.', 'error');
                            }
                        } catch (error) {
                            showItemPesquisadoMsg('Erro ao alterar dados do item.', 'error');
                            console.error('Erro ao alterar item:', error);
                        } finally {
                            itemPesquisadoBtnAgree.disabled = false;
                            setTimeout(() => {
                                hideMessageAndButtons();
                                window.location.reload();
                            }, 2000);
                        }
                    });
                    
                    // Cancelar exclusão
                    itemPesquisadoBtnDegree.addEventListener('click', hideMessageAndButtons);
                });
            }
            // Exibe o conteúdo lateral
            document.getElementById('itemPesquisado').style.display = 'block';
            document.getElementById('itemPesquisadoInfo').classList.remove('hidden');
        }
    }
    catch (error) {
        // Caso item não seja encontrado
        console.log(error)
        showMessagePesq('Erro ao pesquisar item.', 'error')
    }
})