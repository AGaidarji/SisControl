const cadastrarButton = document.getElementById('cadastrarItem');
const soliticarButton = document.getElementById('solicitarItem');
const pesquisarButton = document.getElementById('pesquisarItem');

const formCadastro = document.getElementById('formCadastrar');
const formSolicitar = document.getElementById('formSolicitar');
const formPesquisar = document.getElementById('formPesquisar');

cadastrarButton.addEventListener('click', function() {
    if (formCadastro.style.display === 'none' || formCadastro.style.display === '') {
        formCadastro.style.display = 'block';
        formSolicitar.style.display = 'none';
        formPesquisar.style.display = 'none';
    } else {
        formCadastro.style.display = 'none';
    }
})

soliticarButton.addEventListener('click', function() {
    if (formSolicitar.style.display === 'none' || formSolicitar.style.display === '') {
        formSolicitar.style.display = 'block';
        formCadastro.style.display = 'none';
        formPesquisar.style.display = 'none';
    } else {
        formSolicitar.style.display = 'none';
    }
})

pesquisarButton.addEventListener('click', function() {
    if (formPesquisar.style.display === 'none' || formPesquisar.style.display === '') {
        formPesquisar.style.display = 'block';
        formCadastro.style.display = 'none';
        formSolicitar.style.display = 'none';
    } else {
        formPesquisar.style.display = 'none';
    }
})

document.getElementById('formCadastrar').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const quantidade = document.getElementById('quantidade').value;
    const description = document.getElementById('description').value;
    const dateIn = new Date();
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(dateIn);

    console.log(formattedDate);
})