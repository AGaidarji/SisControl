const cadastrarButton = document.getElementById('cadastrarItem');
const soliticarButton = document.getElementById('solicitarItem');
const pesquisarButton = document.getElementById('pesquisarItem');
const usuariosButton = document.getElementById('usuarios');

const formCadastro = document.getElementById('formCadastrar');
const formSolicitar = document.getElementById('formSolicitar');
const formPesquisar = document.getElementById('formPesquisar');
const formUsuarios = document.getElementById('formUsuarios');

const userFunction = 'admin';

soliticarButton.addEventListener('click', function() {
    if (formSolicitar.style.display === 'none' || formSolicitar.style.display === '') {
        formSolicitar.style.display = 'block';
        formCadastro.style.display = 'none';
        formPesquisar.style.display = 'none';
        formUsuarios.style.display = 'none';
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
    } else {
        formPesquisar.style.display = 'none';
    }
})

if (userFunction == 'admin') {
    usuariosButton.style.display = 'inline';
    cadastrarButton.style.display = 'inline';

    usuariosButton.addEventListener('click', function() {
        if (formUsuarios.style.display === 'none' || formUsuarios.style.display === '') {
            formUsuarios.style.display = 'block';
            formPesquisar.style.display = 'none';
            formCadastro.style.display = 'none';
            formSolicitar.style.display = 'none';
        } else {
            formUsuarios.style.display = 'none';
        }
    })

    cadastrarButton.addEventListener('click', function() {
        if (formCadastro.style.display === 'none' || formCadastro.style.display === '') {
            formCadastro.style.display = 'block';
            formSolicitar.style.display = 'none';
            formPesquisar.style.display = 'none';
            formUsuarios.style.display = 'none';
        } else {
            formCadastro.style.display = 'none';
        }
    })

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
}