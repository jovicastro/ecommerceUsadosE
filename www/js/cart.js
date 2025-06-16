// Aguarda o HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // =================================================
    // 1. DADOS DO CARRINHO (O "CÉREBRO" DA PÁGINA)
    // =================================================
    // Em um site real, estes dados viriam do backend ou do localStorage.
    // Para este exemplo, vamos começar com alguns produtos fixos.
    let cartItems = [
        {
            id: 1,
            name: 'Guitarra Elétrica Golden',
            price: 799.90,
            quantity: 1,
            image: 'https://media.istockphoto.com/id/1399610550/pt/foto/rock-electric-guitar-in-rich-golden-color.jpg?s=612x612&w=0&k=20&c=8uvzDRIXHBJ0FRNf5547nqp8o9F8A9e1qyAeqPecWfQ='
        },
        {
            id: 2,
            name: 'Amplificador de Guitarra',
            price: 450.00,
            quantity: 1,
            image: 'https://img.freepik.com/fotos-premium/amplificador-de-guitarra-preto-em-fundo-branco_193819-2782.jpg'
        },
        {
            id: 3,
            name: 'Jogo de Palhetas (10 un.)',
            price: 25.50,
            quantity: 2,
            image: 'https://m.media-amazon.com/images/I/71Vd4nj4BVL._AC_UF1000,1000_QL80_.jpg'
        }
    ];

    // =================================================
    // 2. SELETORES DE ELEMENTOS DO DOM
    // =================================================
    const cartContainer = document.querySelector('.lista-produtos');
    const subtotalPriceEl = document.querySelector('.linha-subtotal span:last-child');
    const totalPriceEl = document.querySelector('.preco-total');
    const resumoPedidoEl = document.querySelector('.resumo-pedido');

    // =================================================
    // 3. FUNÇÕES PRINCIPAIS
    // =================================================

    /**
     * Renderiza (desenha) todos os itens do carrinho na tela.
     */
    function renderCart() {
        // Limpa o conteúdo atual do carrinho para não duplicar itens
        cartContainer.innerHTML = '';

        // Se o carrinho estiver vazio, mostra uma mensagem
        if (cartItems.length === 0) {
            cartContainer.innerHTML = `
                <div class="carrinho-vazio">
                    <h2>Seu carrinho está vazio :(</h2>
                    <p>Adicione produtos para vê-los aqui.</p>
                    <a href="/" class="btn-finalizar">Começar a Comprar</a>
                </div>
            `;
            // Esconde o resumo do pedido se o carrinho estiver vazio
            resumoPedidoEl.style.display = 'none';
            return;
        }

        // Mostra o resumo do pedido se tiver itens
        resumoPedidoEl.style.display = 'block';

        // Cria o HTML para cada item do carrinho
        cartItems.forEach(item => {
            const itemHtml = `
                <div class="item-carrinho" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="item-imagem">
                    <div class="item-info">
                        <h3 class="item-titulo">${item.name}</h3>
                        <p class="item-preco">${formatCurrency(item.price)}</p>
                        <div class="item-quantidade">
                            <label>Qtd:</label>
                            <input type="number" value="${item.quantity}" min="1" class="quantidade-input">
                        </div>
                    </div>
                    <button class="item-remover">×</button>
                </div>
            `;
            // Adiciona o HTML do item ao container
            cartContainer.innerHTML += itemHtml;
        });

        updateTotals();
        addEventListenersToItems();
    }

    /**
     * Adiciona os "ouvintes" de eventos para os botões de remover e campos de quantidade.
     */
    function addEventListenersToItems() {
        document.querySelectorAll('.item-remover').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });

        document.querySelectorAll('.quantidade-input').forEach(input => {
            input.addEventListener('change', handleUpdateQuantity);
        });
    }

    /**
     * Lida com o clique no botão de remover um item.
     */
    function handleRemoveItem(event) {
        // Pega o elemento pai '.item-carrinho' para encontrar o ID
        const itemElement = event.target.closest('.item-carrinho');
        const itemId = parseInt(itemElement.dataset.id);

        // Filtra o array, mantendo apenas os itens com ID diferente do clicado
        cartItems = cartItems.filter(item => item.id !== itemId);
        
        // Re-renderiza o carrinho com a nova lista de itens
        renderCart();
    }

    /**
     * Lida com a mudança na quantidade de um item.
     */
    function handleUpdateQuantity(event) {
        const itemElement = event.target.closest('.item-carrinho');
        const itemId = parseInt(itemElement.dataset.id);
        const newQuantity = parseInt(event.target.value);

        // Encontra o item no array para atualizar sua quantidade
        const itemToUpdate = cartItems.find(item => item.id === itemId);
        if (itemToUpdate) {
            itemToUpdate.quantity = newQuantity;
        }
        
        // Apenas atualiza os totais, não precisa re-renderizar tudo
        updateTotals();
    }

    /**
     * Calcula e atualiza os valores de subtotal e total na tela.
     */
    function updateTotals() {
        // Calcula o subtotal somando (preço * quantidade) de cada item
        const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        // Por enquanto, o total é igual ao subtotal (sem frete)
        const total = subtotal; 

        // Atualiza o HTML com os valores formatados
        subtotalPriceEl.textContent = formatCurrency(subtotal);
        totalPriceEl.textContent = formatCurrency(total);
    }
    
    /**
     * Formata um número para o padrão de moeda brasileiro (R$).
     * @param {number} value - O número a ser formatado.
     * @returns {string} - O valor formatado como moeda.
     */
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // =================================================
    // 4. INICIALIZAÇÃO
    // =================================================
    // Chama a função principal para desenhar o carrinho pela primeira vez
    renderCart();

});