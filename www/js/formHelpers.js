// Aguarda o carregamento completo do DOM para executar os scripts
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os campos do formulário
    const inputCep = document.getElementById('cep');
    const inputPhone = document.getElementById('phone');
    const inputCpf = document.getElementById('cpf');
    
    const inputLogradouro = document.getElementById('logradouro');
    const inputBairro = document.getElementById('bairro');
    const inputCidade = document.getElementById('cidade');
    const inputEstado = document.getElementById('estado');
    const inputNumero = document.getElementById('addressN');
    const cepLoading = document.getElementById('cep-loading');

    // MÁSCARAS DE FORMATAÇÃO
    //================================================

    // Máscara para CEP (formato: 00000-000)
    inputCep.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    // Máscara para Celular (formato: (11) 99999-9999)
    inputPhone.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    // Máscara para CPF (formato: 000.000.000-00)
    inputCpf.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });


    // INTEGRAÇÃO COM API VIACEP
    //================================================
    
    const clearAddressForm = () => {
        inputLogradouro.value = '';
        inputBairro.value = '';
        inputCidade.value = '';
        inputEstado.value = '';
    };

    // Evento que dispara a busca quando o usuário sai do campo CEP
    inputCep.addEventListener('blur', async () => {
        const cep = inputCep.value.replace(/\D/g, ''); // Limpa o CEP para enviar só números

        // Valida se o CEP tem o tamanho correto (8 dígitos)
        if (cep.length !== 8) {
            clearAddressForm();
            return;
        }
        
        // Mostra a mensagem "Buscando..."
        cepLoading.style.display = 'block';
        clearAddressForm();

        try {
            // Faz a requisição para a API ViaCEP
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            // Esconde a mensagem "Buscando..."
            cepLoading.style.display = 'none';
            
            // Verifica se o ViaCEP retornou um erro (CEP não encontrado)
            if (data.erro) {
                alert('CEP não encontrado. Por favor, verifique o número digitado.');
                clearAddressForm();
            } else {
                // Preenche os campos com os dados retornados
                inputLogradouro.value = data.logradouro;
                inputBairro.value = data.bairro;
                inputCidade.value = data.localidade;
                inputEstado.value = data.uf;
                
                // Move o foco do usuário para o campo de número
                inputNumero.focus();
            }

        } catch (error) {
            // Lida com erros de rede ou outros problemas na requisição
            cepLoading.style.display = 'none';
            alert('Não foi possível buscar o CEP. Verifique sua conexão com a internet.');
            console.error("Erro ao buscar CEP:", error);
        }
    });
});