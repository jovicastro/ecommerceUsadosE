// Em www/js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageArea = document.getElementById('messageArea');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;

        const loginData = { email, password }; // Forma curta de escrever { email: email, password: password }

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Login bem-sucedido!', result.message);
                
                messageArea.textContent = 'Login efetuado com sucesso! Redirecionando...';
                messageArea.style.color = 'green';

                // A única coisa que precisamos fazer é redirecionar para onde o backend nos disse.
                // Usamos um pequeno delay para que o usuário possa ler a mensagem de sucesso.
                setTimeout(() => {
                    window.location.href = result.redirectUrl || '/';
                }, 700); // 0.7 segundos

            } else {
                console.error('Falha no login:', result);
                messageArea.textContent = result.message || 'Ocorreu um erro.';
                messageArea.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            messageArea.textContent = 'Erro de conexão com o servidor.';
            messageArea.style.color = 'red';
        }
    });
});