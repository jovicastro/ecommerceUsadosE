// Aguarda o HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // =================================================
    // 1. DADOS DO CARRINHO (O "CÉREBRO" DA PÁGINA)
    // =================================================
    // ***** ITENS ATUALIZADOS DE ACORDO COM A SOLICITAÇÃO *****
    let cartItems = [
        {
            id: 1,
            name: 'Violão Acústico',
            price: 550.75,
            quantity: 1,
            // Caminho atualizado baseado na sua estrutura de arquivos
            image: '/img/camera.png'
        },
        {
            id: 2,
            name: 'Notebook Moderno',
            price: 3250.00,
            quantity: 1,
            // Caminho atualizado baseado na sua estrutura de arquivos
            image: '/img/notebook.png'
        },
        {
            id: 3,
            name: 'Cadeira de Escritório',
            price: 899.90,
            quantity: 1,
            // Caminho atualizado baseado na sua estrutura de arquivos
            image: '/img/cadeira.png'
        }
    ];

    // =================================================
    // 2. SELETORES DE ELEMENTOS DO DOM
    // =================================================
    const cartContainer = document.querySelector('.lista-produtos-itens');
    const subtotalPriceEl = document.getElementById('subtotal-valor');
    const totalPriceEl = document.getElementById('total-valor');
    const resumoPedidoEl = document.querySelector('.resumo-pedido');
    const mainContainer = document.querySelector('.container-carrinho');

    // =================================================
    // 3. FUNÇÕES PRINCIPAIS
    // =================================================

    /**
     * Renderiza (desenha) todos os itens do carrinho na tela.
     */
    function renderCart() {
        cartContainer.innerHTML = '';

        if (cartItems.length === 0) {
            mainContainer.innerHTML = `
                <div class="carrinho-vazio">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <h2>Seu carrinho está vazio :(</h2>
                    <p>Adicione produtos navegando pelo site.</p>
                    <a href="/" class="btn-finalizar">Começar a Comprar</a>
                </div>
            `;
            return;
        }

        resumoPedidoEl.style.display = 'block';

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
                    <button class="item-remover" title="Remover Item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            cartContainer.innerHTML += itemHtml;
        });
        
        const continueShoppingLink = document.createElement('a');
        continueShoppingLink.href = '/';
        continueShoppingLink.className = 'continuar-comprando-link';
        continueShoppingLink.innerHTML = '← Continuar Comprando';
        cartContainer.appendChild(continueShoppingLink);

        updateTotals();
        addEventListenersToItems();
    }

    /**
     * Adiciona os "ouvintes" de eventos para os botões e inputs recém-criados.
     */
    function addEventListenersToItems() {
        document.querySelectorAll('.item-remover').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });

        document.querySelectorAll('.quantidade-input').forEach(input => {
            input.addEventListener('input', handleUpdateQuantity);
        });
    }

    /**
     * Lida com o clique no botão de remover um item.
     */
    function handleRemoveItem(event) {
        const itemElement = event.target.closest('.item-carrinho');
        const itemId = parseInt(itemElement.dataset.id);
        cartItems = cartItems.filter(item => item.id !== itemId);
        renderCart();
    }

    /**
     * Lida com a mudança na quantidade de um item.
     */
    function handleUpdateQuantity(event) {
        const itemElement = event.target.closest('.item-carrinho');
        const itemId = parseInt(itemElement.dataset.id);
        const newQuantity = Math.max(1, parseInt(event.target.value) || 1);

        const itemToUpdate = cartItems.find(item => item.id === itemId);
        if (itemToUpdate) {
            itemToUpdate.quantity = newQuantity;
        }
        
        event.target.value = newQuantity;
        
        updateTotals();
    }

    /**
     * Calcula e atualiza os valores de subtotal e total na tela.
     */
    function updateTotals() {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const total = subtotal; 

        subtotalPriceEl.textContent = formatCurrency(subtotal);
        totalPriceEl.textContent = formatCurrency(total);
    }
    
    /**
     * Formata um número para o padrão de moeda brasileiro (R$).
     */
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // =================================================
    // 4. INICIALIZAÇÃO
    // =================================================
    renderCart();
});