const userFunction = localStorage.getItem('userFunction');
const userFunctionLogin = localStorage.getItem('userFunctionLogin');
const userNameLogin = localStorage.getItem('userNameLogin');
const userCpfLogin = localStorage.getItem('userCpfLogin');
const inProducao = localStorage.getItem('inProducao');
const closeItensResume = document.getElementById('closeItensResume'); 
const buttonListItens = document.getElementById('buttonListItens'); 

const firstName = userNameLogin.split(' ');
document.getElementById('userNameLogin').textContent = firstName[0];
document.getElementById('userFunctionLogin').textContent = userFunctionLogin;

(async () => {
    const itens = await obterItens();
    if (itens) {
        console.log("Itens obtidos com sucesso:", itens);
    }
})();

async function obterItens() {
    try {
        let responseGetTodosItens;
        
        if (inProducao === "S") {
            responseGetTodosItens = await fetch(`https://siscontrol-fdfhghebapc5cvbh.brazilsouth-01.azurewebsites.net/api/ItemCadastro`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            responseGetTodosItens = await fetch(`https://localhost:5201/api/ItemCadastro`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        if (responseGetTodosItens.ok) {
            const dadosTodosItens = await responseGetTodosItens.json();
            const tableBody = document.getElementById('itensTableBody');

            tableBody.innerHTML = '';

            dadosTodosItens.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.idItem}</td>
                    <td>${item.nomeItem}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.descricao || 'Sem descrição'}</td>
                `;

                tableBody.appendChild(row);
            });
        } else {
            console.error("Erro ao buscar itens: ", responseGetTodosItens.statusText);
            return null;
        }
    } catch (error) {
        console.error("Erro ao pesquisar itens:", error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    closeItensResume.addEventListener('click', function () {
        document.getElementById('itemResumeContainer').style.display = 'none';
    })
})

document.addEventListener('DOMContentLoaded', () => {
    buttonListItens.addEventListener('click', function () {
        document.getElementById('itemResumeContainer').style.display = 'flex';
    })
})