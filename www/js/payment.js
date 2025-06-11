document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('payment-form');
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    
    // Detalhes de cada método de pagamento
    const creditCardDetails = document.getElementById('credit-card-details');
    const pixDetails = document.getElementById('pix-details');
    const boletoDetails = document.getElementById('boleto-details');

    // Função para mostrar os detalhes do método de pagamento selecionado
    function showPaymentDetails() {
        // Pega o valor do radio button selecionado
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

        // Esconde todos os detalhes de pagamento
        creditCardDetails.classList.add('hidden');
        pixDetails.classList.add('hidden');
        boletoDetails.classList.add('hidden');

        // Mostra apenas o detalhe relevante
        if (selectedMethod === 'credit-card') {
            creditCardDetails.classList.remove('hidden');
        } else if (selectedMethod === 'pix') {
            pixDetails.classList.remove('hidden');
        } else if (selectedMethod === 'boleto') {
            boletoDetails.classList.remove('hidden');
        }
    }

    // Adiciona um "ouvinte" para o evento de mudança nos botões de rádio
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', showPaymentDetails);
    });

    // Chama a função uma vez no início para garantir que o estado inicial esteja correto
    showPaymentDetails();

    // Lida com o envio do formulário
    paymentForm.addEventListener('submit', function (event) {
        // Previne o envio padrão do formulário, que recarregaria a página
        event.preventDefault();

        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

        console.log(`Método de pagamento selecionado: ${selectedMethod}`);
        
        // Simulação de processamento
        alert(`Processando pagamento com ${selectedMethod}...`);

        //
        // --- PONTO CRÍTICO ---
        //
        // Aqui é onde você faria a integração com um Gateway de Pagamento.
        // Você NUNCA deve enviar dados de cartão de crédito para o seu próprio servidor.
        //
        // Exemplo com Stripe.js, PagSeguro.js ou MercadoPago.js:
        // 1. Você coletaria os dados do formulário.
        // 2. Usaria a biblioteca (SDK) do gateway para tokenizar os dados do cartão.
        //    Isso transforma os dados sensíveis em um "token" seguro.
        // 3. Você enviaria ESSE TOKEN para o seu backend.
        // 4. Seu backend usaria o token para efetuar a cobrança real junto ao gateway.
        //
        
        console.log('Formulário enviado (simulação).');
        // Você pode redirecionar o usuário para uma página de sucesso aqui.
        // window.location.href = '/obrigado.html';
    });
});