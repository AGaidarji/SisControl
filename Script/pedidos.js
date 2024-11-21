const solicitarButton = document.getElementById('solicitarItem');
const pedidosButton = document.getElementById('pedidosRecentes');

const formSolicitar = document.getElementById('formSolicitar');

solicitarButton.addEventListener('click', function () {
    if (formSolicitar.style.display === 'none' || formSolicitar.style.display === '') {
        styleForms('none', 'block', 'none', 'none');
        document.getElementById('userInfo').classList.add('hidden');
    } else {
        formSolicitar.style.display = 'none';
    }
});

if (userFunction === 'Admin') {
    pedidosButton.style.display = 'inline';

}