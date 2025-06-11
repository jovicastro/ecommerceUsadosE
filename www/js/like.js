// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Exemplo: Altera o estado do item de navegação quando clicado
    const navLinks = document.querySelectorAll('.navigation-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que a página recarregue
            navLinks.forEach(item => item.closest('.navigation-item').classList.remove('active'));
            event.target.closest('.navigation-item').classList.add('active');
            // Aqui você poderia adicionar lógica para carregar conteúdo diferente
        });
    });

    // Exemplo: Feedback ao adicionar ou excluir
    const addToListButton = document.querySelector('.add-to-list-button');
    const deleteButton = document.querySelector('.delete-button');

    if (addToListButton) {
        addToListButton.addEventListener('click', () => {
            alert('Produto adicionado à sua lista!');
            // Aqui você faria uma chamada API para adicionar o produto à lista
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            const confirmDelete = confirm('Tem certeza que deseja excluir este produto?');
            if (confirmDelete) {
                alert('Produto excluído!');
                // Aqui você faria uma chamada API para excluir o produto
                // E talvez remover o card do DOM: deleteButton.closest('.product-card').remove();
            }
        });
    }

    const createListButton = document.querySelector('.create-list-button');
    if (createListButton) {
        createListButton.addEventListener('click', () => {
            const listName = prompt('Digite o nome da nova lista:');
            if (listName) {
                alert(`Lista "${listName}" criada!`);
                // Aqui você faria uma chamada API para criar a lista
            }
        });
    }
});