// www/js/cart.js (Versão Refatorada e Conectada ao Backend)

document.addEventListener('DOMContentLoaded', () => {

    // =================================================
    // 1. ESTADO DO CARRINHO
    // =================================================
    // Em vez de dados fixos, começamos com um estado vazio.
    // Este array será nossa "fonte da verdade" local, preenchido com dados da API.
    let cartState = [];

    // =================================================
    // 2. SELETORES DE ELEMENTOS DO DOM (permanecem os mesmos)
    // =================================================
    const cartContainer = document.querySelector('.lista-produtos-itens');
    const subtotalPriceEl = document.getElementById('subtotal-valor');
    const totalPriceEl = document.getElementById('total-valor');
    const resumoPedidoEl = document.querySelector('.resumo-pedido');
    const mainContainer = document.querySelector('.container-carrinho');

    // =================================================
    // 3. FUNÇÕES PRINCIPAIS (Modificadas para trabalhar com o novo estado)
    // =================================================

    /**
     * Renderiza (desenha) todos os itens do carrinho na tela.
     * AGORA, ela recebe os itens como um parâmetro.
     */
    function renderCart(items) {
        cartContainer.innerHTML = ''; // Limpa a lista antes de redesenhar

        if (!items || items.length === 0) {
            mainContainer.innerHTML = `
                <div class="carrinho-vazio">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <h2>Seu carrinho está vazio :(</h2>
                    <p>Adicione produtos navegando pelo site.</p>
                    <a href="/" class="btn-finalizar">Começar a Comprar</a>
                </div>
            `;
            if(resumoPedidoEl) resumoPedidoEl.style.display = 'none'; // Esconde o resumo se o carrinho está vazio
            return;
        }

        if(resumoPedidoEl) resumoPedidoEl.style.display = 'block'; // Mostra o resumo se tem itens

        items.forEach(item => {
            // A imagem vem da propriedade 'img' do produto que juntamos no backend
            const imageUrl = item.img || '/img/placeholder.png'; 
            const itemHtml = `
                <div class="item-carrinho" data-id="${item.id}">
                    <img src="${imageUrl}" alt="${item.name}" class="item-imagem">
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

        updateTotals(items);
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
     * ATENÇÃO: Por enquanto, isso só remove do estado local. Não salva no backend.
     */
    function handleRemoveItem(event) {
        const itemElement = event.target.closest('.item-carrinho');
        const itemId = parseInt(itemElement.dataset.id);
        // Filtra o estado local para remover o item clicado
        cartState = cartState.filter(item => item.id !== itemId);
        // Redesenha o carrinho com a lista atualizada
        renderCart(cartState);
    }

    /**
     * Lida com a mudança na quantidade de um item.
     * ATENÇÃO: Por enquanto, isso só atualiza o estado local. Não salva no backend.
     */
    function handleUpdateQuantity(event) {
        const itemElement = event.target.closest('.item-carrinho');
        const itemId = parseInt(itemElement.dataset.id);
        const newQuantity = Math.max(1, parseInt(event.target.value) || 1);

        const itemToUpdate = cartState.find(item => item.id === itemId);
        if (itemToUpdate) {
            itemToUpdate.quantity = newQuantity;
        }
        
        // Não precisamos redesenhar tudo, apenas atualizar os totais
        updateTotals(cartState);
    }

    /**
     * Calcula e atualiza os valores de subtotal e total na tela.
     * AGORA, ela recebe os itens como um parâmetro.
     */
    function updateTotals(items) {
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const total = subtotal; 

        if (subtotalPriceEl) subtotalPriceEl.textContent = formatCurrency(subtotal);
        if (totalPriceEl) totalPriceEl.textContent = formatCurrency(total);
    }
    
    /**
     * Formata um número para o padrão de moeda brasileiro (R$).
     */
    function formatCurrency(value) {
        // Garante que o valor é um número antes de formatar
        const numberValue = Number(value);
        if(isNaN(numberValue)) return 'R$ 0,00';
        return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // =================================================
    // 4. INICIALIZAÇÃO E CONEXÃO COM O BACKEND
    // =================================================

    /**
     * Função principal que busca os dados da API e inicia a renderização.
     */
    async function initializeCart() {
        console.log("Iniciando o carrinho: buscando itens do backend...");
        try {
            const response = await fetch('/api/cart'); // Chama nossa API
            if (!response.ok) {
                throw new Error('Não foi possível buscar os dados do carrinho.');
            }
            const itemsFromDB = await response.json();
            console.log("Itens recebidos do banco de dados:", itemsFromDB);

            // Guarda os itens recebidos no nosso estado local
            cartState = itemsFromDB;
            // Chama a função para desenhar o carrinho na tela com os dados reais
            renderCart(cartState);

        } catch (error) {
            console.error("Erro ao inicializar o carrinho:", error);
            if (cartContainer) cartContainer.innerHTML = `<p class="error-message">Erro ao carregar seu carrinho. Tente novamente mais tarde.</p>`;
        }
    }

    // A mágica começa aqui: quando a página carrega, chama a função para buscar os dados.
    initializeCart();
});