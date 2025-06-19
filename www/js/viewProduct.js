// www/js/viewProduct.js

document.addEventListener('DOMContentLoaded', () => {

    // Tarefa A: Selecione o botão "Adicionar ao carrinho" pelo ID que você deu a ele.
    const addToCartButton = document.getElementById('addToCartBtn');

    // Verifica se o botão realmente existe na página
    if (addToCartButton) {
        
        // Tarefa B: Adicione um 'event listener' de 'click' a este botão.
        addToCartButton.addEventListener('click', async () => {
            
            // Tarefa C: Quando o botão for clicado, pegue o ID do produto do 'data-attribute'.
            const productId = addToCartButton.dataset.productId;
            
            // Tarefa D: Por enquanto, a quantidade será sempre 1.
            const quantity = 1;

            console.log(`Tentando adicionar ao carrinho: Produto ID ${productId}, Quantidade ${quantity}`);

            // Tarefa E: Faça a requisição 'fetch' para a nossa nova API.
            try {
                const response = await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // O corpo da requisição com os dados do produto a ser adicionado
                    body: JSON.stringify({ productId, quantity }) 
                });

                const result = await response.json();

                // Tarefa F: Trate a resposta.
                if (response.ok) {
                    alert(result.message); // Exibe a mensagem de sucesso, ex: "Produto adicionado!"
                    // No futuro, podemos atualizar o ícone do carrinho aqui!
                } else {
                    // Se der erro (ex: usuário não logado, produto não existe), exibe a mensagem de erro.
                    // O nosso authMiddleware já deve ter redirecionado para o login se o usuário não estiver logado.
                    alert(`Erro: ${result.message}`);
                }

            } catch (error) {
                console.error('Erro de rede ao adicionar ao carrinho:', error);
                alert('Erro de conexão ao tentar adicionar produto ao carrinho.');
            }
        });
    }
});