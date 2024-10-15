document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const response = await fetch('https://siscontrolsa.azurewebsites.net/api/UserCadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    const messageDiv = document.getElementById('message');

    if (response.ok) {
        messageDiv.innerText = 'Login efetuado com sucesso.';
        messageDiv.className = 'success'; // Classe para sucesso
        messageDiv.style.display = 'block'; // Exibe a mensagem

        const loginOk = true;

        //Levar para outra pagina após logado com sucesso
        setTimeout(() => {
            window.location.href = 'Index.html';
        }, 2000)
    } else {
        messageDiv.innerText = 'Email ou senha incorretos.';
        messageDiv.className = 'error'; // Classe para erro
        messageDiv.style.display = 'block'; // Exibe a mensagem

        const loginOk = false;
        return;
    }
});