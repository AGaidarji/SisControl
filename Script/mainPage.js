const userFunction = localStorage.getItem('userFunction');
const userFunctionLogin = localStorage.getItem('userFunctionLogin');
const userNameLogin = localStorage.getItem('userNameLogin');
const inProducao = localStorage.getItem('inProducao');


const firstName = userNameLogin.split(' ');
document.getElementById('userNameLogin').textContent = firstName[0];
document.getElementById('userFunctionLogin').textContent = userFunctionLogin;