// Espera o HTML estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userRegistrationForm'); // Assumindo que seu <form> tem este id
    const messageDiv = document.getElementById('message'); // Assumindo que você tem uma <div> para mensagens

    // Função para exibir mensagens
    function displayMessage(text, type = 'success') {
        if (!messageDiv) return;
        messageDiv.textContent = text;
        messageDiv.className = type;
        setTimeout(() => { messageDiv.textContent = ''; }, 5000);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Monta o objeto JSON para enviar ao backend
        const dataToSend = {
            fullname: formData.get('fullname'),
            password: formData.get('password'),
            email: formData.get('email'),
            telephoneN: formData.get('telephoneN'),
            cep: formData.get('cep'),
            address: formData.get('address'),
            addressN: formData.get('addressN'),
            date: new Date().toISOString().split('T')[0] // Formato AAAA-MM-DD
        };

        try {
            // A URL correta com a porta e o caminho no plural
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            const result = await response.json();

            if (response.ok) {
                displayMessage(result.message || 'Cadastro realizado com sucesso!', 'success');
                form.reset();
            } else {
                displayMessage(result.message || 'Ocorreu um erro.', 'error');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            displayMessage('Falha ao conectar com o servidor.', 'error');
        }
    });
});