localStorage.setItem('inProducao', inProducao = 'N');

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const passwordHash = document.getElementById('password').value;
    let response = '';
    
    const loginRequest = {
        Email: email,
        PasswordHash: passwordHash
    };

    function showMessageDiv(message, className) {
        messageDiv.innerText = message;
        messageDiv.className = className;
        messageDiv.style.display = 'block';
    }

    if (inProducao === 'S') {
        response = await fetch('https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/UserCadastro/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        })
    } else {
        response = await fetch('https://localhost:5201/api/UserCadastro/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        });
    }
    
    const messageDiv = document.getElementById('message');
    const data = await response.json();
    localStorage.setItem('userFunction', data.userFunction);

    if (response.ok) {
        showMessageDiv('Login efetuado com sucesso.', 'success')

        localStorage.setItem('userFunctionLogin', data.userFunctionLogin);
        localStorage.setItem('userNameLogin', data.userNameLogin);

        //Levar para outra pagina após logado com sucesso
        setTimeout(() => {
            window.location.href = 'mainPage.html';
        }, 1000)
    } else {
        showMessageDiv('Email ou senha incorretos.', 'error')
        return;
    }
});