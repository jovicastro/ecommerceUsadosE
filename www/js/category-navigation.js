document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os links de categoria
    const categoryLinks = document.querySelectorAll('.category-item');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede que o link recarregue a página

            // Pega o nome da categoria do atributo 'data-category'
            const category = link.dataset.category;

            // Chama a função global filterProducts que já existe no seu código
            // Passamos a categoria e 'null' para o estado, para filtrar só por categoria.
            filterProducts(category, null);
        });
    });
});