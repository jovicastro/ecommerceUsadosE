// Função que roda automaticamente assim que a página carrega
(async function checkAuthState() {
    console.log("Verificando com o servidor quem está logado...");

    // Seleciona o alvo na navbar. Garanta que este ID existe no seu HTML da navbar!
    const userActionElement = document.getElementById('user-action-area'); // Usando o ID da sua nova navbar

    try {
        // Nós não precisamos mais do token aqui!
        // Apenas fazemos a chamada para a rota protegida. 
        // Se o cookie 'token' existir, o navegador o enviará automaticamente.
        const response = await fetch('/api/users/me');

        // Se a resposta for 'ok' (status 200), o token é válido e o usuário está logado.
        if (response.ok) {
            const data = await response.json();
            const user = data.user;
            console.log("Usuário autenticado:", user.fullname);

            // Atualiza a navbar para o estado "logado"
            if (userActionElement) {
                userActionElement.innerHTML = `
                    <div class="neo-user-logged-in">
                        <a href="/profile" class="neo-user-link" title="Sua Conta">
                            <span class="greeting-line">Olá, ${user.fullname.split(' ')[0]}</span>
                            <br/>
                            <span class="account-line">Conta & Configurações</span>
                                           </a>
                        <a href="#" id="logoutButton" class="neo-logout-button" title="Sair">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </a>
                    </div>
                `;

                // Adiciona a funcionalidade de logout ao novo botão
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                    logoutButton.addEventListener('click', async(e) => {
                        e.preventDefault();
                        try {
                            // --- AJUSTE AQUI ---
                            // Faz a chamada para a nossa nova rota de logout no backend
                            const response = await fetch('/api/users/logout', { method: 'GET' });

                            if (response.ok) {
                                // Se o backend confirmou o logout...
                                alert('Você foi desconectado com segurança.');
                                // ...redirecionamos o usuário para a página de login.
                                window.location.href = '/login';
                            } else {
                                // Se algo der errado no backend, ainda tentamos forçar o logout no frontend
                                alert('Não foi possível fazer logout no servidor, desconectando localmente.');
                                window.location.href = '/login';
                            }
                        } catch (error) {
                            console.error('Erro de rede ao tentar fazer logout:', error);
                            alert('Erro de conexão ao tentar fazer logout.');
                        }
                    });
                }
            }
        } else {
            // Se a resposta não for 'ok', o usuário não está logado ou a sessão expirou.
            // O authMiddleware no backend já o teria redirecionado para /login,
            // mas podemos garantir que a navbar esteja no estado "deslogado".
            console.log("Nenhum usuário logado ou a sessão expirou.");
            if (userActionElement) {
                userActionElement.innerHTML = `
                    <a href="/login" class="neo-action-button" title="Minha Conta">
                        <i class="fa-solid fa-user"></i>
                    </a>
                `;
            }
        }
    } catch (error) {
        // Pega erros de rede (ex: servidor offline).
        console.error("Erro de rede ao verificar estado de login:", error);
    }
})();