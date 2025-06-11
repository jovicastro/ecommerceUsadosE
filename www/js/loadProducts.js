// www/js/loadProducts.js

/**
 * Função para popular um card de produto clonado de um template HTML.
 * @param {HTMLElement} templateNode - O nó do template HTML a ser clonado.
 * @param {object} product - Um objeto contendo os dados do produto.
 * @returns {HTMLElement} O elemento do card do produto clonado e populado, pronto para ser adicionado ao DOM.
 */
 function populateCardFromTemplate(templateNode, product) {
    // 1. Clona o nó do template. 'true' para clonagem profunda (inclui todos os filhos).
    const cardClone = templateNode.cloneNode(true);

    // 2. Remove o ID do clone para evitar IDs duplicados no DOM.
    cardClone.removeAttribute('id');
    // 3. Torna o card clonado visível removendo o 'display: none'.
    cardClone.style.display = ''; // Ou 'block', 'flex', dependendo do seu CSS para .productsCards

    // 4. Encontra os elementos dentro do clone para preencher com os dados do produto.
    // Usamos querySelector para encontrar elementos pelas suas classes DENTRO do card clonado.
    const imgElement = cardClone.querySelector('img');
    const nameElement = cardClone.querySelector('.productName');
    const priceElement = cardClone.querySelector('.productPrice');
    const descriptionElement = cardClone.querySelector('.description');
    const dateElement = cardClone.querySelector('.data.lowFont');


    // 5. Preenche os elementos com os dados do produto.
    if (imgElement) {
        imgElement.src = product.img || 'images/placeholder.png'; // Use um placeholder se não houver imagem
        imgElement.alt = product.name || 'Imagem do Produto';
    }
    if (nameElement) {
        nameElement.textContent = product.name || 'Produto Sem Nome';
    }
    if (priceElement) {
        const formattedPrice = parseFloat(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        priceElement.textContent = formattedPrice || 'Preço indisponível';
    }
    if (dateElement && product.date) {
        // A data do backend vem como: "2111-12-21T03:00:00.000Z"
        // O template espera: "15/05/2025, 00:00"
        // Vamos formatar a data e hora:
        const productDate = new Date(product.date);
        const formattedDisplayDate = productDate.toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
        const formattedDisplayTime = productDate.toLocaleTimeString('pt-BR', {
            hour: '2-digit', minute: '2-digit'
        });
        dateElement.textContent = `${formattedDisplayDate}, ${formattedDisplayTime}`;
    } else if (dateElement) {
        dateElement.textContent = 'Data indisponível';
    }

    // Se você quiser adicionar outros campos do produto que não estão no template original
    // (como description, status, category), você precisaria:
    // 1. Adicionar placeholders para eles no seu template HTML (com classes específicas).
    // 2. Selecioná-los aqui com cardClone.querySelector('.sua-nova-classe')
    // 3. Preenchê-los com product.description, product.status, product.category.
    // Exemplo:
    // const categoryElement = cardClone.querySelector('.productCategory'); // Supondo que você adicionou <p class="productCategory"></p> ao template
    // if (categoryElement) categoryElement.textContent = `Categoria: ${product.category}`;

    // Retorna o card clonado e preenchido.
    return cardClone;
}

/**
 * Função assíncrona principal para buscar os produtos da API e os exibir na página.
 */
async function fetchAndDisplayProducts() {
    const productContainer = document.getElementById('product-list-container');
    // Pega o template HTML do card que está escondido na página.
    const productTemplate = document.getElementById('product-template');

    if (!productContainer) {
        console.error("ERRO: Container de produtos com ID 'product-list-container' não foi encontrado no HTML.");
        return;
    }
    if (!productTemplate) {
        console.error("ERRO: Template de produto com ID 'product-template' não foi encontrado no HTML. Certifique-se de que ele existe e tem o ID correto.");
        productContainer.innerHTML = '<p class="error-message">Erro de configuração: Template de produto não encontrado.</p>';
        return;
    }

    productContainer.innerHTML = '<p>Carregando produtos...</p>'; // Mensagem de carregamento

    try {
        const response = await fetch('http://localhost:3000/api/products'); // PC da faculdade
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Falha ao buscar produtos: ${response.status} - ${errorData.message || response.statusText}`);
        }
        const products = await response.json();
        productContainer.innerHTML = ''; // Limpa a mensagem "Carregando..."

        if (products.length === 0) {
            productContainer.innerHTML = '<p>Nenhum produto encontrado. Cadastre alguns!</p>';
            return;
        }

        products.forEach(product => {
            // Para cada produto, clona o template e preenche com os dados
            const productCardElement = populateCardFromTemplate(productTemplate, product);
            productContainer.appendChild(productCardElement);
        });

    } catch (error) {
        console.error('Ocorreu um erro ao buscar e exibir os produtos:', error);
        if (productContainer) {
            productContainer.innerHTML = `<p class="error-message">Desculpe, não foi possível carregar os produtos: ${error.message}</p>`;
        }
    }
}

// Garante que o script só rode depois que o HTML estiver completamente carregado.
document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);