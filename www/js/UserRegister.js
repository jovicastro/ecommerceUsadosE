// Em um arquivo como js/cadastroUsuario.js

// Espera o HTML estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const btnCadastrar = document.getElementById('btnCadastrar'); // Pega o botão pelo ID

    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', async () => {
            // 1. Coletar os dados dos inputs
            // Se você usar uma tag <form id="cadastroForm">, pode ser mais fácil
            const fullname = document.querySelector('input[name="fullname"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const telephoneN = document.querySelector('input[name="telephoneN"]').value;
            const password = document.querySelector('input[name="password"]').value;
            const cep = document.querySelector('input[name="cep"]').value;
            
            // Se você decidir enviar todos os detalhes do endereço:
            const street = document.querySelector('input[name="street"]').value;
            const addressNumber = document.querySelector('input[name="addressNumber"]').value;
            const complement = document.querySelector('input[name="complement"]').value;
            const neighborhood = document.querySelector('input[name="neighborhood"]').value;
            const city = document.querySelector('input[name="city"]').value;
            const state = document.querySelector('input[name="state"]').value;

            // 2. Montar o objeto de dados para enviar ao backend
            // Ajuste este objeto para corresponder ao que seu backend espera!
            const userData = {
                fullname: fullname,
                email: email,
                telephoneN: telephoneN,
                password: password,
                cep: cep,
                // Se for enviar o endereço detalhado, inclua os campos aqui.
                // Lembre-se que o backend User.js e authController.js precisam estar prontos para recebê-los.
                // Exemplo, se o backend espera addressN para o número e você quer juntar outros:
                addressN: addressNumber, // Este é o que o backend espera atualmente (se mantiver a Opção A)
                // Ou, se o backend for atualizado para aceitar todos:
                // street: street,
                // addressNumber: addressNumber, 
                // complement: complement,
                // neighborhood: neighborhood,
                // city: city,
                // state: state,

                admin: false // Geralmente, o usuário não define isso no cadastro público
            };

            // 3. Fazer a requisição POST para o backend
            try {
                const response = await fetch('/api/auth/register', { // Certifique-se que o URL está correto
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                const result = await response.json(); // Pega a resposta do backend

                if (response.ok) { // Status 200-299
                    alert(result.message || 'Cadastro realizado com sucesso!');
                    // Redirecionar para a página de login, por exemplo
                    // window.location.href = 'login.html';
                } else {
                    // Erro do backend (ex: email já existe, campos faltando, erro do servidor)
                    alert('Erro no cadastro: ' + (result.message || response.statusText));
                }
            } catch (error) {
                // Erro na rede ou ao tentar fazer a requisição
                console.error('Erro ao tentar cadastrar:', error);
                alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
            }
        });
    }
});