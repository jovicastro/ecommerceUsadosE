// www/js/register_product.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productRegistrationForm');
    const messageDiv = document.getElementById('message');

    // Função para exibir mensagens
    function displayMessage(text, type = 'success') {
        messageDiv.textContent = text;
        messageDiv.className = type; // Adiciona classe para estilização (ex: 'success', 'error')
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 3000); // Esconde a mensagem após 3 segundos
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // IMPEDE A SUBMISSÃO PADRÃO DO FORMULÁRIO (recarga da página)

        // Coleta os dados do formulário
        const formData = new FormData(form);
        const productData = {};
        for (let [key, value] of formData.entries()) {
            productData[key] = value;
        }

        // Renomear campos para o padrão da API Node.js (se necessário)
        // Se no frontend usar 'nome' e no backend 'name', faça o mapeamento
        const dataToSend = {
            name: productData.nome,
            description: productData.descricao,
            price: parseFloat(productData.preco), // Garante que o preço é um número
            img: productData.img, // Assumindo URL da imagem por enquanto
            data: productData.data,
            estado: productData.estado,
            categoria: productData.categoria
        };

        try {
            // =========================================================
            // FAZ A REQUISIÇÃO HTTP POST PARA A API NODE.JS
            // O URL deve ser o endpoint da sua API Node.js para criar produtos
            // Ex: http://localhost:3000/api/products
            // =========================================================
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indica que estamos enviando JSON
                },
                body: JSON.stringify(dataToSend) // Converte o objeto JS para string JSON
            });

            // Verifica se a requisição foi bem-sucedida (status 2xx)
            if (response.ok) {
                const result = await response.json(); // Pega a resposta JSON do backend
                displayMessage(result.message || 'Produto cadastrado com sucesso!', 'success');
                form.reset(); // Limpa o formulário após o sucesso
            } else {
                // Se o status não for 2xx (ex: 400 Bad Request, 500 Internal Server Error)
                const errorData = await response.json();
                displayMessage(errorData.message || 'Erro ao cadastrar produto.', 'error');
            }
        } catch (error) {
            // Lida com erros de rede ou outros erros que impedem a requisição
            console.error('Erro de rede ou na requisição:', error);
            displayMessage('Erro de conexão. Tente novamente mais tarde.', 'error');
        }
    });

    // Função para pré-visualizar imagens (se o input file for ativado)
    // function previewImages() {
    //     const previewContainer = document.getElementById('image-preview');
    //     previewContainer.innerHTML = ''; // Limpa prévias anteriores
    //     const files = document.getElementById('product-images').files;

    //     if (files) {
    //         Array.from(files).forEach(file => {
    //             if (file.type.startsWith('image/')) {
    //                 const reader = new FileReader();
    //                 reader.onload = (e) => {
    //                     const img = document.createElement('img');
    //                     img.src = e.target.result;
    //                     img.style.maxWidth = '100px';
    //                     img.style.maxHeight = '100px';
    //                     img.style.margin = '5px';
    //                     previewContainer.appendChild(img);
    //                 };
    //                 reader.readAsDataURL(file);
    //             }
    //         });
    //     }
    // }
});