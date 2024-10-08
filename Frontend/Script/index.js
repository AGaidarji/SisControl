const cadastrarItemButton = document.getElementById('cadastrarItem');
const form = document.getElementById('userForm');

cadastrarItemButton.addEventListener('click', function() {
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
})

document.getElementById('userForm').addEventListener('submit', async function (event) {
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