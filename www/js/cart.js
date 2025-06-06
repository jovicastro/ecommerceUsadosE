document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const quantityInput = document.getElementById('quantity');
    const productNameElement = document.querySelector('.product-title');

    // Fallback para o logo caso a imagem não seja encontrada
    const logoImage = document.querySelector('.logo');
    if (logoImage) {
        logoImage.onerror = function() {
            // Remove a imagem quebrada
            const logoContainer = logoImage.parentNode;
            if (logoContainer) {
                logoContainer.removeChild(logoImage);
            }
            
            // Cria um logo simples com a inicial 'D' estilizada
            const textLogo = document.createElement('div');
            textLogo.textContent = 'D';
            textLogo.style.width = '40px';
            textLogo.style.height = '40px';
            textLogo.style.backgroundColor = 'white';
            textLogo.style.color = '#19465D'; // Azul escuro
            textLogo.style.borderRadius = '50%';
            textLogo.style.display = 'flex';
            textLogo.style.alignItems = 'center';
            textLogo.style.justifyContent = 'center';
            textLogo.style.fontSize = '24px';
            textLogo.style.fontWeight = 'bold';
            textLogo.style.marginRight = '10px'; // Mantém a margem original do logo
            textLogo.style.border = '1px solid #eee'; // Borda similar à imagem
            
            if (logoContainer && logoContainer.firstChild) {
                logoContainer.insertBefore(textLogo, logoContainer.firstChild);
            } else if (logoContainer) {
                logoContainer.appendChild(textLogo);
            }
        };
        // Para testar o fallback, você pode alterar o src para uma imagem inexistente:
        // logoImage.src = "imagem_que_nao_existe.png"; 
    }


    if (addToCartBtn && quantityInput && productNameElement && feedbackMessage) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            const productName = productNameElement.textContent;

            if (isNaN(quantity) || quantity <= 0) {
                feedbackMessage.textContent = 'Por favor, insira uma quantidade válida.';
                feedbackMessage.style.color = 'red';
                setTimeout(() => {
                    feedbackMessage.textContent = '';
                }, 3000);
                return;
            }

            // Simula a adição ao carrinho
            feedbackMessage.textContent = `${quantity}x "${productName}" adicionado(s) ao carrinho! 🎉`;
            feedbackMessage.style.color = 'green';

            // Opcional: Desabilita o botão temporariamente ou muda o texto
            addToCartBtn.textContent = 'Adicionado!';
            addToCartBtn.disabled = true;

            setTimeout(() => {
                feedbackMessage.textContent = ''; // Limpa a mensagem
                addToCartBtn.textContent = 'Adicionar ao Carrinho'; // Restaura o texto do botão
                addToCartBtn.disabled = false; // Reabilita o botão
                quantityInput.value = '1'; // Reseta a quantidade para 1 (opcional)
            }, 3000); // Reseta após 3 segundos
        });
    }
});