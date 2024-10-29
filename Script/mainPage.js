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
        formData.append('nomeItem', document.getElementById('name').value);
        formData.append('quantidade', document.getElementById('quantidade').value);
        formData.append('descricao', document.getElementById('description').value);
        formData.append('imagem', document.getElementById('imagem').files[0]);
    
        const response = await fetch('https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro/upload',{
            method: 'POST',
            body: formData
        });
    
        const result = await response.json();
        console.log(result.message);
    })
}