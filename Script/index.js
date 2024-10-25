document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://localhost:5201/api/UserLogin/login', {
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
            window.location.href = 'mainPage.html';
        }, 1000)
    } else {
        messageDiv.innerText = 'Email ou senha incorretos.';
        messageDiv.className = 'error'; // Classe para erro
        messageDiv.style.display = 'block'; // Exibe a mensagem

        const loginOk = false;
        return;
    }
});