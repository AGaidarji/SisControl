const cadastrarButton = document.getElementById('cadastrarItem');
const pesquisarButton = document.getElementById('pesquisarItem');

const formCadastro = document.getElementById('formCadastrar');
const formPesquisar = document.getElementById('formPesquisar');

if (userFunction === 'Admin') {
    cadastrarButton.style.display = 'inline';

    cadastrarButton.addEventListener('click', function () {
        if (formCadastro.style.display === 'none' || formCadastro.style.display === '') {
            styleForms('block', 'none', 'none', 'none');
            document.getElementById('userInfo').classList.add('hidden');

            document.getElementById('formCadastrar').addEventListener('submit', async function (event) {
                event.preventDefault();

                const formData = new FormData();
                formData.append('NomeItem', document.getElementById('NomeItem').value);
                formData.append('Quantidade', document.getElementById('Quantidade').value);
                formData.append('Descricao', document.getElementById('Descricao').value);
                formData.append('ImagemItem', document.getElementById('ImagemItem').files[0]);

                const responseItem = await fetch('https://localhost:5201/api/ItemCadastro/upload', {
                    method: 'POST',
                    body: formData
                });

                try {
                    if (!responseItem.ok) {
                        const errorText = await responseItem.text();
                        console.error("Erro na resposta:", errorText);
                    } else {
                        console.log("Arquivo enviado com sucesso!");
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
}

pesquisarButton.addEventListener('click', function () {
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

            try {
                if (nomeItem != null && nomeItem != '') {
                    responseGetItem = await fetch(`https://localhost:5201/api/ItemCadastro/nome/${encodeURIComponent(nomeItem)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (responseGetItem.status === 404) {
                        // Caso item não seja encontrado
                        const messageDiv = document.getElementById('messagePesq');
                        messageDiv.innerText = 'Item não encontrado.';
                        messageDiv.className = 'error';
                        messageDiv.style.display = 'block';
                    }

                } else if (idItem != null && idItem != '') {
                    responseGetItem = await fetch(`https://localhost:5201/api/ItemCadastro/${encodeURIComponent(idItem)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (responseGetItem.status === 404) {
                        // Caso item não seja encontrado
                        const messageDiv = document.getElementById('messagePesq');
                        messageDiv.innerText = 'Item não encontrado.';
                        messageDiv.className = 'error';
                        messageDiv.style.display = 'block';
                    }
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

                    document.getElementById('buttonAddItem').style.display = 'inline';

                    if (userFunction === 'Admin') {
                        const buttonAlterItem = document.getElementById('buttonAlterItem');
                        const buttonDelItem = document.getElementById('buttonDelItem');
                        const buttonItemAgree = document.getElementById('buttonItemAgree');
                        const buttonItemDegree = document.getElementById('buttonItemDegree');
                        const messageBtItens = document.getElementById('messageBtItens');

                        // Mostrar botões para Admin
                        buttonAlterItem.style.display = 'inline';
                        buttonDelItem.style.display = 'inline';

                        function showMessage(message, className) {
                            messageBtItens.innerText = message;
                            messageBtItens.className = className;
                            messageBtItens.style.display = 'block';
                        };

                        // Função para ocultar mensagem e botões de confirmação
                        function hideMessageAndButtons() {
                            messageBtItens.style.display = 'none';
                            buttonItemAgree.style.display = 'none';
                            buttonItemDegree.style.display = 'none';
                            document.getElementById('itemInfo').classList.add('hidden');
                            document.getElementById('conteudoLateral').style.display = 'none';
                        }

                        // Evento para deletar item
                        buttonDelItem.addEventListener('click', () => {
                            showMessage("Essa ação é irreversível. Deseja excluir o item?", 'alert');
                            buttonItemAgree.style.display = 'inline';
                            buttonItemDegree.style.display = 'inline';

                            // Confirmar exclusão
                            buttonItemAgree.addEventListener('click', async () => {
                                try {
                                    const response = await fetch(`https://localhost:5201/api/ItemCadastro/${encodeURIComponent(dadosItem.idItem)}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    });

                                    if (response.ok) {
                                        showMessage('Item excluído com sucesso!', 'success');
                                    } else {
                                        showMessage('Erro ao excluir o item.', 'error');
                                    }
                                } catch (error) {
                                    showMessage('Erro ao excluir o item.', 'error');
                                    console.error('Erro ao deletar item:', error);
                                } finally {
                                    setTimeout(hideMessageAndButtons, 2000); // Oculta após 2 segundos
                                }
                            });

                            // Cancelar exclusão
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
                const messageDiv = document.getElementById('messagePesq');
                messageDiv.innerText = 'Erro ao pesquisar item.';
                messageDiv.className = 'error';
                messageDiv.style.display = 'block';
            }
        })
    } else {
        formPesquisar.style.display = 'none';
        document.getElementById('itemInfo').classList.add('hidden');
    }
})